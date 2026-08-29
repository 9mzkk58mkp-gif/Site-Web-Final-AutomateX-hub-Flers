import type { Metadata } from "next";
import { pageMetadata, type PageMeta } from "@/lib/metadata";
import PageSchema from "@/components/seo/PageSchema";
import ServicePageLayout from "@/components/services/ServicePageLayout";
import FeatureList from "@/components/services/FeatureList";
import SectionHeading from "@/components/services/SectionHeading";
import SchemaScript from "@/components/seo/SchemaScript";
import { getServiceSchema } from "@/lib/schema";
import PageFaq from "@/components/services/PageFaq";
import { MACON_FAQ } from "@/lib/service-faq";

const URL = "/sites-web/macon";
const DESCRIPTION =
  "Site internet pour maçon dans l'Orne : galerie de chantiers par type, déroulé du chantier expliqué, assurance décennale et zone d'intervention.";

/** Identité de la page — source unique des balises meta et du JSON-LD. */
const PAGE: PageMeta = {
  title: "Site internet pour maçon dans l'Orne",
  description: DESCRIPTION,
  path: URL,
};

export const metadata: Metadata = pageMetadata(PAGE);

const POINTS = [
  "Galerie de chantiers réalisés, classés par type (extension, rénovation, gros œuvre)",
  "Explication claire du déroulé d'un chantier type",
  "Mise en avant de l'assurance décennale et des garanties",
  "Zone d'intervention et délais habituels affichés",
];

export default function MaconPage() {
  return (
    <>
      <PageSchema meta={PAGE} />
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

        <PageFaq items={MACON_FAQ} />
      </ServicePageLayout>
    </>
  );
}
