import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/constants";
import { getPageDate } from "@/lib/page-dates";

const STATIC_ROUTES = [
  { path: "/", priority: 1, changeFrequency: "weekly" as const },
  { path: "/qui-je-suis", priority: 0.7, changeFrequency: "monthly" as const },
  { path: "/zones-intervention", priority: 0.6, changeFrequency: "monthly" as const },
  // /realisations est en noindex tant qu'aucune étude de cas n'est publiée
  // (voir app/(site)/realisations/page.tsx) : l'inscrire au sitemap
  // contredirait la directive robots. À remettre en même temps que l'index.
  { path: "/contact", priority: 0.8, changeFrequency: "monthly" as const },
  { path: "/mentions-legales", priority: 0.2, changeFrequency: "yearly" as const },

  { path: "/site-web-flers", priority: 0.8, changeFrequency: "monthly" as const },

  { path: "/sites-web", priority: 0.9, changeFrequency: "monthly" as const },
  { path: "/sites-web/menuisier", priority: 0.7, changeFrequency: "monthly" as const },
  { path: "/sites-web/couvreur", priority: 0.7, changeFrequency: "monthly" as const },
  { path: "/sites-web/plombier", priority: 0.7, changeFrequency: "monthly" as const },
  { path: "/sites-web/electricien", priority: 0.7, changeFrequency: "monthly" as const },
  { path: "/sites-web/macon", priority: 0.7, changeFrequency: "monthly" as const },

  { path: "/fiche-google", priority: 0.9, changeFrequency: "monthly" as const },
  { path: "/fiche-google/creer-optimiser", priority: 0.7, changeFrequency: "monthly" as const },
  { path: "/fiche-google/avis-google", priority: 0.7, changeFrequency: "monthly" as const },
  { path: "/fiche-google/pack-local-maps", priority: 0.7, changeFrequency: "monthly" as const },
  { path: "/fiche-google/photos-posts", priority: 0.7, changeFrequency: "monthly" as const },
  { path: "/fiche-google/fiche-vs-site", priority: 0.7, changeFrequency: "monthly" as const },

  { path: "/automatisations", priority: 0.9, changeFrequency: "monthly" as const },
  { path: "/automatisations/relance-devis", priority: 0.7, changeFrequency: "monthly" as const },
  { path: "/automatisations/tri-emails", priority: 0.7, changeFrequency: "monthly" as const },
  { path: "/automatisations/devis-vocal", priority: 0.7, changeFrequency: "monthly" as const },
];

export default function sitemap(): MetadataRoute.Sitemap {
  // lastModified vient de l'historique Git (lib/page-dates.ts), pas de
  // `new Date()` : annoncer à chaque déploiement que les 23 pages viennent
  // d'être modifiées dévalue le signal <lastmod>, dont les crawlers — IA
  // comprises — se servent pour décider d'un re-crawl.
  return STATIC_ROUTES.map((route) => ({
    url: `${SITE_URL}${route.path}`,
    lastModified: getPageDate(route.path),
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
