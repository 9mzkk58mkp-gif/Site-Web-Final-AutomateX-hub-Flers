/**
 * Configuration du chatbot RAG — constantes centralisées.
 * Server-only.
 */

/** Modèle de chat Mistral utilisé. Changer cette seule constante pour passer à mistral-large. */
export const MISTRAL_CHAT_MODEL = process.env.MISTRAL_CHAT_MODEL || "mistral-small-latest";

/** Modèle d'embeddings Mistral utilisé pour l'index RAG. */
export const MISTRAL_EMBED_MODEL = "mistral-embed";

export const MISTRAL_API_BASE = "https://api.mistral.ai/v1";

/** Nombre de chunks de connaissance publique rapatriés par requête RAG. */
export const RAG_TOP_K = 5;

/** Rate limiting — section 5 et 7 de la spec. */
export const MAX_MESSAGES_PER_SESSION = 15;
export const MAX_MISTRAL_CALLS_PER_DAY = 200;
export const MAX_MESSAGES_PER_IP_PER_DAY = 20;
export const MAX_USER_MESSAGE_LENGTH = 500;
export const SESSION_TIMEOUT_MS = 10 * 60 * 1000; // 10 minutes d'inactivité
export const MAX_HISTORY_MESSAGES = 12; // 6 derniers échanges

/** Sanitization du payload N8N. */
export const MAX_BESOIN_EXPRIME_LENGTH = 300;
