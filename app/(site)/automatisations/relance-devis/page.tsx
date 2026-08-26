import type { Metadata } from "next";
import ServicePageLayout from "@/components/services/ServicePageLayout";
import FeatureList from "@/components/services/FeatureList";
import SectionHeading from "@/components/services/SectionHeading";
import SchemaScript from "@/components/seo/SchemaScript";
import { getServiceSchema } from "@/lib/schema";

const URL = "/automatisations/relance-devis";
const DESCRIPTION =
  "Relance automatique des devis pour artisans : un système suit vos devis sans réponse et relance au bon moment, sans que vous ayez à y penser.";

export const metadata: Metadata = {
  title: "Relance automatique des devis pour artisans",
  description: DESCRIPTION,
};

const POINTS = [
  "Un système suit automatiquement les devis envoyés et sans réponse",
  "Une relance part au bon moment, sans que vous ayez à y penser",
  "Vous gardez la main : vous voyez tout, vous pouvez intervenir à tout moment",
];

export default function RelanceDevisPage() {
  return (
    <>
      <SchemaScript
        schema={getServiceSchema({
          name: "Relance automatique de devis",
          description: DESCRIPTION,
          url: URL,
        })}
      />
      <ServicePageLayout
        backLink={{ href: "/automatisations", label: "Retour à Automatisations" }}
        h1="Relance automatique des devis pour artisans"
        intro="Un devis envoyé sans relance, c'est souvent un chantier perdu — pas parce que le client a dit non, mais parce que personne n'a relancé au bon moment."
        ctaText="Parlons de votre suivi de devis"
      >
        <div>
          <SectionHeading>Comment ça fonctionne concrètement</SectionHeading>
          <div className="mt-4">
            <FeatureList items={POINTS} />
          </div>
        </div>

        <p className="text-sm text-text-secondary">
          Ce que ça change : Plus de devis oubliés dans une boîte mail. Plus de clients perdus
          parce que personne n&apos;a relancé à temps.
        </p>
      </ServicePageLayout>
    </>
  );
}
