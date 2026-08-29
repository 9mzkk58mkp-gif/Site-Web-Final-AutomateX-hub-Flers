import type { Metadata } from "next";
import { pageMetadata, type PageMeta } from "@/lib/metadata";
import PageSchema from "@/components/seo/PageSchema";
import ServicePageLayout from "@/components/services/ServicePageLayout";
import FeatureList from "@/components/services/FeatureList";
import SectionHeading from "@/components/services/SectionHeading";
import SchemaScript from "@/components/seo/SchemaScript";
import { getServiceSchema } from "@/lib/schema";
import PageFaq from "@/components/services/PageFaq";
import { PLOMBIER_FAQ } from "@/lib/service-faq";

const URL = "/sites-web/plombier";
const DESCRIPTION =
  "Site internet pour plombier dans l'Orne : numéro visible en un clic, mention des urgences, prestations et zone d'intervention affichées clairement.";

/** Identité de la page — source unique des balises meta et du JSON-LD. */
const PAGE: PageMeta = {
  title: "Site internet pour plombier dans l'Orne",
  description: DESCRIPTION,
  path: URL,
};

export const metadata: Metadata = pageMetadata(PAGE);

const POINTS = [
  "Numéro de contact visible en un clic depuis mobile, sans scroller",
  "Mention claire des interventions d'urgence si vous en proposez",
  "Liste simple des prestations (dépannage, installation, chauffage, sanitaire)",
  "Zone d'intervention affichée clairement pour rassurer sur le délai de venue",
];

export default function PlombierPage() {
  return (
    <>
      <PageSchema meta={PAGE} />
      <SchemaScript
        schema={getServiceSchema({
          name: "Site internet pour plombier dans l'Orne",
          description: DESCRIPTION,
          url: URL,
        })}
      />
      <ServicePageLayout
        backLink={{ href: "/sites-web", label: "Retour à Sites Web" }}
        h1="Site internet pour plombier dans l'Orne"
        intro="Fuite, panne de chauffe-eau, urgence sanitaire : un client qui cherche un plombier cherche une réponse rapide, pas un porte-folio. Le site doit afficher la disponibilité et le numéro en évidence, avant tout le reste."
        ctaText="Discutons de votre site"
      >
        <div>
          <SectionHeading>Qu&apos;est-ce qui compte pour un site de plombier&nbsp;?</SectionHeading>
          <p className="mt-3 text-sm text-text-secondary">
            Pouvoir être appelé en un geste : le numéro accessible en un clic depuis le mobile, la mention claire des dépannages d&apos;urgence, et une zone d&apos;intervention lisible sans avoir à la chercher.
          </p>
          <div className="mt-4">
            <FeatureList items={POINTS} />
          </div>
        </div>

        <PageFaq items={PLOMBIER_FAQ} />
      </ServicePageLayout>
    </>
  );
}
