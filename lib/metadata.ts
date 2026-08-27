import type { Metadata } from "next";
import { NAP } from "@/lib/constants";

/**
 * Identité d'une page, déclarée une seule fois et consommée à la fois par les
 * balises meta (pageMetadata) et par le JSON-LD (components/seo/PageSchema).
 * Dupliquer titre et description entre les deux laisse dériver l'un des deux.
 */
export type PageMeta = {
  /** Titre court, sans le suffixe " — Automatex" (ajouté par le template). */
  title: string;
  description: string;
  /** Chemin canonique, ex. "/sites-web/menuisier". */
  path: string;
  /**
   * Titre complet de l'onglet quand il ne doit PAS recevoir le template
   * "%s — Automatex" (titre déjà long, ou marque placée autrement).
   */
  absoluteTitle?: string;
  /** Retire la page de l'index (elle doit alors aussi sortir de app/sitemap.ts). */
  noIndex?: boolean;
};

/**
 * Image de partage, produite par app/opengraph-image.tsx.
 *
 * Elle doit être déclarée explicitement : Next.js remplace le bloc openGraph
 * du parent dès qu'un segment définit le sien, et la convention de fichier du
 * segment racine est alors perdue. Sans cette constante, aucune page n'expose
 * d'og:image — vérifié sur le rendu de production.
 */
const OG_IMAGE = {
  url: "/opengraph-image",
  width: 1200,
  height: 630,
  alt: "Automatex — sites web et visibilité locale pour artisans dans l'Orne",
};

/**
 * Fabrique les métadonnées d'une page : titre, description, canonique,
 * Open Graph et Twitter Card à partir d'une seule source.
 *
 * Pourquoi centraliser : Next.js n'hérite pas champ par champ. Une page qui
 * définit `title` sans définir `openGraph` se retrouve avec l'og:title du
 * layout racine — donc 23 pages partageant le même aperçu de partage, et un
 * og:title qui contredit le <title>. Les moteurs génératifs lisent og:title et
 * og:description au même titre que les balises meta pour résumer une page.
 *
 * L'image Open Graph est produite par app/opengraph-image.tsx (pas de fichier
 * binaire à maintenir) et héritée automatiquement par toutes les routes.
 */
export function pageMetadata(meta: PageMeta): Metadata {
  const { title, description, path, absoluteTitle, noIndex } = meta;
  const ogTitle = absoluteTitle ?? `${title} — ${NAP.name}`;

  return {
    title: absoluteTitle ? { absolute: absoluteTitle } : title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      locale: "fr_FR",
      siteName: NAP.name,
      url: path,
      title: ogTitle,
      description,
      images: [OG_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle,
      description,
      images: [OG_IMAGE],
    },
    ...(noIndex ? { robots: { index: false, follow: true } } : {}),
  };
}
