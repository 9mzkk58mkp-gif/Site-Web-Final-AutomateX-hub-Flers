/**
 * FICHIER GÉNÉRÉ — ne pas éditer à la main.
 * Régénérer avec `npm run build:page-dates` (voir scripts/build-page-dates.ts).
 *
 * Date de dernière modification réelle de chaque page, issue de l'historique
 * Git. Consommée par app/sitemap.ts (<lastmod>) et lib/schema.ts (dateModified).
 */
export const PAGE_DATES: Record<string, string> = {
  "/": "2026-08-27T15:40:29+02:00",
  "/automatisations": "2026-08-27T15:40:29+02:00",
  "/automatisations/devis-vocal": "2026-08-27T15:40:29+02:00",
  "/automatisations/relance-devis": "2026-08-27T15:40:29+02:00",
  "/automatisations/tri-emails": "2026-08-27T15:40:29+02:00",
  "/contact": "2026-08-27T15:40:29+02:00",
  "/fiche-google": "2026-08-27T15:40:29+02:00",
  "/fiche-google/avis-google": "2026-08-27T15:40:29+02:00",
  "/fiche-google/creer-optimiser": "2026-08-27T15:40:29+02:00",
  "/fiche-google/fiche-vs-site": "2026-08-27T15:40:29+02:00",
  "/fiche-google/pack-local-maps": "2026-08-27T15:40:29+02:00",
  "/fiche-google/photos-posts": "2026-08-27T15:40:29+02:00",
  "/mentions-legales": "2026-08-27T15:40:29+02:00",
  "/qui-je-suis": "2026-08-27T15:40:29+02:00",
  "/realisations": "2026-08-27T15:40:29+02:00",
  "/site-web-flers": "2026-08-27T15:40:29+02:00",
  "/sites-web": "2026-08-27T15:40:29+02:00",
  "/sites-web/couvreur": "2026-08-27T15:40:29+02:00",
  "/sites-web/electricien": "2026-08-27T15:40:29+02:00",
  "/sites-web/macon": "2026-08-27T15:40:29+02:00",
  "/sites-web/menuisier": "2026-08-27T15:40:29+02:00",
  "/sites-web/plombier": "2026-08-27T15:40:29+02:00",
  "/zones-intervention": "2026-08-27T15:40:29+02:00",
};

/** Date de modification d'une route, ou la plus récente du site en secours. */
export function getPageDate(route: string): string {
  return PAGE_DATES[route] ?? SITE_LAST_MODIFIED;
}

export const SITE_LAST_MODIFIED: string = "2026-08-27T15:40:29+02:00";
