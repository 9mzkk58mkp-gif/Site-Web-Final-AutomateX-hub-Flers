import type { Metadata } from "next";
import Badge from "@/components/ui/Badge";
import GoogleIcon from "@/components/ui/GoogleIcon";
import ServicePageLayout from "@/components/services/ServicePageLayout";
import FeatureList from "@/components/services/FeatureList";
import ChildPageGrid from "@/components/services/ChildPageGrid";
import SectionHeading from "@/components/services/SectionHeading";
import SchemaScript from "@/components/seo/SchemaScript";
import { getServiceSchema } from "@/lib/schema";

const URL = "/fiche-google";
const DESCRIPTION =
  "Configuration, avis, pack local, photos : je gère votre fiche Google Business pour artisan dans l'Orne, à partir de 150€ ou incluse dans un pack site web.";

export const metadata: Metadata = {
  title: "Optimisation de fiche Google Business pour artisan dans l'Orne",
  description: DESCRIPTION,
  alternates: { canonical: "/fiche-google" },
};

const INCLUSIONS = [
  "Configuration complète : catégorie, zone d'intervention, horaires, services",
  "Stratégie d'avis clients pour construire la confiance",
  "Optimisation pour apparaître dans le pack local (les 3 résultats en haut de Google Maps)",
  "Photos et posts réguliers pour garder la fiche active",
  "Explication claire de la différence entre fiche Google et site web, et pourquoi vous avez besoin des deux",
];

const CHILD_PAGES = [
  {
    href: "/fiche-google/creer-optimiser",
    title: "Créer et optimiser sa fiche Google Business",
    description: "La bonne catégorie, une zone réaliste, des informations identiques partout.",
  },
  {
    href: "/fiche-google/avis-google",
    title: "Avis Google : comment les obtenir et les gérer",
    description: "Demander au bon moment, faciliter la démarche, répondre à chaque avis.",
  },
  {
    href: "/fiche-google/pack-local-maps",
    title: "Pack local Google Maps : comment y apparaître",
    description:
      "Pertinence, distance, notoriété : les trois critères qui déterminent votre position.",
  },
  {
    href: "/fiche-google/photos-posts",
    title: "Photos et posts Google : garder sa fiche active",
    description: "Un rythme de publication simple et tenable avec de vrais visuels de chantier.",
  },
  {
    href: "/fiche-google/fiche-vs-site",
    title: "Fiche Google ou site web : lequel choisir en premier",
    description: "La réponse honnête selon votre budget et vos objectifs de visibilité.",
  },
];

export default function FicheGooglePage() {
  return (
    <>
      <SchemaScript
        schema={getServiceSchema({
          name: "Optimisation de fiche Google Business pour artisan dans l'Orne",
          description: DESCRIPTION,
          url: URL,
        })}
      />
      <ServicePageLayout
        eyebrow={<Badge icon={<GoogleIcon size={14} />}>Fiche Google</Badge>}
        h1="Optimisation de fiche Google Business pour artisan dans l'Orne"
        intro="Avant même votre site, c'est votre fiche Google que vos clients voient. Elle apparaît sur Google Maps, dans le pack local, et de plus en plus dans les réponses des IA quand quelqu'un cherche un artisan près de chez lui. Une fiche incomplète, c'est une fiche invisible."
        ctaText="Faisons le point sur votre fiche"
      >
        <div>
          <SectionHeading>
            Qu&apos;est-ce qui est inclus dans l&apos;optimisation de votre fiche Google&nbsp;?
          </SectionHeading>
          <p className="mt-3 text-sm text-text-secondary">
            La configuration complète de la fiche, la stratégie d&apos;avis clients,
            l&apos;optimisation pour le pack local et la publication de photos et de posts
            réguliers. À partir de 150&nbsp;€, ou inclus dans un pack site web. TVA non
            applicable, art. 293 B du CGI.
          </p>
          <div className="mt-4">
            <FeatureList items={INCLUSIONS} />
          </div>
          <p className="mt-6 text-sm text-text-muted">
            Tarif indicatif : à partir de 150€, ou inclus dans un pack site web. TVA non applicable,
            art. 293 B du CGI.
          </p>
        </div>

        <div>
          <SectionHeading>Le détail par sujet</SectionHeading>
          <ChildPageGrid pages={CHILD_PAGES} />
        </div>
      </ServicePageLayout>
    </>
  );
}
