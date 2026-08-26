import { buildSafeN8nPayload } from "./validation";

/**
 * Envoi de la capture de contact vers N8N — section 4 de la spec.
 * Appel côté serveur uniquement, jamais depuis le widget client.
 * Réutilise NEXT_PUBLIC_N8N_WEBHOOK_URL, le même webhook que le formulaire de
 * contact classique — un seul workflow N8N côté N8N, qui distingue les deux
 * sources via le champ "source" du payload ("chatbot" vs "contact").
 * L'URL de webhook n'est pas un secret sensible (contrairement à
 * MISTRAL_API_KEY, qui reste strictement server-only) : l'exposer côté
 * client via NEXT_PUBLIC_ est un choix assumé de simplicité.
 */
export async function sendContactToN8n(rawInput: Record<string, unknown>): Promise<boolean> {
  const webhookUrl = process.env.NEXT_PUBLIC_N8N_WEBHOOK_URL;
  if (!webhookUrl) {
    console.warn("[chatbot] NEXT_PUBLIC_N8N_WEBHOOK_URL absente : capture de contact ignorée.");
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
