import type { Metadata } from "next";
import { pageMetadata, type PageMeta } from "@/lib/metadata";
import PageSchema from "@/components/seo/PageSchema";
import ServicePageLayout from "@/components/services/ServicePageLayout";
import SectionHeading from "@/components/services/SectionHeading";
import FeatureList from "@/components/services/FeatureList";
import SchemaScript from "@/components/seo/SchemaScript";
import { getServiceSchema } from "@/lib/schema";

const URL = "/fiche-google/fiche-vs-site";
const DESCRIPTION =
  "Fiche Google ou site web : lequel choisir en premier selon votre budget, vos réalisations à montrer et le type de clients que vous ciblez.";

/** Identité de la page — source unique des balises meta et du JSON-LD. */
const PAGE: PageMeta = {
  title: "Fiche Google ou site web : lequel choisir en premier",
  description: DESCRIPTION,
  path: URL,
};

export const metadata: Metadata = pageMetadata(PAGE);

const FICHE_FIRST = [
  "Vous voulez des appels rapidement, sans attendre",
  "Votre budget est limité pour l'instant",
  "Vous n'avez pas encore beaucoup de réalisations à montrer",
];

const SITE_FIRST = [
  "Vous travaillez surtout sur recommandation et devis premium",
  "Vous voulez montrer un book de réalisations détaillé",
  "Vous visez des clients qui comparent plusieurs prestataires avant de choisir",
];

export default function FicheVsSitePage() {
  return (
    <>
      <PageSchema meta={PAGE} />
      <SchemaScript
        schema={getServiceSchema({
          name: "Conseil fiche Google ou site web",
          description: DESCRIPTION,
          url: URL,
        })}
      />
      <ServicePageLayout
        backLink={{ href: "/fiche-google", label: "Retour à Fiche Google" }}
        h1="Fiche Google ou site web : lequel choisir en premier"
        intro="Question qu'on me pose souvent : faut-il commencer par la fiche Google ou par le site ? La réponse honnête : les deux travaillent ensemble, mais si vous devez choisir un point de départ avec un budget serré, voici comment trancher."
        ctaText="On définit la priorité pour votre activité"
      >
        <div>
          <SectionHeading>
            Faut-il commencer par la fiche Google ou par le site internet&nbsp;?
          </SectionHeading>
          <p className="mt-3 text-sm text-text-secondary">
            Par la fiche Google si vous voulez des appels rapidement et que votre budget est
            serré : elle est gratuite à créer et capte la recherche locale immédiate. Par le site
            si vous travaillez sur recommandation et sur devis élevés, parce que vos clients
            comparent et veulent voir vos réalisations avant d&apos;appeler.
          </p>

          <div className="mt-6">
            <SectionHeading level={3}>La fiche Google en premier si</SectionHeading>
            <div className="mt-3">
              <FeatureList items={FICHE_FIRST} />
            </div>
          </div>

          <div className="mt-6">
            <SectionHeading level={3}>Le site en premier si</SectionHeading>
            <div className="mt-3">
              <FeatureList items={SITE_FIRST} />
            </div>
          </div>
        </div>

        <p className="text-sm text-text-secondary">
          Dans l&apos;idéal : Les deux ensemble : la fiche capte la recherche locale immédiate, le
          site convertit et rassure une fois le contact établi.
        </p>
      </ServicePageLayout>
    </>
  );
}
