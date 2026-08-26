/**
 * Filtre serveur anti prompt-injection — section 7 de la spec, priorité critique.
 * Appliqué AVANT tout appel à l'API Mistral, pour ne pas consommer le budget
 * d'appels sur des tentatives évidentes. Server-only.
 */

const INJECTION_PATTERNS: RegExp[] = [
  /ignore(?:z|r)?\s+(?:les\s+|toutes\s+les\s+)?instructions?/i,
  /ignore\s+(?:all\s+|previous\s+|the\s+)?(?:previous\s+)?instructions?/i,
  /system\s*prompt/i,
  /tu\s+es\s+maintenant/i,
  /you\s+are\s+now/i,
  /mode\s+debug/i,
  /debug\s+mode/i,
  /affiche(?:z)?\s+tes\s+instructions?/i,
  /show\s+(?:your|the)\s+(?:system\s+)?(?:prompt|instructions?)/i,
  /r[ée]p[ée]te(?:z)?\s+(?:tes|ton)\s+(?:instructions?|prompt)/i,
  /r[ée]sume(?:z)?\s+(?:tes|ton)\s+(?:instructions?|prompt)/i,
  /jeu\s+de\s+r[ôo]le/i,
  /act\s+as\s+if/i,
  /internal\.md/i,
  /prompt\s+syst[èe]me/i,
];

/** Détecte une tentative évidente de prompt injection dans un message utilisateur. */
export function containsInjectionAttempt(message: string): boolean {
  return INJECTION_PATTERNS.some((pattern) => pattern.test(message));
}

export const INJECTION_GENERIC_REPLY =
  "Je suis l'assistant d'Automatex et je ne peux pas répondre à ce type de demande. " +
  "Puis-je vous aider pour votre projet de site web, votre fiche Google, ou une automatisation ? " +
  "Sinon, appelez directement Nolan au 06 45 38 42 33.";
