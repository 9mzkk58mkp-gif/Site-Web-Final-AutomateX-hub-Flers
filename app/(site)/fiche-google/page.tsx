import type { Metadata } from "next";
import { pageMetadata, type PageMeta } from "@/lib/metadata";
import PageSchema from "@/components/seo/PageSchema";
import Badge from "@/components/ui/Badge";
import GoogleIcon from "@/components/ui/GoogleIcon";
import ServicePageLayout from "@/components/services/ServicePageLayout";
import FeatureList from "@/components/services/FeatureList";
import ChildPageGrid from "@/components/services/ChildPageGrid";
import SectionHeading from "@/components/services/SectionHeading";
import SchemaScript from "@/components/seo/SchemaScript";
import { getServiceSchema } from "@/lib/schema";
import PageFaq from "@/components/services/PageFaq";
import { FICHE_GOOGLE_FAQ } from "@/lib/service-faq";

const URL = "/fiche-google";
const DESCRIPTION =
  "Fiche complète, avis, photos, position sur Google Maps : je m'occupe de votre fiche Google d'artisan dans l'Orne, à partir de 150€ ou incluse dans un pack site web.";

/** Identité de la page — source unique des balises meta et du JSON-LD. */
const PAGE: PageMeta = {
  title: "Votre fiche Google, celle que vos clients voient en premier",
  description: DESCRIPTION,
  path: URL,
};

export const metadata: Metadata = pageMetadata(PAGE);

const INCLUSIONS = [
  "Configuration complète : catégorie, zone d'intervention, horaires, services",
  "Une façon simple d'obtenir des avis clients, et des réponses à chacun",
  "Le réglage de la fiche pour sortir dans les 3 premiers sur Google Maps",
  "Photos et posts réguliers pour garder la fiche active",
  "Explication claire de la différence entre fiche Google et site web, et pourquoi vous avez besoin des deux",
];

const CHILD_PAGES = [
  {
    href: "/fiche-google/creer-optimiser",
    title: "Créer sa fiche Google et la remplir correctement",
    description: "La bonne catégorie, une zone réaliste, des informations identiques partout.",
  },
  {
    href: "/fiche-google/avis-google",
    title: "Avis Google : comment les obtenir et les gérer",
    description: "Demander au bon moment, faciliter la démarche, répondre à chaque avis.",
  },
  {
    href: "/fiche-google/pack-local-maps",
    title: "Google Maps : comment sortir dans les premiers",
    description:
      "Pertinence, distance, notoriété : les trois critères qui déterminent votre position.",
  },
  {
    href: "/fiche-google/photos-posts",
    title: "Photos et posts Google : garder sa fiche active",
    description: "Un rythme de publication simple et tenable avec de vrais visuels de chantier.",
  },
  {
    href: "/fiche-google/fiche-vs-site",
    title: "Fiche Google ou site web : lequel choisir en premier",
    description: "La réponse honnête selon votre budget et vos objectifs de visibilité.",
  },
];

export default function FicheGooglePage() {
  return (
    <>
      <PageSchema meta={PAGE} />
      <SchemaScript
        schema={getServiceSchema({
          name: "Prise en charge de la fiche Google d'un artisan dans l'Orne",
          description: DESCRIPTION,
          url: URL,
          // Prix repris à l'identique du texte de la page (« à partir de 150 € »).
          offers: [{ label: "Prise en charge de la fiche Google", fromPrice: 150 }],
        })}
      />
      <ServicePageLayout
        eyebrow={<Badge icon={<GoogleIcon size={14} />}>Fiche Google</Badge>}
        h1="Votre fiche Google, celle que vos clients voient en premier"
        intro="Avant même votre site, c'est votre fiche Google que vos clients voient. Elle s'affiche sur Google Maps, en haut des résultats, et de plus en plus dans les réponses que Google donne directement quand quelqu'un cherche un artisan près de chez lui. Une fiche incomplète, c'est une fiche invisible."
        ctaText="Faisons le point sur votre fiche"
      >
        <div>
          <SectionHeading>
            Qu&apos;est-ce que vous faites sur ma fiche Google&nbsp;?
          </SectionHeading>
          <p className="mt-3 text-sm text-text-secondary">
            Je remplis la fiche en entier, je mets en place une façon simple de récolter des
            avis, je règle ce qui vous fait sortir sur Google Maps, et je publie des photos et
            des actualités régulièrement. À partir de 150&nbsp;€, ou inclus dans un pack site web. TVA non
            applicable, art. 293 B du CGI.
          </p>
          <div className="mt-4">
            <FeatureList items={INCLUSIONS} />
          </div>
          <p className="mt-6 text-sm text-text-muted">
            Tarif indicatif : à partir de 150€, ou inclus dans un pack site web. TVA non applicable,
            art. 293 B du CGI.
          </p>
        </div>

        <div>
          <SectionHeading>Quel sujet voulez-vous creuser&nbsp;?</SectionHeading>
          <p className="mt-3 text-sm text-text-secondary">
            Si votre fiche n&apos;existe pas ou date, commencez par la création. Si elle existe
            mais que personne ne vous trouve, regardez Google Maps. Si vous hésitez entre la
            fiche et le site, la dernière page tranche.
          </p>
          <ChildPageGrid pages={CHILD_PAGES} />
        </div>

        <PageFaq items={FICHE_GOOGLE_FAQ} />
      </ServicePageLayout>
    </>
  );
}
