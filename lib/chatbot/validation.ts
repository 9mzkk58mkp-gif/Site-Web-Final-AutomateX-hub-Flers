import { MAX_BESOIN_EXPRIME_LENGTH } from "./config";

/**
 * Validation et sanitization avant tout envoi au webhook N8N — section 7 de la spec.
 * Server-only.
 */

// Numéros français : 0X XX XX XX XX, +33 X XX XX XX XX, ou 0033..., espaces/points/tirets tolérés.
const FRENCH_PHONE_REGEX =
  /^(?:(?:\+33|0033)\s?[1-9]|0[1-9])(?:[\s.-]?\d{2}){4}$/;

export function isValidFrenchPhone(phone: string): boolean {
  return FRENCH_PHONE_REGEX.test(phone.trim());
}

/** Retire toute balise HTML/script et tronque à la longueur maximale autorisée. */
export function sanitizeBesoinExprime(text: string): string {
  const withoutTags = text.replace(/<[^>]*>/g, "");
  const withoutScriptContent = withoutTags.replace(/javascript:/gi, "");
  return withoutScriptContent.trim().slice(0, MAX_BESOIN_EXPRIME_LENGTH);
}

export interface N8nContactPayload {
  source: "chatbot";
  nom: string;
  telephone: string;
  metier: string;
  besoin_exprime: string;
  timestamp: string;
}

const ALLOWED_FIELDS = new Set<keyof N8nContactPayload>([
  "source",
  "nom",
  "telephone",
  "metier",
  "besoin_exprime",
  "timestamp",
]);

/**
 * Ne conserve que les champs attendus du payload N8N — rejette tout champ
 * additionnel, quelle que soit sa provenance.
 */
export function buildSafeN8nPayload(input: Record<string, unknown>): N8nContactPayload | null {
  for (const key of Object.keys(input)) {
    if (!ALLOWED_FIELDS.has(key as keyof N8nContactPayload)) return null;
  }

  const nom = typeof input.nom === "string" ? input.nom.trim().slice(0, 100) : "";
  const telephone = typeof input.telephone === "string" ? input.telephone.trim() : "";
  const metier = typeof input.metier === "string" ? input.metier.trim().slice(0, 60) : "";
  const besoinExprime =
    typeof input.besoin_exprime === "string" ? sanitizeBesoinExprime(input.besoin_exprime) : "";

  if (!nom || !isValidFrenchPhone(telephone)) return null;

  return {
    source: "chatbot",
    nom,
    telephone,
    metier,
    besoin_exprime: besoinExprime,
    timestamp: new Date().toISOString(),
  };
}
