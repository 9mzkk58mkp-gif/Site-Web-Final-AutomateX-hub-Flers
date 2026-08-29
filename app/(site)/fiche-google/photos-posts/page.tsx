import type { Metadata } from "next";
import { pageMetadata, type PageMeta } from "@/lib/metadata";
import PageSchema from "@/components/seo/PageSchema";
import ServicePageLayout from "@/components/services/ServicePageLayout";
import FeatureList from "@/components/services/FeatureList";
import SectionHeading from "@/components/services/SectionHeading";
import SchemaScript from "@/components/seo/SchemaScript";
import { getServiceSchema } from "@/lib/schema";
import PageFaq from "@/components/services/PageFaq";
import { PHOTOS_POSTS_FAQ } from "@/lib/service-faq";

const URL = "/fiche-google/photos-posts";
const DESCRIPTION =
  "Photos et publications Google : garder sa fiche active avec des photos de chantiers réels, des publications régulières et des photos nommées avec votre métier et votre ville.";

/** Identité de la page — source unique des balises meta et du JSON-LD. */
const PAGE: PageMeta = {
  title: "Photos et publications Google : garder sa fiche active",
  description: DESCRIPTION,
  path: URL,
};

export const metadata: Metadata = pageMetadata(PAGE);

const POINTS = [
  "Photos de chantiers récents, pas des images génériques trouvées en ligne",
  "Posts réguliers sur vos réalisations ou vos disponibilités",
  "Des photos nommées avec votre métier et votre ville avant d'être mises en ligne",
];

export default function PhotosPostsPage() {
  return (
    <>
      <PageSchema meta={PAGE} />
      <SchemaScript
        schema={getServiceSchema({
          name: "Photos et publications sur la fiche Google d'un artisan",
          description: DESCRIPTION,
          url: URL,
        })}
      />
      <ServicePageLayout
        backLink={{ href: "/fiche-google", label: "Retour à Fiche Google" }}
        h1="Photos et publications Google : garder sa fiche active"
        intro="Une fiche Google qui ne bouge jamais, c'est une fiche que Google considère comme moins fiable. Les fiches actives — photos régulières, posts, réponses aux avis — sont favorisées."
        ctaText="On organise votre contenu Google"
      >
        <div>
          <SectionHeading>
            Quelles photos et publications fonctionnent le mieux sur une fiche Google&nbsp;?
          </SectionHeading>
          <p className="mt-3 text-sm text-text-secondary">
            Vos propres photos de chantiers récents, jamais des images génériques trouvées en
            ligne, accompagnées de posts réguliers sur vos réalisations ou vos disponibilités.
            Renommer les fichiers avec votre métier et votre zone avant de les envoyer aide aussi.
          </p>
          <div className="mt-4">
            <FeatureList items={POINTS} />
          </div>
        </div>

        <p className="text-sm text-text-secondary">
          Ce que je mets en place : Un rythme de publication simple et tenable, avec des visuels
          qui montrent votre vrai travail — pas des stocks photos qui ne trompent personne.
        </p>

        <PageFaq items={PHOTOS_POSTS_FAQ} />
      </ServicePageLayout>
    </>
  );
}
