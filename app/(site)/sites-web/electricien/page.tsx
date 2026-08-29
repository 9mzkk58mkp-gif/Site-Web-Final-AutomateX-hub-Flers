import type { Metadata } from "next";
import { pageMetadata, type PageMeta } from "@/lib/metadata";
import PageSchema from "@/components/seo/PageSchema";
import ServicePageLayout from "@/components/services/ServicePageLayout";
import FeatureList from "@/components/services/FeatureList";
import SectionHeading from "@/components/services/SectionHeading";
import SchemaScript from "@/components/seo/SchemaScript";
import { getServiceSchema } from "@/lib/schema";
import PageFaq from "@/components/services/PageFaq";
import { ELECTRICIEN_FAQ } from "@/lib/service-faq";

const URL = "/sites-web/electricien";
const DESCRIPTION =
  "Site internet pour électricien dans l'Orne : prestations séparées clairement, certifications Consuel/Qualifelec, formulaire de devis rapide.";

/** Identité de la page — source unique des balises meta et du JSON-LD. */
const PAGE: PageMeta = {
  title: "Site internet pour électricien dans l'Orne",
  description: DESCRIPTION,
  path: URL,
};

export const metadata: Metadata = pageMetadata(PAGE);

const POINTS = [
  "Séparation claire des prestations (mise aux normes, dépannage, domotique, bornes)",
  "Mention des certifications si vous en avez (Consuel, Qualifelec)",
  "Rassurance sur la sécurité et la conformité des installations",
  "Formulaire de contact simple pour une demande de devis rapide",
];

export default function ElectricienPage() {
  return (
    <>
      <PageSchema meta={PAGE} />
      <SchemaScript
        schema={getServiceSchema({
          name: "Site internet pour électricien dans l'Orne",
          description: DESCRIPTION,
          url: URL,
        })}
      />
      <ServicePageLayout
        backLink={{ href: "/sites-web", label: "Retour à Sites Web" }}
        h1="Site internet pour électricien dans l'Orne"
        intro="Entre mise aux normes, rénovation électrique et installation de bornes de recharge, un électricien couvre souvent plusieurs types de prestations très différentes. Le site doit les distinguer clairement pour que le client trouve tout de suite ce qu'il cherche."
        ctaText="Discutons de votre site"
      >
        <div>
          <SectionHeading>Qu&apos;est-ce qui compte pour un site d&apos;électricien&nbsp;?</SectionHeading>
          <p className="mt-3 text-sm text-text-secondary">
            Séparer clairement les prestations, parce qu&apos;une mise aux normes, un dépannage, de la domotique et une borne de recharge n&apos;attirent pas les mêmes clients. Les certifications et un formulaire de devis rapide complètent l&apos;ensemble.
          </p>
          <div className="mt-4">
            <FeatureList items={POINTS} />
          </div>
        </div>

        <PageFaq items={ELECTRICIEN_FAQ} />
      </ServicePageLayout>
    </>
  );
}
