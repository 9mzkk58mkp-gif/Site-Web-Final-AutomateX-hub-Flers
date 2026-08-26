/**
 * NAP (Name, Address, Phone) de référence et coordonnées Automatex.
 * Source unique de vérité — ne jamais hardcoder ces valeurs ailleurs dans le code.
 * Voir content/03-pages-transversales.md, section "NAP DE RÉFÉRENCE".
 */

export const SITE_URL = "https://automatex-hub.com";

export const NAP = {
  name: "Automatex",
  founder: "Nolan Hermand",
  phoneDisplay: "06 45 38 42 33",
  phoneE164: "+33645384233",
  email: "nolan.hermand@automatex-hub.com",
  /**
   * Adresse à usage légal uniquement (mentions légales, contact).
   * Automatex est un Service Area Business : ne JAMAIS afficher cette adresse
   * dans le schema JSON-LD LocalBusiness (areaServed uniquement, pas d'adresse postale).
   */
  legalAddress: {
    street: "50 rue de l'Équerre",
    postalCode: "61100",
    city: "Saint-Georges-des-Groseillers",
    country: "FR",
  },
  siret: "103 208 054 00017",
  ape: "6202A",
  vatNote: "TVA non applicable, art. 293 B du CGI",
} as const;

export const WHATSAPP_URL = `https://wa.me/${NAP.phoneE164.replace("+", "")}`;
export const TEL_HREF = `tel:${NAP.phoneE164}`;
export const MAIL_HREF = `mailto:${NAP.email}`;

export const LINKEDIN_URL = "https://www.linkedin.com/in/nolan-hermand";
export const FACEBOOK_URL = "https://www.facebook.com/Automatex";
export const TIKTOK_URL = "https://www.tiktok.com/@automatex_hub";

export const SOCIAL_LINKS = [LINKEDIN_URL, FACEBOOK_URL, TIKTOK_URL] as const;

export const PRIORITY_AREAS = [
  "Flers",
  "Saint-Georges-des-Groseillers",
  "La Selle-la-Forge",
  "Tinchebray-Bocage",
  "Domfront en Poiraie",
  "Condé-en-Normandie",
] as const;

export const OTHER_AREAS = [
  "Argentan",
  "Alençon",
  "L'Aigle",
  "Mortagne-au-Perche",
] as const;

export const AREA_SERVED = "Orne, Normandie";

export const METIERS = [
  { slug: "menuisier", label: "Menuisier" },
  { slug: "couvreur", label: "Couvreur" },
  { slug: "plombier", label: "Plombier" },
  { slug: "electricien", label: "Électricien" },
  { slug: "macon", label: "Maçon" },
] as const;

export const NAV_LINKS = [
  { href: "/sites-web", label: "Sites Web" },
  { href: "/fiche-google", label: "Fiche Google" },
  { href: "/automatisations", label: "Automatisations" },
  { href: "/qui-je-suis", label: "Qui je suis" },
] as const;

export const SILO_LINKS = [
  { href: "/sites-web", label: "Sites Web" },
  { href: "/fiche-google", label: "Fiche Google" },
  { href: "/automatisations", label: "Automatisations" },
] as const;
