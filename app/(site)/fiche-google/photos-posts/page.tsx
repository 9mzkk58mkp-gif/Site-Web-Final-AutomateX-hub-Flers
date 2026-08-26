import type { Metadata } from "next";
import ServicePageLayout from "@/components/services/ServicePageLayout";
import FeatureList from "@/components/services/FeatureList";
import SectionHeading from "@/components/services/SectionHeading";
import SchemaScript from "@/components/seo/SchemaScript";
import { getServiceSchema } from "@/lib/schema";

const URL = "/fiche-google/photos-posts";
const DESCRIPTION =
  "Photos et publications Google : garder sa fiche active avec des photos de chantiers réels, des posts réguliers et des noms de fichiers optimisés.";

export const metadata: Metadata = {
  title: "Photos et publications Google : garder sa fiche active",
  description: DESCRIPTION,
};

const POINTS = [
  "Photos de chantiers récents, pas des images génériques trouvées en ligne",
  "Posts réguliers sur vos réalisations ou vos disponibilités",
  "Renommage des fichiers avec des mots-clés et votre zone avant de les mettre en ligne",
];

export default function PhotosPostsPage() {
  return (
    <>
      <SchemaScript
        schema={getServiceSchema({
          name: "Gestion photos et posts Google Business",
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
          <SectionHeading>Ce qui fonctionne</SectionHeading>
          <div className="mt-4">
            <FeatureList items={POINTS} />
          </div>
        </div>

        <p className="text-sm text-text-secondary">
          Ce que je mets en place : Un rythme de publication simple et tenable, avec des visuels
          qui montrent votre vrai travail — pas des stocks photos qui ne trompent personne.
        </p>
      </ServicePageLayout>
    </>
  );
}
