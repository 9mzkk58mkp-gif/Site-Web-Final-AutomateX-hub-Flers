import type { Metadata } from "next";
import { pageMetadata, type PageMeta } from "@/lib/metadata";
import PageSchema from "@/components/seo/PageSchema";
import ServicePageLayout from "@/components/services/ServicePageLayout";
import FeatureList from "@/components/services/FeatureList";
import SectionHeading from "@/components/services/SectionHeading";
import SchemaScript from "@/components/seo/SchemaScript";
import { getServiceSchema } from "@/lib/schema";
import PageFaq from "@/components/services/PageFaq";
import { CREER_OPTIMISER_FAQ } from "@/lib/service-faq";

const URL = "/fiche-google/creer-optimiser";
const DESCRIPTION =
  "Créer sa fiche Google et la remplir correctement : la bonne catégorie, une zone réaliste, une description claire, et les mêmes informations partout.";

/** Identité de la page — source unique des balises meta et du JSON-LD. */
const PAGE: PageMeta = {
  title: "Créer sa fiche Google et la remplir correctement",
  description: DESCRIPTION,
  path: URL,
};

export const metadata: Metadata = pageMetadata(PAGE);

const POINTS = [
  "La bonne catégorie principale (c'est le facteur qui pèse le plus sur votre position)",
  "Une zone d'intervention réaliste, pas juste votre ville",
  "Une description qui dit clairement ce que vous faites, sans répéter votre métier dix fois",
  "Des informations identiques partout où votre entreprise apparaît en ligne (nom, adresse, téléphone)",
];

export default function CreerOptimiserPage() {
  return (
    <>
      <PageSchema meta={PAGE} />
      <SchemaScript
        schema={getServiceSchema({
          name: "Création et réglage de la fiche Google d'un artisan",
          description: DESCRIPTION,
          url: URL,
        })}
      />
      <ServicePageLayout
        backLink={{ href: "/fiche-google", label: "Retour à Fiche Google" }}
        h1="Créer sa fiche Google et la remplir correctement"
        intro="Une fiche Google, c'est gratuit à créer. Le problème, ce n'est pas de l'avoir — c'est de la remplir correctement. La plupart des artisans ont une fiche à moitié vide, avec la mauvaise catégorie ou des horaires qui datent d'il y a deux ans."
        ctaText="On configure votre fiche ensemble"
      >
        <div>
          <SectionHeading>
            Qu&apos;est-ce qui compte pour bien configurer sa fiche Google&nbsp;?
          </SectionHeading>
          <p className="mt-3 text-sm text-text-secondary">
            La catégorie principale avant tout : c&apos;est le réglage qui pèse le plus sur votre
            position. Viennent ensuite une zone d&apos;intervention réaliste, une description
            claire sans répéter votre métier dix fois, et des coordonnées identiques partout en
            ligne.
          </p>
          <div className="mt-4">
            <FeatureList items={POINTS} />
          </div>
        </div>

        <p className="text-sm text-text-secondary">
          Pourquoi ça compte plus qu&apos;on ne le pense : Une fiche Google mal configurée,
          c&apos;est une fiche que Google ne montre pas, même si vous avez de bons avis. La
          configuration de base pèse plus lourd que la plupart des artisans ne l&apos;imaginent.
        </p>

        <PageFaq items={CREER_OPTIMISER_FAQ} />
      </ServicePageLayout>
    </>
  );
}
