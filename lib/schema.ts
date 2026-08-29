import type { JsonLdSchema } from "@/components/seo/SchemaScript";
import {
  AREA_SERVED,
  FACEBOOK_URL,
  LINKEDIN_URL,
  NAP,
  OTHER_AREAS,
  PRIORITY_AREAS,
  SITE_URL,
  SOCIAL_LINKS,
} from "@/lib/constants";
import { getPageDate } from "@/lib/page-dates";

/**
 * Description d'entité réutilisée par les schemas. Rédigée pour être reprise
 * telle quelle par un moteur génératif : sujet nommé explicitement, activité,
 * cible et zone dans une seule phrase autoportante.
 */
const BUSINESS_DESCRIPTION =
  "Automatex crée des sites internet, optimise les fiches Google Business et met en place des automatisations de gestion pour les artisans du bâtiment de l'Orne, en Normandie. Nolan Hermand, fondateur unique, suit chaque projet du premier échange à la mise en ligne.";

/**
 * Sélecteurs CSS pointant les passages destinés à être lus à voix haute
 * (assistants vocaux) et repris comme réponse directe par les moteurs
 * génératifs : le H1 de la page et le paragraphe-réponse qui le suit.
 * `.geo-answer` est posé par ServicePageLayout et par le Hero.
 */
const SPEAKABLE = {
  "@type": "SpeakableSpecification",
  cssSelector: ["h1", ".geo-answer"],
} as const;

/**
 * Schema Person réutilisé comme référence "founder"/"worksFor" par les autres
 * schemas (LocalBusiness, Person). Service Area Business : pas d'adresse postale.
 */
export function getPersonSchema(): JsonLdSchema {
  return {
    "@type": "Person",
    "@id": `${SITE_URL}/qui-je-suis#person`,
    name: NAP.founder,
    jobTitle: "Fondateur",
    worksFor: { "@id": `${SITE_URL}/#organization` },
    url: `${SITE_URL}/qui-je-suis`,
    // knowsAbout + hasCredential : signaux d'expertise (E-E-A-T) que les
    // moteurs génératifs utilisent pour décider si une personne fait autorité
    // sur un sujet. Ne lister que ce qui est vérifiable sur /qui-je-suis.
    knowsAbout: [
      "Création de site internet pour artisan",
      "Référencement local",
      "Google Business Profile",
      "Automatisation de devis",
      "Menuiserie",
    ],
    hasCredential: {
      "@type": "EducationalOccupationalCredential",
      credentialCategory: "diploma",
      name: "CAP Menuiserie",
    },
    sameAs: [LINKEDIN_URL, FACEBOOK_URL],
  };
}

/**
 * Variante autonome du schema Person, pour injection directe dans une page.
 * getPersonSchema() est conçu pour être IMBRIQUÉ (founder d'une organisation)
 * et n'a donc pas de "@context" : injecté tel quel dans un <script>, le bloc
 * n'est pas du JSON-LD valide et Google l'ignore entièrement.
 */
export function getPersonPageSchema(): JsonLdSchema {
  return {
    "@context": "https://schema.org",
    ...getPersonSchema(),
  };
}

/**
 * LocalBusiness (+ ProfessionalService). Service Area Business : jamais
 * d'adresse postale complète visible, uniquement areaServed.
 */
export function getLocalBusinessSchema(): JsonLdSchema {
  return {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "ProfessionalService"],
    "@id": `${SITE_URL}/#organization`,
    name: NAP.name,
    description: BUSINESS_DESCRIPTION,
    founder: getPersonSchema(),
    telephone: NAP.phoneE164,
    email: NAP.email,
    url: SITE_URL,
    image: `${SITE_URL}/logo-mark.png`,
    logo: `${SITE_URL}/logo-mark.png`,
    // SIRET : identifiant public et vérifiable, principal ancrage d'entité
    // pour une TPE sans page Wikipédia.
    identifier: {
      "@type": "PropertyValue",
      propertyID: "SIRET",
      value: NAP.siret.replace(/\s/g, ""),
    },
    knowsLanguage: "fr-FR",
    currenciesAccepted: "EUR",
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "sales",
      telephone: NAP.phoneE164,
      email: NAP.email,
      areaServed: "FR",
      availableLanguage: "fr",
    },
    areaServed: [...PRIORITY_AREAS, ...OTHER_AREAS].map((name) => ({
      "@type": "AdministrativeArea",
      name,
    })),
    // Centroïde de la commune de rattachement, PAS l'adresse du domicile :
    // un Service Area Business déclare son point de service, jamais un lieu
    // où le public serait reçu. Donne à Google et aux moteurs génératifs
    // l'ancrage géographique qui manquait à `areaServed` seul.
    geo: {
      "@type": "GeoCoordinates",
      latitude: 48.7597,
      longitude: -0.5783,
    },
    priceRange: "€€",
    sameAs: [...SOCIAL_LINKS],
  };
}

