import {
  MAX_MESSAGES_PER_IP_PER_DAY,
  MAX_MESSAGES_PER_SESSION,
  MAX_MISTRAL_CALLS_PER_DAY,
  SESSION_TIMEOUT_MS,
} from "./config";
import { incrementDailyCount, readDailyCount, readJson, writeJson } from "@/lib/shared-store";

/**
 * Rate limiting du chatbot — sections 5 et 7 de la spec.
 *
 * Les compteurs sont désormais dans un magasin partagé entre les instances
 * serverless (voir lib/shared-store.ts) et non plus en mémoire de process :
 * sur Netlify, les limites ci-dessous sont réellement appliquées, y compris
 * après un démarrage à froid ou entre deux instances concurrentes.
 *
 * Aucune donnée de conversation n'est conservée, uniquement des compteurs et
 * l'horodatage de dernière activité.
 */

const SESSION_PREFIX = "session:";
const IP_PREFIX = "ip:";
const GLOBAL_KEY = "global:mistral-calls";

export interface SessionState {
  messageCount: number;
  lastActivity: number;
  webhookSent: boolean;
}

function freshSession(): SessionState {
  return { messageCount: 0, lastActivity: Date.now(), webhookSent: false };
}

export async function getOrCreateSession(sessionId: string): Promise<SessionState> {
  const existing = await readJson<SessionState>(SESSION_PREFIX + sessionId);
  if (existing && Date.now() - existing.lastActivity <= SESSION_TIMEOUT_MS) {
    return existing;
  }
  // Session absente, ou expirée après 10 min d'inactivité → réinitialisée.
  return freshSession();
}

export async function registerSessionMessage(sessionId: string): Promise<SessionState> {
  const session = await getOrCreateSession(sessionId);
  const updated: SessionState = {
    ...session,
    messageCount: session.messageCount + 1,
    lastActivity: Date.now(),
  };
  await writeJson(SESSION_PREFIX + sessionId, updated);
  return updated;
}

export async function isSessionLimitReached(sessionId: string): Promise<boolean> {
  const session = await getOrCreateSession(sessionId);
  return session.messageCount >= MAX_MESSAGES_PER_SESSION;
}

export async function markWebhookSent(sessionId: string): Promise<void> {
  const session = await getOrCreateSession(sessionId);
  await writeJson(SESSION_PREFIX + sessionId, { ...session, webhookSent: true });
}

export async function wasWebhookAlreadySent(sessionId: string): Promise<boolean> {
  const session = await getOrCreateSession(sessionId);
  return session.webhookSent;
}

export async function registerIpMessage(ip: string): Promise<number> {
  return incrementDailyCount(IP_PREFIX + ip);
}

export async function isIpLimitReached(ip: string): Promise<boolean> {
  const count = await readDailyCount(IP_PREFIX + ip);
  return count >= MAX_MESSAGES_PER_IP_PER_DAY;
}

export async function registerGlobalMistralCall(): Promise<number> {
  return incrementDailyCount(GLOBAL_KEY);
}

export async function isGlobalLimitReached(): Promise<boolean> {
  const count = await readDailyCount(GLOBAL_KEY);
  return count >= MAX_MISTRAL_CALLS_PER_DAY;
}
