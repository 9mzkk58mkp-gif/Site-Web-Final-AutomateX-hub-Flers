/**
 * Vérification serveur du CAPTCHA invisible Cloudflare Turnstile — section 7.
 * Si TURNSTILE_SECRET_KEY n'est pas renseignée (environnement de dev sans
 * compte Cloudflare créé), la vérification est ignorée avec un avertissement
 * plutôt que de bloquer tout le monde — à activer avant mise en production.
 * Server-only.
 */

const VERIFY_URL = "https://challenges.cloudflare.com/turnstile/v0/siteverify";

export async function verifyTurnstileToken(token: string | undefined, ip: string): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY;

  if (!secret) {
    console.warn(
      "[chatbot] TURNSTILE_SECRET_KEY absente : vérification CAPTCHA ignorée (dev uniquement).",
    );
    return true;
  }

  if (!token) return false;

  try {
    const response = await fetch(VERIFY_URL, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({ secret, response: token, remoteip: ip }),
    });
    if (!response.ok) return false;
    const data = await response.json();
    return data.success === true;
  } catch {
    return false;
  }
}
