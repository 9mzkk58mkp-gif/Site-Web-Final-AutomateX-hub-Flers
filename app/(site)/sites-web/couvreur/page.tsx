import type { Metadata } from "next";
import { pageMetadata, type PageMeta } from "@/lib/metadata";
import PageSchema from "@/components/seo/PageSchema";
import ServicePageLayout from "@/components/services/ServicePageLayout";
import FeatureList from "@/components/services/FeatureList";
import SectionHeading from "@/components/services/SectionHeading";
import SchemaScript from "@/components/seo/SchemaScript";
import { getServiceSchema } from "@/lib/schema";
import PageFaq from "@/components/services/PageFaq";
import { COUVREUR_FAQ } from "@/lib/service-faq";

const URL = "/sites-web/couvreur";
const DESCRIPTION =
  "Site internet pour couvreur dans l'Orne : certifications et assurance décennale visibles, numéro d'urgence dès l'accueil, avant/après de chantiers.";

/** Identité de la page — source unique des balises meta et du JSON-LD. */
const PAGE: PageMeta = {
  title: "Site internet pour couvreur dans l'Orne",
  description: DESCRIPTION,
  path: URL,
};

export const metadata: Metadata = pageMetadata(PAGE);

const POINTS = [
  "Mise en avant immédiate des certifications et de l'assurance décennale",
  "Un numéro d'urgence visible dès la page d'accueil (fuite, dégât des eaux)",
  "Photos avant/après de chantiers de rénovation de toiture",
  "Section claire sur les types d'interventions (rénovation, isolation, zinguerie, entretien)",
];

export default function CouvreurPage() {
  return (
    <>
      <PageSchema meta={PAGE} />
      <SchemaScript
        schema={getServiceSchema({
          name: "Site internet pour couvreur dans l'Orne",
          description: DESCRIPTION,
          url: URL,
        })}
      />
      <ServicePageLayout
        backLink={{ href: "/sites-web", label: "Retour à Sites Web" }}
        h1="Site internet pour couvreur dans l'Orne"
        intro="La toiture, c'est un chantier qui fait peur au particulier : budget élevé, urgence en cas de fuite, confiance obligatoire avant de laisser quelqu'un monter sur son toit. Votre site doit rassurer avant tout — certifications, assurance décennale, avant/après clairs."
        ctaText="Discutons de votre site"
      >
        <div>
          <SectionHeading>Qu&apos;est-ce qui compte pour un site de couvreur&nbsp;?</SectionHeading>
          <p className="mt-3 text-sm text-text-secondary">
            Rassurer vite, parce qu&apos;une toiture engage un gros budget et parfois une urgence : certifications et assurance décennale visibles d&apos;emblée, numéro d&apos;urgence dès l&apos;accueil, et des avant/après de chantiers réels.
          </p>
          <div className="mt-4">
            <FeatureList items={POINTS} />
          </div>
        </div>

        <p className="text-sm text-text-secondary">
          Ce que je connais du métier : Deux mois de couverture en immersion. Assez pour savoir
          qu&apos;un client en urgence ne cherche pas un joli site — il cherche un numéro qui
          répond vite et une preuve que vous êtes du métier.
        </p>

        <PageFaq items={COUVREUR_FAQ} />
      </ServicePageLayout>
    </>
  );
}
