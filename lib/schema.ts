import type { JsonLdSchema } from "@/components/seo/SchemaScript";
import {
  AREA_SERVED,
  LINKEDIN_URL,
  NAP,
  OTHER_AREAS,
  PRIORITY_AREAS,
  SITE_URL,
  SOCIAL_LINKS,
} from "@/lib/constants";

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
    sameAs: [LINKEDIN_URL],
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
    founder: getPersonSchema(),
    telephone: NAP.phoneE164,
    email: NAP.email,
    url: SITE_URL,
    image: `${SITE_URL}/logo-mark.png`,
    areaServed: [...PRIORITY_AREAS, ...OTHER_AREAS].map((name) => ({
      "@type": "AdministrativeArea",
      name,
    })),
    priceRange: "€€",
    sameAs: [...SOCIAL_LINKS],
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

export function getServiceSchema(params: {
  name: string;
  description: string;
  url: string;
}): JsonLdSchema {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: params.name,
    description: params.description,
    url: `${SITE_URL}${params.url}`,
    provider: { "@id": `${SITE_URL}/#organization` },
    areaServed: AREA_SERVED,
  };
}
