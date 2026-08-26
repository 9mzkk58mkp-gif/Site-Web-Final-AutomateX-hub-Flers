import {
  MAX_MESSAGES_PER_IP_PER_DAY,
  MAX_MESSAGES_PER_SESSION,
  MAX_MISTRAL_CALLS_PER_DAY,
  SESSION_TIMEOUT_MS,
} from "./config";

/**
 * Rate limiting en mémoire serveur — sections 5 et 7 de la spec.
 * Pas de service payant : compteurs en mémoire du process Node, remis à zéro
 * chaque jour. Limite connue : sur un déploiement serverless multi-instance,
 * les compteurs ne sont pas partagés entre instances — acceptable pour le
 * volume de trafic visé, à faire évoluer vers un store partagé (Netlify
 * Blobs/KV, Upstash Redis...) si le trafic augmente. Aucune donnée de
 * conversation n'est conservée ici, uniquement des compteurs.
 */

interface SessionState {
  messageCount: number;
  lastActivity: number;
  webhookSent: boolean;
  turnstileVerified: boolean;
}

const sessions = new Map<string, SessionState>();
const ipDailyCounts = new Map<string, { count: number; day: string }>();
let globalDailyCount = { count: 0, day: todayKey() };

function todayKey(): string {
  return new Date().toISOString().slice(0, 10);
}

export function getOrCreateSession(sessionId: string): SessionState {
  const existing = sessions.get(sessionId);
  const now = Date.now();

  if (existing && now - existing.lastActivity <= SESSION_TIMEOUT_MS) {
    return existing;
  }

  // Nouvelle session, ou session expirée (10 min d'inactivité) → réinitialisée.
  const fresh: SessionState = {
    messageCount: 0,
    lastActivity: now,
    webhookSent: false,
    turnstileVerified: existing?.turnstileVerified ?? false,
  };
  sessions.set(sessionId, fresh);
  return fresh;
}

export function touchSession(sessionId: string): void {
  const session = sessions.get(sessionId);
  if (session) session.lastActivity = Date.now();
}

export function registerSessionMessage(sessionId: string): SessionState {
  const session = getOrCreateSession(sessionId);
  session.messageCount += 1;
  session.lastActivity = Date.now();
  return session;
}

export function isSessionLimitReached(sessionId: string): boolean {
  return getOrCreateSession(sessionId).messageCount >= MAX_MESSAGES_PER_SESSION;
}

export function markWebhookSent(sessionId: string): void {
  const session = getOrCreateSession(sessionId);
  session.webhookSent = true;
}

export function wasWebhookAlreadySent(sessionId: string): boolean {
  return getOrCreateSession(sessionId).webhookSent;
}

export function markTurnstileVerified(sessionId: string): void {
  const session = getOrCreateSession(sessionId);
  session.turnstileVerified = true;
}

export function isTurnstileVerified(sessionId: string): boolean {
  return getOrCreateSession(sessionId).turnstileVerified;
}

export function registerIpMessage(ip: string): number {
  const today = todayKey();
  const existing = ipDailyCounts.get(ip);
  if (!existing || existing.day !== today) {
    ipDailyCounts.set(ip, { count: 1, day: today });
    return 1;
  }
  existing.count += 1;
  return existing.count;
}

export function isIpLimitReached(ip: string): boolean {
  const today = todayKey();
  const existing = ipDailyCounts.get(ip);
  if (!existing || existing.day !== today) return false;
  return existing.count >= MAX_MESSAGES_PER_IP_PER_DAY;
}

export function registerGlobalMistralCall(): number {
  const today = todayKey();
  if (globalDailyCount.day !== today) {
    globalDailyCount = { count: 0, day: today };
  }
  globalDailyCount.count += 1;
  return globalDailyCount.count;
}

export function isGlobalLimitReached(): boolean {
  const today = todayKey();
  if (globalDailyCount.day !== today) return false;
  return globalDailyCount.count >= MAX_MISTRAL_CALLS_PER_DAY;
}
