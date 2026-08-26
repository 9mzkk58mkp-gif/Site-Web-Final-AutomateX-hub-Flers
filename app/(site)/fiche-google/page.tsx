import type { Metadata } from "next";
import Badge from "@/components/ui/Badge";
import GoogleIcon from "@/components/ui/GoogleIcon";
import ServicePageLayout from "@/components/services/ServicePageLayout";
import FeatureList from "@/components/services/FeatureList";
import ChildPageCard from "@/components/services/ChildPageCard";
import SectionHeading from "@/components/services/SectionHeading";

export const metadata: Metadata = {
  title: "Optimisation de fiche Google Business pour artisan dans l'Orne",
  description:
    "Configuration, avis, pack local, photos : je gère votre fiche Google Business pour artisan dans l'Orne, à partir de 150€ ou incluse dans un pack site web.",
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
    description: "Pertinence, distance, notoriété : les trois critères qui déterminent votre position.",
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
    <ServicePageLayout
      eyebrow={
        <Badge icon={<GoogleIcon size={14} />}>Fiche Google</Badge>
      }
      h1="Optimisation de fiche Google Business pour artisan dans l'Orne"
      intro="Avant même votre site, c'est votre fiche Google que vos clients voient. Elle apparaît sur Google Maps, dans le pack local, et de plus en plus dans les réponses des IA quand quelqu'un cherche un artisan près de chez lui. Une fiche incomplète, c'est une fiche invisible."
      ctaText="Faisons le point sur votre fiche"
    >
      <div>
        <SectionHeading>Ce que je fais sur votre fiche</SectionHeading>
        <div className="mt-4">
          <FeatureList items={INCLUSIONS} />
        </div>
        <p className="mt-6 text-sm text-text-muted">
          Tarif indicatif : à partir de 150€, ou inclus dans un pack site web. TVA non
          applicable, art. 293 B du CGI.
        </p>
      </div>

      <div>
        <SectionHeading>Le détail par sujet</SectionHeading>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          {CHILD_PAGES.map((page) => (
            <ChildPageCard key={page.href} {...page} />
          ))}
        </div>
      </div>
    </ServicePageLayout>
  );
}
