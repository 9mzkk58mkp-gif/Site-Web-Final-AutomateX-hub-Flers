import type { Breadcrumb } from "@/lib/schema";

/**
 * Libellé de fil d'Ariane par route. Volontairement court : le fil décrit la
 * position dans le silo, pas le titre complet de la page (qui vit dans le
 * <h1> et l'og:title). Toute nouvelle page doit être ajoutée ici, sinon son
 * segment n'apparaît pas dans le BreadcrumbList.
 */
const LABELS: Record<string, string> = {
  "/sites-web": "Sites Web",
  "/sites-web/menuisier": "Menuisier",
  "/sites-web/couvreur": "Couvreur",
  "/sites-web/plombier": "Plombier",
  "/sites-web/electricien": "Électricien",
  "/sites-web/macon": "Maçon",

  "/fiche-google": "Fiche Google",
  "/fiche-google/creer-optimiser": "Créer et optimiser",
  "/fiche-google/avis-google": "Avis Google",
  "/fiche-google/pack-local-maps": "Pack local Maps",
  "/fiche-google/photos-posts": "Photos et posts",
  "/fiche-google/fiche-vs-site": "Fiche ou site web",

  "/automatisations": "Automatisations",
  "/automatisations/relance-devis": "Relance de devis",
  "/automatisations/tri-emails": "Tri des e-mails",
  "/automatisations/devis-vocal": "Devis à la voix",

  "/site-web-flers": "Site internet à Flers",
  "/qui-je-suis": "Qui je suis",
  "/zones-intervention": "Zones d'intervention",
  "/realisations": "Réalisations",
  "/contact": "Contact",
  "/mentions-legales": "Mentions légales",
};

/**
 * Reconstruit le fil d'Ariane d'une route en remontant ses segments parents.
 * L'accueil est ajouté par getBreadcrumbSchema() — ne pas le lister ici.
 * Renvoie un tableau vide pour "/" : une page d'accueil n'a pas de fil.
 */
export function getTrail(path: string): Breadcrumb[] {
  if (path === "/") return [];

  const segments = path.replace(/^\//, "").split("/");
  const trail: Breadcrumb[] = [];

  for (let i = 0; i < segments.length; i += 1) {
    const subPath = `/${segments.slice(0, i + 1).join("/")}`;
    const name = LABELS[subPath];
    if (name) trail.push({ name, path: subPath });
  }

  return trail;
}
