import type { Metadata } from "next";
import { pageMetadata, type PageMeta } from "@/lib/metadata";
import PageSchema from "@/components/seo/PageSchema";
import ServicePageLayout from "@/components/services/ServicePageLayout";
import FeatureList from "@/components/services/FeatureList";
import SectionHeading from "@/components/services/SectionHeading";
import SchemaScript from "@/components/seo/SchemaScript";
import { getServiceSchema } from "@/lib/schema";

const URL = "/fiche-google/pack-local-maps";
const DESCRIPTION =
  "Apparaître dans le pack local Google Maps : pertinence, distance et notoriété, les trois critères ajustés pour sortir dans les 3 premiers résultats.";

/** Identité de la page — source unique des balises meta et du JSON-LD. */
const PAGE: PageMeta = {
  title: "Apparaître dans le pack local Google Maps",
  description: DESCRIPTION,
  path: URL,
};

export const metadata: Metadata = pageMetadata(PAGE);

const POINTS = [
  "La pertinence : votre catégorie et vos services correspondent-ils à la recherche",
  "La distance : à quelle distance vous êtes du lieu de recherche",
  "La notoriété : vos avis, votre activité sur la fiche, votre présence en ligne globale",
];

export default function PackLocalMapsPage() {
  return (
    <>
      <PageSchema meta={PAGE} />
      <SchemaScript
        schema={getServiceSchema({
          name: "Optimisation pack local Google Maps",
          description: DESCRIPTION,
          url: URL,
        })}
      />
      <ServicePageLayout
        backLink={{ href: "/fiche-google", label: "Retour à Fiche Google" }}
        h1="Apparaître dans le pack local Google Maps"
        intro="Le pack local, ce sont les 3 résultats qui s'affichent en haut de Google quand quelqu'un cherche 'couvreur près de moi' ou 'plombier à Flers'. Si vous n'y êtes pas, la majorité des clients ne descendent même pas voir la suite."
        ctaText="Voyons où vous en êtes sur le pack local"
      >
        <div>
          <SectionHeading>
            Qu&apos;est-ce qui détermine la position dans le pack local Google Maps&nbsp;?
          </SectionHeading>
          <p className="mt-3 text-sm text-text-secondary">
            Trois critères combinés : la pertinence de votre fiche par rapport à la recherche, la
            distance entre vous et la personne qui cherche, et votre notoriété (avis, activité de
            la fiche, présence en ligne). Seuls les deux premiers se travaillent directement.
          </p>
          <div className="mt-4">
            <FeatureList items={POINTS} />
          </div>
        </div>

        <p className="text-sm text-text-secondary">
          Ce que j&apos;ajuste concrètement : Catégorie, description, zone d&apos;intervention,
          régularité des publications — chaque élément de la fiche est calibré pour ces trois
          critères, pas au hasard.
        </p>
      </ServicePageLayout>
    </>
  );
}
