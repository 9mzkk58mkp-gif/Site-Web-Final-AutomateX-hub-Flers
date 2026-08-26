import { randomUUID } from "node:crypto";
import { NextResponse, type NextRequest } from "next/server";
import { NAP } from "@/lib/constants";
import { callMistralChat, MissingApiKeyError, type ChatMessage } from "@/lib/chatbot/mistral-client";
import { buildSystemPrompt } from "@/lib/chatbot/system-prompt";
import { retrieveRelevantPublicChunks } from "@/lib/chatbot-knowledge/retrieval";
import { containsInjectionAttempt, INJECTION_GENERIC_REPLY } from "@/lib/chatbot/prompt-injection";
import { sendContactToN8n } from "@/lib/chatbot/n8n-webhook";
import { verifyTurnstileToken } from "@/lib/chatbot/turnstile";
import {
  getOrCreateSession,
  isGlobalLimitReached,
  isIpLimitReached,
  isSessionLimitReached,
  isTurnstileVerified,
  markTurnstileVerified,
  markWebhookSent,
  registerGlobalMistralCall,
  registerIpMessage,
  registerSessionMessage,
  wasWebhookAlreadySent,
} from "@/lib/chatbot/rate-limit";
import { MAX_HISTORY_MESSAGES, MAX_MESSAGES_PER_SESSION, MAX_USER_MESSAGE_LENGTH } from "@/lib/chatbot/config";

const SESSION_COOKIE = "ax_chat_sid";
const LIMIT_REPLY = `Pour aller plus loin, appelez directement Nolan au ${NAP.phoneDisplay}.`;
const UNAVAILABLE_REPLY = `Assistant temporairement indisponible, contactez-moi directement au ${NAP.phoneDisplay}.`;

interface IncomingBody {
  messages?: Array<{ role: "user" | "assistant"; content: string }>;
  turnstileToken?: string;
}

function getClientIp(request: NextRequest): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  return request.headers.get("x-real-ip") ?? "unknown";
}

function errorResponse(message: string, status: number, sessionId: string) {
  const response = NextResponse.json({ error: message }, { status });
  response.cookies.set(SESSION_COOKIE, sessionId, { httpOnly: true, sameSite: "lax", path: "/" });
  return response;
}

export async function POST(request: NextRequest) {
  const sessionId = request.cookies.get(SESSION_COOKIE)?.value ?? randomUUID();
  const ip = getClientIp(request);

  let body: IncomingBody;
  try {
    body = await request.json();
  } catch {
    return errorResponse("Requête invalide.", 400, sessionId);
  }

  const history = Array.isArray(body.messages) ? body.messages : [];
  const lastMessage = history[history.length - 1];

  if (!lastMessage || lastMessage.role !== "user" || typeof lastMessage.content !== "string") {
    return errorResponse("Message utilisateur manquant.", 400, sessionId);
  }
  if (lastMessage.content.length === 0 || lastMessage.content.length > MAX_USER_MESSAGE_LENGTH) {
    return errorResponse(`Le message doit faire entre 1 et ${MAX_USER_MESSAGE_LENGTH} caractères.`, 400, sessionId);
  }

  // Rate limiting — sections 5 et 7, priorité critique.
  if (isGlobalLimitReached()) {
    return errorResponse(UNAVAILABLE_REPLY, 429, sessionId);
  }
  if (isIpLimitReached(ip)) {
    return errorResponse(UNAVAILABLE_REPLY, 429, sessionId);
  }
  if (isSessionLimitReached(sessionId)) {
    return errorResponse(LIMIT_REPLY, 429, sessionId);
  }

  // CAPTCHA invisible avant le premier message de la session.
  if (!isTurnstileVerified(sessionId)) {
    const verified = await verifyTurnstileToken(body.turnstileToken, ip);
    if (!verified) {
      return errorResponse("Vérification anti-robot échouée, réessayez.", 403, sessionId);
    }
    markTurnstileVerified(sessionId);
  }

  registerSessionMessage(sessionId);
  registerIpMessage(ip);

  // Filtre anti prompt-injection — avant tout appel API, ne consomme pas le budget.
  if (containsInjectionAttempt(lastMessage.content)) {
    const response = NextResponse.json({ reply: INJECTION_GENERIC_REPLY, sessionLimitReached: false });
    response.cookies.set(SESSION_COOKIE, sessionId, { httpOnly: true, sameSite: "lax", path: "/" });
    return response;
  }

  try {
    const ragContext = await retrieveRelevantPublicChunks(lastMessage.content);
    const systemPrompt = buildSystemPrompt(ragContext);
    const trimmedHistory = history.slice(-MAX_HISTORY_MESSAGES);
    const messages: ChatMessage[] = [
      { role: "system", content: systemPrompt },
      ...trimmedHistory.map((m) => ({ role: m.role, content: m.content }) as ChatMessage),
    ];

    registerGlobalMistralCall();
    const result = await callMistralChat(messages);

    let reply = result.content || "Je n'ai pas de réponse pour le moment, réessayez ou appelez directement.";
    let contactCaptured = false;

    const contactCall = result.toolCalls.find((call) => call.function.name === "submit_contact_request");
    if (contactCall && !wasWebhookAlreadySent(sessionId)) {
      try {
        const args = JSON.parse(contactCall.function.arguments) as Record<string, unknown>;
        const sent = await sendContactToN8n(args);
        if (sent) {
          markWebhookSent(sessionId);
          contactCaptured = true;
          if (!reply) {
            reply = `Merci, j'ai transmis votre demande à Nolan, il vous rappelle rapidement. Vous pouvez aussi l'appeler directement au ${NAP.phoneDisplay}.`;
          }
        }
      } catch {
        // Argument de l'outil invalide : on ignore silencieusement la capture, la conversation continue.
      }
    }

    const session = getOrCreateSession(sessionId);
    const response = NextResponse.json({
      reply,
      contactCaptured,
      sessionLimitReached: session.messageCount >= MAX_MESSAGES_PER_SESSION,
    });
    response.cookies.set(SESSION_COOKIE, sessionId, { httpOnly: true, sameSite: "lax", path: "/" });
    return response;
  } catch (error) {
    if (error instanceof MissingApiKeyError) {
      console.error("[chatbot] MISTRAL_API_KEY absente — impossible de répondre.");
      return errorResponse(UNAVAILABLE_REPLY, 503, sessionId);
    }
    console.error("[chatbot] Erreur lors de l'appel Mistral :", error);
    return errorResponse(UNAVAILABLE_REPLY, 502, sessionId);
  }
}
