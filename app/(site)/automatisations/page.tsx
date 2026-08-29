import type { Metadata } from "next";
import { pageMetadata, type PageMeta } from "@/lib/metadata";
import PageSchema from "@/components/seo/PageSchema";
import Link from "next/link";
import Badge from "@/components/ui/Badge";
import AutomationIcon from "@/components/ui/AutomationIcon";
import ServicePageLayout from "@/components/services/ServicePageLayout";
import FeatureList from "@/components/services/FeatureList";
import ChildPageGrid from "@/components/services/ChildPageGrid";
import SectionHeading from "@/components/services/SectionHeading";
import SchemaScript from "@/components/seo/SchemaScript";
import { getServiceSchema } from "@/lib/schema";

const URL = "/automatisations";
const DESCRIPTION =
  "Relance de devis, tri des mails et devis dictés depuis le chantier, pour les artisans du bâtiment de Flers et de l'Orne. Des systèmes simples, sur devis.";

/** Identité de la page — source unique des balises meta et du JSON-LD. */
const PAGE: PageMeta = {
  title: "Gagner du temps sur les devis et les mails, pour un artisan de l'Orne",
  description: DESCRIPTION,
  path: URL,
};

export const metadata: Metadata = pageMetadata(PAGE);

const INSTALLED = [
  "Relance des devis envoyés au client et restés sans réponse",
  "Tri des mails entrants : demandes de chantier d'un côté, factures fournisseurs de l'autre",
  "Devis dicté depuis le chantier, retranscrit et mis en forme sans ressaisie le soir",
];

const METIER_EXAMPLES = [
  "Un couvreur qui envoie huit devis de réfection dans la semaine et n'a plus la tête à savoir lesquels sont restés sans réponse",
  "Un menuisier qui prend les cotes d'un agencement le matin et retape tout sur son ordinateur à 21h",
  "Un plombier ou un électricien dont les demandes de dépannage se noient entre deux mails de fournisseur",
  "Un maçon qui perd un chantier de terrasse parce que le devis est parti il y a trois semaines et que personne n'a rappelé",
];

const CHILD_PAGES = [
  {
    href: "/automatisations/relance-devis",
    title: "Relance devis automatique",
    description: "Vos devis sans réponse sont suivis et relancés au bon moment, sans y penser.",
  },
  {
    href: "/automatisations/tri-emails",
    title: "Tri automatique des mails",
    description: "Les demandes de chantier remontent en haut, les brouillons sont déjà prêts.",
  },
  {
    href: "/automatisations/devis-vocal",
    title: "Dicter vos devis depuis le chantier",
    description: "Vous dictez depuis le chantier, le devis se met en forme tout seul.",
  },
];

function CeQueJinstalle() {
  return (
    <div>
      <SectionHeading>Quels systèmes Automatex met-il en place pour un artisan&nbsp;?</SectionHeading>
      <p className="mt-3 text-sm text-text-secondary">
        Trois, qui se posent séparément ou ensemble : la relance des devis restés sans réponse,
        le tri des mails entrants, et la dictée des devis depuis le chantier. Tous se branchent
        sur vos outils actuels, sans rien changer à votre façon de travailler.
      </p>
      <div className="mt-4">
        <FeatureList items={INSTALLED} />
      </div>
      <p className="mt-6 text-sm text-text-secondary">
        Le principe est toujours le même : des systèmes qui tournent en arrière-plan, sur vos
        outils habituels — votre boîte mail, votre téléphone, votre tableau de suivi. Vous ne
        changez pas votre façon de travailler. Le temps que vous perdez sur l&apos;administratif,
        on vous le rend.
      </p>
    </div>
  );
}

function DeQuoiOnParle() {
  return (
    <div>
      <SectionHeading>Concrètement, qu&apos;est-ce qui peut tourner tout seul chez un artisan&nbsp;?</SectionHeading>
      <p className="mt-3 text-sm text-text-secondary">
        Il ne s&apos;agit ni de robotique, ni de machines d&apos;atelier, ni de chaîne de
        production. On parle uniquement du travail de bureau d&apos;une entreprise du bâtiment :
        les devis que vous envoyez, les relances que vous n&apos;avez pas le temps de faire, les
        mails qui s&apos;empilent, les informations que vous ressaisissez deux fois.
      </p>
      <p className="mt-3 text-sm text-text-secondary">
        C&apos;est ce qui vous prend vos soirées, et c&apos;est ce qui vous coûte des chantiers —
        pas par manque de compétence, par manque de temps.
      </p>
    </div>
  );
}

function PourQuiConcretement() {
  return (
    <div>
      <SectionHeading>À quoi ça ressemble, métier par métier</SectionHeading>
      <div className="mt-4">
        <FeatureList items={METIER_EXAMPLES} />
      </div>
      <p className="mt-6 text-sm text-text-secondary">
        Je viens du chantier — CAP menuiserie, pose de fenêtres, 2 mois de couverture. Je sais à
        quel moment de la journée l&apos;administratif passe à la trappe, et lesquelles de ces
        tâches valent la peine d&apos;être confiées à un système.
      </p>
    </div>
  );
}

function TarifEtSuite() {
  return (
    <div>
      <SectionHeading>Combien ça coûte de mettre ces systèmes en place&nbsp;?</SectionHeading>
      <p className="mt-3 text-sm text-text-secondary">
        Le tarif est établi sur devis, selon les systèmes mis en place et vos outils existants.
        TVA non applicable, art. 293 B du CGI. On commence toujours par un échange : vous me
        décrivez votre semaine type, je vous dis ce qui peut être repris et ce qui n&apos;en vaut
        pas la peine.
      </p>
      <p className="mt-3 text-sm text-text-secondary">
        Ces systèmes se greffent sur ce qui est déjà en place. Si vous partez de zéro, la{" "}
        <Link href="/sites-web" className="font-medium text-emerald hover:underline">
          création de votre site vitrine d&apos;artisan
        </Link>{" "}
        et la{" "}
        <Link href="/fiche-google" className="font-medium text-emerald hover:underline">
          prise en charge de votre fiche Google
        </Link>{" "}
        passent avant : il faut d&apos;abord recevoir des demandes avant de les trier. Je me
        déplace sur{" "}
        <Link href="/zones-intervention" className="font-medium text-emerald hover:underline">
          tout le bassin de Flers et le département de l&apos;Orne
        </Link>
        .
      </p>
    </div>
  );
}

export default function AutomatisationsPage() {
  return (
    <>
      <PageSchema meta={PAGE} />
      <SchemaScript
        schema={getServiceSchema({
          name: "Systèmes de suivi des devis et des mails pour artisans",
          description: DESCRIPTION,
          url: URL,
        })}
      />
      <ServicePageLayout
        eyebrow={<Badge icon={<AutomationIcon />}>Systèmes</Badge>}
        h1="Gagner du temps sur les devis et les mails, pour un artisan de l'Orne"
        intro="Le soir, après une journée de chantier, personne n'a envie de relancer un devis resté sans réponse ou de vider une boîte mail pleine de factures fournisseurs. Ce sont pourtant ces tâches-là qui font perdre des chantiers à des menuisiers, couvreurs, plombiers, électriciens et maçons qui font par ailleurs un travail irréprochable."
        ctaText="Voyons ce qui vous ferait gagner du temps"
      >
        <CeQueJinstalle />
        <DeQuoiOnParle />
        <PourQuiConcretement />

        <div>
          <SectionHeading>Le détail par système</SectionHeading>
          <ChildPageGrid pages={CHILD_PAGES} />
        </div>

        <TarifEtSuite />
      </ServicePageLayout>
    </>
  );
}
