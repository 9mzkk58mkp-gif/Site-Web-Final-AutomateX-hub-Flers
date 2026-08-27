import type { Metadata } from "next";
import { pageMetadata, type PageMeta } from "@/lib/metadata";
import PageSchema from "@/components/seo/PageSchema";
import Image from "next/image";
import Button from "@/components/ui/Button";
import PhoneIcon from "@/components/ui/PhoneIcon";
import SchemaScript from "@/components/seo/SchemaScript";
import FeatureList from "@/components/services/FeatureList";
import SectionHeading from "@/components/services/SectionHeading";
import Reveal from "@/components/motion/Reveal";
import { StaggerGrid, StaggerItem } from "@/components/motion/StaggerGrid";
import { getPersonPageSchema } from "@/lib/schema";
import { NAP, TEL_HREF } from "@/lib/constants";

/** Identité de la page — source unique des balises meta et du JSON-LD. */
const PAGE: PageMeta = {
  title: "Qui je suis — Nolan Hermand, fondateur d'Automatex",
  absoluteTitle: "Qui je suis — Nolan Hermand, fondateur d'Automatex",
  description: "Nolan Hermand, CAP menuiserie, fondateur d'Automatex. Une seule personne du début à la fin pour votre site web et votre visibilité Google dans l'Orne.",
  path: "/qui-je-suis",
};

export const metadata: Metadata = pageMetadata(PAGE);

const EN_PRATIQUE = [
  "Basé à Saint-Georges-des-Groseillers, dans l'Orne",
  "Je me déplace pour vous rencontrer en face à face",
  "Pas de grande structure, pas de frais cachés — juste le travail",
];

export default function QuiJeSuisPage() {
  return (
    <>
      <PageSchema meta={PAGE} />
      <SchemaScript schema={getPersonPageSchema()} />

      <article className="mx-auto max-w-3xl px-4 pt-16 pb-24">
        <Reveal immediate className="flex items-center gap-5">
          <Image
            src="/nolan.jpg"
            alt="Nolan Hermand, fondateur d'Automatex"
            width={96}
            height={96}
            className="h-24 w-24 shrink-0 rounded-full object-cover ring-1 ring-white/15"
            priority
          />
          <h1 className="aurora-h1">Une seule personne du début à la fin</h1>
        </Reveal>

        <StaggerGrid className="mt-10 space-y-6 text-base text-text-secondary">
          <StaggerItem>
            <p>
              Je m&apos;appelle Nolan Hermand. J&apos;ai 19 ans, et avant de faire du web,
              j&apos;ai fait du chantier.
            </p>
            <p className="mt-6">
              CAP menuiserie, deux ans d&apos;apprentissage en pose de fenêtres, deux mois de
              couverture. Assez de terrain pour savoir comment un artisan travaille — les
              journées qui commencent tôt, les devis qu&apos;on écrit le soir, la paperasse qui
              s&apos;accumule.
            </p>
          </StaggerItem>

          <StaggerItem>
            <SectionHeading>
              Pourquoi un menuisier devient-il créateur de sites web&nbsp;?
            </SectionHeading>
            <p className="mt-3">
              Parce qu&apos;il a vu le problème depuis l&apos;intérieur du métier. Je viens du
              chantier — CAP menuiserie, pose de fenêtres, 2 mois de couverture — et je me suis
              ensuite spécialisé dans le web pour les artisans du bâtiment, pas pour tout le
              monde.
            </p>
            <p className="mt-3">
              Pendant mon alternance, j&apos;ai vu le même problème revenir sans arrêt : des
              artisans qui font un travail irréprochable, mais invisibles sur Internet. Pendant
              que leurs concurrents décrochaient des chantiers simplement parce qu&apos;ils
              avaient une fiche Google à jour ou un site qui s&apos;affichait bien sur téléphone.
            </p>
            <p className="mt-3">J&apos;ai créé Automatex pour régler ça.</p>
          </StaggerItem>

          <StaggerItem>
            <SectionHeading>
              En quoi Automatex est différent d&apos;une agence classique&nbsp;?
            </SectionHeading>
            <p className="mt-3">
              Une seule personne gère votre projet, du premier échange à la mise en ligne, sans
              frais de structure ni intermédiaire à relayer. C&apos;est la même personne qui
              répond au téléphone, qui vient sur place et qui construit le site.
            </p>
            <p className="mt-3">
              Je ne viens pas d&apos;une agence. Je gère chaque projet seul — pas de commercial,
              pas de chef de projet, pas d&apos;intermédiaire. Vous parlez directement à la
              personne qui construit votre site.
            </p>
            <p className="mt-3">
              Je connais le métier du bâtiment de l&apos;intérieur, donc je sais ce qui compte
              vraiment sur un site ou une fiche Google d&apos;artisan : pas de blabla marketing,
              des outils qui servent concrètement à décrocher des chantiers.
            </p>
          </StaggerItem>

          <StaggerItem>
            <SectionHeading>
              Comment se déroule concrètement une collaboration avec Automatex&nbsp;?
            </SectionHeading>
            <p className="mt-3">
              Par un premier échange au téléphone ou en face à face, puis un devis, puis la
              réalisation — le tout avec le même interlocuteur, en 1 à 2 semaines pour un site
              une fois vos photos et informations reçues.
            </p>
            <div className="mt-4">
              <FeatureList items={EN_PRATIQUE} />
            </div>
          </StaggerItem>
        </StaggerGrid>

        <Reveal className="mt-16 flex justify-center">
          <Button href={TEL_HREF} icon={<PhoneIcon />}>
            {NAP.phoneDisplay} — Discutons de votre projet
          </Button>
        </Reveal>
      </article>
    </>
  );
}
