import { buildSafeN8nPayload } from "./validation";

/**
 * Envoi de la capture de contact vers N8N — section 4 de la spec.
 * Appel côté serveur uniquement, jamais depuis le widget client.
 * Utilise N8N_CHATBOT_WEBHOOK_URL, distincte de NEXT_PUBLIC_N8N_WEBHOOK_URL
 * (formulaire de contact classique) pour séparer les deux flux et pouvoir
 * router/monitorer les leads chatbot indépendamment côté N8N.
 */
export async function sendContactToN8n(rawInput: Record<string, unknown>): Promise<boolean> {
  const webhookUrl = process.env.N8N_CHATBOT_WEBHOOK_URL;
  if (!webhookUrl) {
    console.warn("[chatbot] N8N_CHATBOT_WEBHOOK_URL absente : capture de contact ignorée.");
    return false;
  }

  const payload = buildSafeN8nPayload(rawInput);
  if (!payload) return false;

  try {
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    return response.ok;
  } catch {
    return false;
  }
}
