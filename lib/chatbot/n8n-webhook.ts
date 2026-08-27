import { buildSafeN8nPayload, type N8nSource } from "./validation";

/**
 * Envoi de la capture de contact vers N8N — section 4 de la spec.
 * Appel côté serveur uniquement, jamais depuis le widget client.
 * Utilise N8N_WEBHOOK_URL, le même webhook que le formulaire de contact — un
 * seul workflow N8N, qui distingue les deux origines via le champ "source"
 * du payload ("chatbot" vs "contact").
 *
 * La variable n'est volontairement PAS préfixée NEXT_PUBLIC_ : préfixée, sa
 * valeur serait inscrite en clair dans le bundle JavaScript envoyé au
 * navigateur, et n'importe qui pourrait poster sur le webhook sans passer par
 * la validation ni le rate limiting. Le formulaire de contact passe désormais
 * par app/api/contact/route.ts pour la même raison.
 */
export async function sendContactToN8n(
  rawInput: Record<string, unknown>,
  source: N8nSource,
): Promise<boolean> {
  const webhookUrl = process.env.N8N_WEBHOOK_URL;
  if (!webhookUrl) {
    console.warn("[n8n] N8N_WEBHOOK_URL absente : capture de contact ignorée.");
    return false;
  }

  const payload = buildSafeN8nPayload(rawInput, source);
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
