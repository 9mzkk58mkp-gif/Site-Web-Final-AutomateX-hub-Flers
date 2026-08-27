import type { Metadata } from "next";
import ServicePageLayout from "@/components/services/ServicePageLayout";
import FeatureList from "@/components/services/FeatureList";
import SectionHeading from "@/components/services/SectionHeading";
import SchemaScript from "@/components/seo/SchemaScript";
import { getServiceSchema } from "@/lib/schema";

const URL = "/fiche-google/avis-google";
const DESCRIPTION =
  "Obtenir et gérer ses avis Google en tant qu'artisan : demander au bon moment, carte NFC pour faciliter la démarche, répondre à chaque avis.";

export const metadata: Metadata = {
  title: "Obtenir et gérer ses avis Google en tant qu'artisan",
  description: DESCRIPTION,
  alternates: { canonical: "/fiche-google/avis-google" },
};

const POINTS = [
  "Demander au bon moment : juste après la fin du chantier, quand la satisfaction est fraîche",
  "Faciliter la démarche avec un lien direct ou une carte NFC (un tap et le client arrive sur la page d'avis)",
  "Répondre à chaque avis, positif comme négatif — ça montre que vous êtes actif et sérieux",
];

export default function AvisGooglePage() {
  return (
    <>
      <SchemaScript
        schema={getServiceSchema({
          name: "Stratégie d'avis Google pour artisans",
          description: DESCRIPTION,
          url: URL,
        })}
      />
      <ServicePageLayout
        backLink={{ href: "/fiche-google", label: "Retour à Fiche Google" }}
        h1="Obtenir et gérer ses avis Google en tant qu'artisan"
        intro="Les avis, c'est ce qui rassure un particulier avant de vous appeler. Le problème, c'est que peu de clients pensent spontanément à en laisser un — même quand ils sont contents du travail."
        ctaText="Parlons de votre stratégie d'avis"
      >
        <div>
          <SectionHeading>
            Comment obtenir plus d&apos;avis Google sans être insistant&nbsp;?
          </SectionHeading>
          <p className="mt-3 text-sm text-text-secondary">
            En demandant une seule fois, au bon moment : juste après la fin du chantier, quand la
            satisfaction est encore fraîche. Et en rendant la démarche immédiate, avec un lien
            direct ou une carte NFC, plutôt qu&apos;en relançant plusieurs fois.
          </p>
          <div className="mt-4">
            <FeatureList items={POINTS} />
          </div>
        </div>

        <p className="text-sm text-text-secondary">
          Ce que je propose : Une carte NFC personnalisée à laisser au client en fin de chantier :
          il la scanne avec son téléphone et arrive directement sur votre page d&apos;avis Google,
          sans chercher.
        </p>
      </ServicePageLayout>
    </>
  );
}
