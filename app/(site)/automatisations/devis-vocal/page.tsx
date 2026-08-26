import type { Metadata } from "next";
import ServicePageLayout from "@/components/services/ServicePageLayout";
import FeatureList from "@/components/services/FeatureList";
import SectionHeading from "@/components/services/SectionHeading";
import SchemaScript from "@/components/seo/SchemaScript";
import { getServiceSchema } from "@/lib/schema";

const URL = "/automatisations/devis-vocal";
const DESCRIPTION =
  "Devis à la voix pour artisans : dictez les informations depuis votre téléphone, le système retranscrit et structure automatiquement le devis.";

export const metadata: Metadata = {
  title: "Devis à la voix pour artisans",
  description: DESCRIPTION,
};

const POINTS = [
  "Vous dictez les informations du devis directement depuis votre téléphone",
  "Le système retranscrit et structure automatiquement les informations",
  "Vous récupérez une base de devis prête à finaliser, sans ressaisie",
];

export default function DevisVocalPage() {
  return (
    <>
      <SchemaScript
        schema={getServiceSchema({
          name: "Devis à la voix",
          description: DESCRIPTION,
          url: URL,
        })}
      />
      <ServicePageLayout
        backLink={{ href: "/automatisations", label: "Retour à Automatisations" }}
        h1="Devis à la voix pour artisans"
        intro="Sur un chantier, prendre des notes pour un devis n'est pas toujours pratique. Le devis vocal permet de dicter les informations directement, sans s'arrêter pour écrire."
        ctaText="Voyons si ça peut vous servir"
      >
        <div>
          <SectionHeading>Comment ça fonctionne concrètement</SectionHeading>
          <div className="mt-4">
            <FeatureList items={POINTS} />
          </div>
        </div>

        <p className="text-sm text-text-secondary">
          Ce que ça change : Moins de temps passé à taper le soir, plus de temps sur le chantier
          ou en famille.
        </p>
      </ServicePageLayout>
    </>
  );
}