/**
 * WebSite — rattache toutes les URLs à une entité unique et déclare la langue.
 *
 * Volontairement sans `potentialAction: SearchAction` : le site n'expose aucun
 * moteur de recherche interne, et déclarer une SearchAction qui pointe vers une
 * URL inexistante est une donnée structurée fausse (Google la signale en
 * erreur). À ajouter le jour où une page /recherche existe réellement.
 */
export function getWebSiteSchema(): JsonLdSchema {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    url: SITE_URL,
    name: NAP.name,
    description: BUSINESS_DESCRIPTION,
    inLanguage: "fr-FR",
    publisher: { "@id": `${SITE_URL}/#organization` },
  };
}

export function getFaqSchema(items: { question: string; answer: string }[]): JsonLdSchema {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

export type Breadcrumb = { name: string; path: string };

/**
 * BreadcrumbList — explicite la position d'une page dans son silo.
 * Le fil est reconstruit à partir de la racine : passer uniquement les
 * niveaux qui suivent l'accueil.
 */
export function getBreadcrumbSchema(trail: Breadcrumb[]): JsonLdSchema {
  const items = [{ name: "Accueil", path: "/" }, ...trail];
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "@id": `${SITE_URL}${items[items.length - 1].path}#breadcrumb`,
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${SITE_URL}${item.path}`,
    })),
  };
}

/**
 * WebPage — porte la date de dernière modification réelle (issue de Git, cf.
 * lib/page-dates.ts) et les sélecteurs speakable. La fraîcheur déclarée est
 * un critère de sélection des sources par les moteurs génératifs ; sans
 * dateModified, une page est traitée comme non datée.
 */
export function getWebPageSchema(params: {
  path: string;
  name: string;
  description: string;
  breadcrumb?: Breadcrumb[];
}): JsonLdSchema {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${SITE_URL}${params.path}#webpage`,
    url: `${SITE_URL}${params.path}`,
    name: params.name,
    description: params.description,
    inLanguage: "fr-FR",
    isPartOf: { "@id": `${SITE_URL}/#website` },
    about: { "@id": `${SITE_URL}/#organization` },
    publisher: { "@id": `${SITE_URL}/#organization` },
    dateModified: getPageDate(params.path),
    speakable: SPEAKABLE,
    ...(params.breadcrumb
      ? { breadcrumb: { "@id": `${SITE_URL}${params.path}#breadcrumb` } }
      : {}),
  };
}

/** Prix public affiché sur la page, repris à l'identique dans `offers`. */
export type ServiceOffer = {
  /** Prix plancher en euros, tel qu'annoncé dans le texte de la page. */
  fromPrice: number;
  /** Ce que couvre ce prix plancher, ex. "Landing page". */
  label: string;
};

export function getServiceSchema(params: {
  name: string;
  description: string;
  url: string;
  offers?: ServiceOffer[];
}): JsonLdSchema {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${SITE_URL}${params.url}#service`,
    name: params.name,
    description: params.description,
    url: `${SITE_URL}${params.url}`,
    provider: { "@id": `${SITE_URL}/#organization` },
    areaServed: AREA_SERVED,
    serviceType: params.name,
    // `offers` ne reprend QUE des prix déjà écrits en clair sur la page.
    // Un prix structuré absent du texte visible est un écart que Google
    // sanctionne, et une donnée qu'une IA citerait sans pouvoir la vérifier.
    ...(params.offers
      ? {
          offers: params.offers.map((offer) => ({
            "@type": "Offer",
            name: offer.label,
            priceCurrency: "EUR",
            priceSpecification: {
              "@type": "PriceSpecification",
              minPrice: offer.fromPrice,
              priceCurrency: "EUR",
              valueAddedTaxIncluded: false,
            },
            // TVA non applicable (art. 293 B du CGI) : le prix affiché est
            // le prix payé, il n'y a pas de montant HT/TTC distinct.
            description: NAP.vatNote,
            availability: "https://schema.org/InStock",
            seller: { "@id": `${SITE_URL}/#organization` },
          })),
        }
      : {}),
  };
}
