import type { Metadata } from "next";
import { pageMetadata, type PageMeta } from "@/lib/metadata";
import PageSchema from "@/components/seo/PageSchema";
import Badge from "@/components/ui/Badge";
import SiteIcon from "@/components/ui/SiteIcon";
import ServicePageLayout from "@/components/services/ServicePageLayout";
import FeatureList from "@/components/services/FeatureList";
import ChildPageGrid from "@/components/services/ChildPageGrid";
import SectionHeading from "@/components/services/SectionHeading";
import SchemaScript from "@/components/seo/SchemaScript";
import { getServiceSchema } from "@/lib/schema";
import PageFaq from "@/components/services/PageFaq";
import { SITES_WEB_FAQ } from "@/lib/service-faq";

const URL = "/sites-web";
const DESCRIPTION =
  "Site vitrine rapide et mobile-first pour artisans du bâtiment dans l'Orne, à partir de 890€ sans abonnement. Design pensé pour votre métier, pas un template.";

/** Identité de la page — source unique des balises meta et du JSON-LD. */
const PAGE: PageMeta = {
  title: "Création de site internet pour artisan dans l'Orne",
  description: DESCRIPTION,
  path: URL,
};

export const metadata: Metadata = pageMetadata(PAGE);

const INCLUSIONS = [
  "Un design propre, pensé pour votre métier — pas un template générique",
  "Optimisé mobile en priorité (la majorité de vos clients vous cherchent depuis leur téléphone)",
  "Rapide au chargement (Google pénalise les sites lents, vos visiteurs aussi)",
  "Vos réalisations mises en valeur avec de vraies photos de chantier",
  "Un formulaire de contact et un numéro visibles partout",
];

const METIER_PAGES = [
  {
    href: "/sites-web/menuisier",
    title: "Site internet pour menuisier dans l'Orne",
    description:
      "Galerie de réalisations, matériaux et finitions mis en avant, section sur-mesure.",
  },
  {
    href: "/sites-web/couvreur",
    title: "Site internet pour couvreur dans l'Orne",
    description: "Certifications et assurance décennale visibles, numéro d'urgence dès l'accueil.",
  },
  {
    href: "/sites-web/plombier",
    title: "Site internet pour plombier dans l'Orne",
    description: "Numéro en un clic, urgences mises en avant, zone d'intervention claire.",
  },
  {
    href: "/sites-web/electricien",
    title: "Site internet pour électricien dans l'Orne",
    description: "Prestations séparées clairement, certifications, formulaire de devis rapide.",
  },
  {
    href: "/sites-web/macon",
    title: "Site internet pour maçon dans l'Orne",
    description: "Galerie de chantiers par type, déroulé du chantier, garanties décennales.",
  },
];

export default function SitesWebPage() {
  return (
    <>
      <PageSchema meta={PAGE} />
      <SchemaScript
        schema={getServiceSchema({
          name: "Création de site internet pour artisan dans l'Orne",
          description: DESCRIPTION,
          url: URL,
          // Prix repris à l'identique du texte de la page (« à partir de
          // 890 € »). Ne jamais structurer un tarif absent du contenu visible.
          offers: [{ label: "Site vitrine pour artisan", fromPrice: 890 }],
        })}
      />
      <ServicePageLayout
        eyebrow={<Badge icon={<SiteIcon />}>Sites Web</Badge>}
        h1="Création de site internet pour artisan dans l'Orne"
        intro="Un site vitrine ne sert à rien s'il charge lentement ou s'il ne s'affiche pas bien sur téléphone. C'est pourtant ce que la majorité des artisans ont aujourd'hui : un site fait il y a cinq ans, jamais mis à jour, ou pas de site du tout."
        ctaText="Parlons de votre projet"
      >
        <div>
          <SectionHeading>Qu&apos;est-ce qui est inclus dans un site Automatex&nbsp;?</SectionHeading>
          <p className="mt-3 text-sm text-text-secondary">
            Un site vitrine à partir de 890&nbsp;€, sans abonnement caché : design
            adapté à votre métier, affichage mobile en priorité, galerie de vos chantiers,
            numéro et formulaire visibles sur chaque page. TVA non applicable, art. 293 B du CGI.
          </p>
          <div className="mt-4">
            <FeatureList items={INCLUSIONS} />
          </div>
          <p className="mt-6 text-sm text-text-muted">
            Tarif indicatif : à partir de 890&nbsp;€ pour un site vitrine, 1500&nbsp;€ pour une
            landing page, sans abonnement caché. TVA non applicable, art. 293 B du CGI.
          </p>
        </div>

        <div>
          <SectionHeading>Le site est-il différent selon mon métier d&apos;artisan&nbsp;?</SectionHeading>
          <p className="mt-3 text-sm text-text-secondary">
            Oui. Un couvreur doit rassurer sur l&apos;urgence et les garanties, un menuisier doit
            montrer ses finitions, un électricien doit séparer clairement ses prestations. La
            structure du site change en conséquence, pas seulement les photos.
          </p>
          <p className="mt-3 text-sm text-text-secondary">Le détail par spécialité :</p>
          <ChildPageGrid pages={METIER_PAGES} />
        </div>

        <PageFaq items={SITES_WEB_FAQ} />
      </ServicePageLayout>
    </>
  );
}
