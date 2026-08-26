import type { Metadata } from "next";
import ServicePageLayout from "@/components/services/ServicePageLayout";
import FeatureList from "@/components/services/FeatureList";
import SectionHeading from "@/components/services/SectionHeading";
import SchemaScript from "@/components/seo/SchemaScript";
import { getServiceSchema } from "@/lib/schema";

const URL = "/automatisations/tri-emails";
const DESCRIPTION =
  "Tri automatique des e-mails pour artisans : demandes de devis mises en avant, réponses brouillon prêtes pour les demandes courantes.";

export const metadata: Metadata = {
  title: "Tri automatique des e-mails pour artisans",
  description: DESCRIPTION,
};

const POINTS = [
  "Les mails sont automatiquement triés par type (demande client, facture, autre)",
  "Les demandes de devis sont mises en avant en priorité",
  "Des réponses brouillon sont préparées pour les demandes courantes, vous n'avez plus qu'à valider",
];

export default function TriEmailsPage() {
  return (
    <>
      <SchemaScript
        schema={getServiceSchema({
          name: "Tri automatique des e-mails",
          description: DESCRIPTION,
          url: URL,
        })}
      />
      <ServicePageLayout
        backLink={{ href: "/automatisations", label: "Retour à Automatisations" }}
        h1="Tri automatique des e-mails pour artisans"
        intro="Entre les demandes de devis, les factures fournisseurs et les mails publicitaires, la boîte mail d'un artisan devient vite un fouillis. Résultat : des demandes de clients qui se perdent dans le tas."
        ctaText="On regarde comment organiser vos mails"
      >
        <div>
          <SectionHeading>Comment ça fonctionne concrètement</SectionHeading>
          <div className="mt-4">
            <FeatureList items={POINTS} />
          </div>
        </div>

        <p className="text-sm text-text-secondary">
          Ce que ça change : Vous ne passez plus votre soirée à trier. Vous voyez ce qui compte en
          premier.
        </p>
      </ServicePageLayout>
    </>
  );
}
