import type { Metadata } from "next";
import ServicePageLayout from "@/components/services/ServicePageLayout";
import FeatureList from "@/components/services/FeatureList";
import SectionHeading from "@/components/services/SectionHeading";
import SchemaScript from "@/components/seo/SchemaScript";
import { getServiceSchema } from "@/lib/schema";

const URL = "/sites-web/plombier";
const DESCRIPTION =
  "Site internet pour plombier dans l'Orne : numéro visible en un clic, mention des urgences, prestations et zone d'intervention affichées clairement.";

export const metadata: Metadata = {
  title: "Site internet pour plombier dans l'Orne",
  description: DESCRIPTION,
};

const POINTS = [
  "Numéro de contact visible en un clic depuis mobile, sans scroller",
  "Mention claire des interventions d'urgence si vous en proposez",
  "Liste simple des prestations (dépannage, installation, chauffage, sanitaire)",
  "Zone d'intervention affichée clairement pour rassurer sur le délai de venue",
];

export default function PlombierPage() {
  return (
    <>
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
          <SectionHeading>Ce qui compte pour un site de plombier</SectionHeading>
          <div className="mt-4">
            <FeatureList items={POINTS} />
          </div>
        </div>
      </ServicePageLayout>
    </>
  );
}
