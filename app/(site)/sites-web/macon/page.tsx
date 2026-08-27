import type { Metadata } from "next";
import ServicePageLayout from "@/components/services/ServicePageLayout";
import FeatureList from "@/components/services/FeatureList";
import SectionHeading from "@/components/services/SectionHeading";
import SchemaScript from "@/components/seo/SchemaScript";
import { getServiceSchema } from "@/lib/schema";

const URL = "/sites-web/macon";
const DESCRIPTION =
  "Site internet pour maçon dans l'Orne : galerie de chantiers par type, déroulé du chantier expliqué, assurance décennale et zone d'intervention.";

export const metadata: Metadata = {
  title: "Site internet pour maçon dans l'Orne",
  description: DESCRIPTION,
  alternates: { canonical: "/sites-web/macon" },
};

const POINTS = [
  "Galerie de chantiers réalisés, classés par type (extension, rénovation, gros œuvre)",
  "Explication claire du déroulé d'un chantier type",
  "Mise en avant de l'assurance décennale et des garanties",
  "Zone d'intervention et délais habituels affichés",
];

export default function MaconPage() {
  return (
    <>
      <SchemaScript
        schema={getServiceSchema({
          name: "Site internet pour maçon dans l'Orne",
          description: DESCRIPTION,
          url: URL,
        })}
      />
      <ServicePageLayout
        backLink={{ href: "/sites-web", label: "Retour à Sites Web" }}
        h1="Site internet pour maçon dans l'Orne"
        intro="Un chantier de maçonnerie engage souvent un budget conséquent et plusieurs semaines de travaux. Le client a besoin de se projeter avant de contacter : réalisations passées, types de chantiers gérés (extension, gros œuvre, rénovation)."
        ctaText="Discutons de votre site"
      >
        <div>
          <SectionHeading>Qu&apos;est-ce qui compte pour un site de maçon&nbsp;?</SectionHeading>
          <p className="mt-3 text-sm text-text-secondary">
            Montrer l&apos;ampleur des chantiers déjà menés et expliquer le déroulé : galerie classée par type de travaux, étapes du chantier détaillées, garanties et zone d&apos;intervention affichées.
          </p>
          <div className="mt-4">
            <FeatureList items={POINTS} />
          </div>
        </div>
      </ServicePageLayout>
    </>
  );
}
