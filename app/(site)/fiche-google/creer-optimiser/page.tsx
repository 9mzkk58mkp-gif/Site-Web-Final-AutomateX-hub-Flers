import type { Metadata } from "next";
import ServicePageLayout from "@/components/services/ServicePageLayout";
import FeatureList from "@/components/services/FeatureList";
import SectionHeading from "@/components/services/SectionHeading";
import SchemaScript from "@/components/seo/SchemaScript";
import { getServiceSchema } from "@/lib/schema";

const URL = "/fiche-google/creer-optimiser";
const DESCRIPTION =
  "Créer et optimiser sa fiche Google Business : bonne catégorie, zone d'intervention réaliste, description sans bourrage de mots-clés, NAP cohérent.";

export const metadata: Metadata = {
  title: "Créer et optimiser sa fiche Google Business",
  description: DESCRIPTION,
};

const POINTS = [
  "La bonne catégorie principale (c'est le facteur qui pèse le plus sur votre position)",
  "Une zone d'intervention réaliste, pas juste votre ville",
  "Une description qui explique clairement ce que vous faites, sans bourrage de mots-clés",
  "Des informations identiques partout où votre entreprise apparaît en ligne (nom, adresse, téléphone)",
];

export default function CreerOptimiserPage() {
  return (
    <>
      <SchemaScript
        schema={getServiceSchema({
          name: "Création et optimisation de fiche Google Business",
          description: DESCRIPTION,
          url: URL,
        })}
      />
      <ServicePageLayout
        backLink={{ href: "/fiche-google", label: "Retour à Fiche Google" }}
        h1="Créer et optimiser sa fiche Google Business"
        intro="Une fiche Google Business, c'est gratuit à créer. Le problème, ce n'est pas de l'avoir — c'est de la remplir correctement. La plupart des artisans ont une fiche à moitié vide, avec la mauvaise catégorie ou des horaires qui datent d'il y a deux ans."
        ctaText="On configure votre fiche ensemble"
      >
        <div>
          <SectionHeading>Ce qui compte pour bien la configurer</SectionHeading>
          <div className="mt-4">
            <FeatureList items={POINTS} />
          </div>
        </div>

        <p className="text-sm text-text-secondary">
          Pourquoi ça compte plus qu&apos;on ne le pense : Une fiche Google mal configurée,
          c&apos;est une fiche que Google ne montre pas, même si vous avez de bons avis. La
          configuration de base pèse plus lourd que la plupart des artisans ne l&apos;imaginent.
        </p>
      </ServicePageLayout>
    </>
  );
}
