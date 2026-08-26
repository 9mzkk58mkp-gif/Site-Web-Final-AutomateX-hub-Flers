import { MISTRAL_API_BASE, MISTRAL_CHAT_MODEL, MISTRAL_EMBED_MODEL } from "./config";

/**
 * Client Mistral minimal basé sur fetch (pas de SDK, pour limiter les dépendances).
 * Server-only — MISTRAL_API_KEY n'est jamais exposée au client.
 */

export interface ChatMessage {
  role: "system" | "user" | "assistant" | "tool";
  content: string;
  tool_call_id?: string;
}

export interface ToolCall {
  id: string;
  type: "function";
  function: { name: string; arguments: string };
}

export interface ChatCompletionResult {
  content: string;
  toolCalls: ToolCall[];
}

export class MissingApiKeyError extends Error {
  constructor() {
    super("MISTRAL_API_KEY absente");
    this.name = "MissingApiKeyError";
  }
}

function getApiKey(): string {
  const key = process.env.MISTRAL_API_KEY;
  if (!key) throw new MissingApiKeyError();
  return key;
}

const CONTACT_TOOL = {
  type: "function" as const,
  function: {
    name: "submit_contact_request",
    description:
      "Transmet la demande de rappel du visiteur à Nolan une fois que son nom et son numéro de " +
      "téléphone ont été recueillis dans la conversation. À appeler une seule fois par conversation.",
    parameters: {
      type: "object",
      properties: {
        nom: { type: "string", description: "Nom du visiteur" },
        telephone: { type: "string", description: "Numéro de téléphone français du visiteur" },
        metier: { type: "string", description: "Métier de l'artisan si mentionné, sinon chaîne vide" },
        besoin_exprime: {
          type: "string",
          description: "Résumé en une phrase de ce que le visiteur cherche",
        },
      },
      required: ["nom", "telephone", "besoin_exprime"],
    },
  },
};

export async function callMistralChat(messages: ChatMessage[]): Promise<ChatCompletionResult> {
  const response = await fetch(`${MISTRAL_API_BASE}/chat/completions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getApiKey()}`,
    },
    body: JSON.stringify({
      model: MISTRAL_CHAT_MODEL,
      messages,
      tools: [CONTACT_TOOL],
      tool_choice: "auto",
      temperature: 0.3,
      max_tokens: 500,
    }),
  });

  if (!response.ok) {
    throw new Error(`Mistral chat API error: ${response.status}`);
  }

  const data = await response.json();
  const choice = data.choices?.[0]?.message;
  return {
    content: typeof choice?.content === "string" ? choice.content : "",
    toolCalls: Array.isArray(choice?.tool_calls) ? choice.tool_calls : [],
  };
}

export async function callMistralEmbeddings(inputs: string[]): Promise<number[][]> {
  const response = await fetch(`${MISTRAL_API_BASE}/embeddings`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getApiKey()}`,
    },
    body: JSON.stringify({
      model: MISTRAL_EMBED_MODEL,
      input: inputs,
    }),
  });

  if (!response.ok) {
    throw new Error(`Mistral embeddings API error: ${response.status}`);
  }

  const data = await response.json();
  return (data.data as Array<{ embedding: number[] }>).map((item) => item.embedding);
}
