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
  "Pourquoi ce sont toujours les trois mêmes entreprises qui sortent en haut de Google Maps, et ce qui se règle sur votre fiche pour en faire partie.";

/** Identité de la page — source unique des balises meta et du JSON-LD. */
const PAGE: PageMeta = {
  title: "Sortir sur Google Maps quand un client cherche près de chez vous",
  description: DESCRIPTION,
  path: URL,
};

export const metadata: Metadata = pageMetadata(PAGE);

const POINTS = [
  "Est-ce que votre fiche correspond à ce qui est cherché : votre catégorie, vos services, les mots que vous employez",
  "À quelle distance vous êtes de la personne qui cherche, au moment où elle cherche",
  "Ce que Google sait de vous par ailleurs : vos avis, une fiche qui bouge, votre site et vos autres pages",
];

export default function PackLocalMapsPage() {
  return (
    <>
      <PageSchema meta={PAGE} />
      <SchemaScript
        schema={getServiceSchema({
          name: "Faire sortir un artisan sur Google Maps",
          description: DESCRIPTION,
          url: URL,
        })}
      />
      <ServicePageLayout
        backLink={{ href: "/fiche-google", label: "Retour à Fiche Google" }}
        h1="Sortir sur Google Maps quand un client cherche près de chez vous"
        intro="Quand un particulier tape « couvreur près de moi » ou « plombier à Flers », Google affiche trois entreprises en haut de la page, sur une carte. La plupart des gens appellent l'une des trois et ne descendent jamais voir la suite. Si vous n'êtes pas dans ces trois-là, vous n'existez pas pour cette recherche."
        ctaText="Voyons où vous sortez aujourd'hui sur Google Maps"
      >
        <div>
          <SectionHeading>
            Pourquoi ce sont toujours les mêmes qui sortent en premier&nbsp;?
          </SectionHeading>
          <p className="mt-3 text-sm text-text-secondary">
            Parce que Google répond à trois questions avant d&apos;afficher ses trois entreprises :
            est-ce que cette fiche correspond à ce qui est cherché, est-ce que l&apos;entreprise
            est proche, et est-ce qu&apos;elle a l&apos;air fiable. Vos concurrents qui sortent
            devant vous ne travaillent pas mieux — leur fiche répond mieux à ces trois
            questions-là.
          </p>
          <div className="mt-4">
            <FeatureList items={POINTS} />
          </div>
          <p className="mt-6 text-sm text-text-secondary">
            Sur les trois, la distance ne se change pas : vous êtes où vous êtes. Les deux autres
            se travaillent, et c&apos;est là que se joue l&apos;écart avec l&apos;entreprise
            d&apos;à côté.
          </p>
        </div>

        <p className="text-sm text-text-secondary">
          Ce que j&apos;ajuste concrètement sur votre fiche : la catégorie, la description, la zone
          que vous couvrez, la régularité des publications. Chaque élément est réglé pour répondre
          à ces questions, pas rempli au hasard.
        </p>
      </ServicePageLayout>
    </>
  );
}
