import type { Metadata } from "next";
import { pageMetadata, type PageMeta } from "@/lib/metadata";
import PageSchema from "@/components/seo/PageSchema";
import Link from "next/link";
import ServicePageLayout from "@/components/services/ServicePageLayout";
import FeatureList from "@/components/services/FeatureList";
import SectionHeading from "@/components/services/SectionHeading";
import SchemaScript from "@/components/seo/SchemaScript";
import { getServiceSchema } from "@/lib/schema";
import PageFaq from "@/components/services/PageFaq";
import { RELANCE_DEVIS_FAQ } from "@/lib/service-faq";

const URL = "/automatisations/relance-devis";
const DESCRIPTION =
  "Relance devis automatique pour artisans du bâtiment : vos devis sans réponse sont suivis et relancés au bon moment, sans logiciel à apprendre ni abonnement.";

/** Identité de la page — source unique des balises meta et du JSON-LD. */
const PAGE: PageMeta = {
  title: "Relance devis automatique pour artisans du bâtiment",
  description: DESCRIPTION,
  path: URL,
};

export const metadata: Metadata = pageMetadata(PAGE);

const POINTS = [
  "Chaque devis envoyé est suivi : vous voyez d'un coup d'œil ceux qui n'ont jamais eu de réponse",
  "Une relance écrite part au bon moment, à votre nom, dans un français qui ressemble au vôtre",
  "Si le client répond, la relance suivante est annulée automatiquement — jamais deux fois de suite",
  "Vous gardez la main : vous voyez tout, vous coupez ou vous modifiez quand vous voulez",
];

const CAS_METIERS = [
  "Un devis de réfection de toiture : le client compare deux ou trois couvreurs, celui qui relance à J+7 passe devant",
  "Un devis de cuisine ou d'agencement : le particulier attend souvent son financement, la relance à trois semaines tombe pile",
  "Un devis de remplacement de chaudière ou de mise aux normes électriques : sans relance, il se perd entre deux urgences",
  "Un devis de maçonnerie ou de terrasse : décalé au printemps par le client, oublié par tout le monde d'ici là",
];

function PourquoiSansReponse() {
  return (
    <div>
      <SectionHeading>Pourquoi un devis d&apos;artisan reste-t-il souvent sans réponse&nbsp;?</SectionHeading>
      <p className="mt-3 text-sm text-text-secondary">
        Dans le bâtiment, un devis sans réponse n&apos;est presque jamais un refus. Le client
        attend un accord de banque, compare deux entreprises, part en vacances, ou a simplement
        laissé filer votre mail sous trente autres. Au bout de trois semaines, ni lui ni vous
        n&apos;y pensez plus — et le chantier part chez le concurrent qui a rappelé.
      </p>
      <p className="mt-3 text-sm text-text-secondary">
        La relance de devis, tout le monde sait qu&apos;il faut la faire. Personne ne la fait
        vraiment, parce qu&apos;elle demande de tenir un tableau à jour et d&apos;y penser le bon
        jour, entre deux chantiers.
      </p>
    </div>
  );
}

function PasUnLogicielDePlus() {
  return (
    <div>
      <SectionHeading>Faut-il changer de logiciel de devis pour automatiser les relances&nbsp;?</SectionHeading>
      <p className="mt-3 text-sm text-text-secondary">
        Vous avez peut-être déjà un logiciel de devis et de facturation — un logiciel devis
        couvreur, menuisier, plombier, électricien ou maçon, ou un outil de facturation
        généraliste. L&apos;idée n&apos;est pas de le remplacer, ni de vous faire ressaisir vos
        clients ailleurs.
      </p>
      <p className="mt-3 text-sm text-text-secondary">
        Le système de relance se branche sur ce que vous utilisez déjà : votre boîte mail et
        votre suivi de devis. Rien de nouveau à apprendre, pas de deuxième interface à ouvrir le
        soir, pas d&apos;abonnement mensuel imposé.
      </p>
    </div>
  );
}

function CasMetiers() {
  return (
    <div>
      <SectionHeading>Quels devis gagnent le plus à être relancés&nbsp;?</SectionHeading>
      <p className="mt-3 text-sm text-text-secondary">
        Ceux dont la décision prend du temps côté client : un montant qui demande un accord de
        banque, un chantier prévu pour la belle saison, une comparaison entre deux ou trois
        entreprises. Ce sont ceux qu&apos;on oublie, et ce sont les plus gros.
      </p>
      <div className="mt-4">
        <FeatureList items={CAS_METIERS} />
      </div>
    </div>
  );
}

function TarifEtLiens() {
  return (
    <div>
      <p className="text-sm text-text-secondary">
        Ce que ça change : plus de devis oubliés au fond d&apos;une boîte mail, plus de chantiers
        perdus faute d&apos;un rappel à temps. Vous continuez à faire les devis comme
        aujourd&apos;hui — c&apos;est le suivi qui n&apos;est plus à votre charge.
      </p>
      <p className="mt-3 text-sm text-text-secondary">
        Tarif sur devis, selon vos outils en place. TVA non applicable, art. 293 B du CGI.
      </p>
      <p className="mt-3 text-sm text-text-secondary">
        À voir aussi : le{" "}
        <Link
          href="/automatisations/tri-emails"
          className="font-medium text-emerald hover:underline"
        >
          tri automatique des mails de chantier
        </Link>{" "}
        pour que les demandes ne se noient plus, et{" "}
        <Link
          href="/automatisations/devis-vocal"
          className="font-medium text-emerald hover:underline"
        >
          automatiser vos devis en les dictant depuis le chantier
        </Link>
        .
      </p>
    </div>
  );
}

export default function RelanceDevisPage() {
  return (
    <>
      <PageSchema meta={PAGE} />
      <SchemaScript
        schema={getServiceSchema({
          name: "Relance devis automatique pour artisans du bâtiment",
          description: DESCRIPTION,
          url: URL,
        })}
      />
      <ServicePageLayout
        backLink={{ href: "/automatisations", label: "Retour aux systèmes" }}
        h1="Relance devis automatique pour artisans du bâtiment"
        intro="Un devis envoyé sans relance, c'est souvent un chantier perdu — pas parce que le client a dit non, mais parce que personne n'a relancé au bon moment. La relance devis automatique s'occupe de ce rappel à votre place, sur les devis que vous avez déjà envoyés."
        ctaText="Parlons de votre suivi de devis"
      >
        <PourquoiSansReponse />

        <div>
          <SectionHeading>
            Comment fonctionne une relance de devis automatique&nbsp;?
          </SectionHeading>
          <p className="mt-3 text-sm text-text-secondary">
            Chaque devis envoyé est suivi, et une relance écrite part à votre nom au bout du délai
            choisi si le client n&apos;a pas répondu. Dès qu&apos;il répond, les relances
            suivantes s&apos;annulent d&apos;elles-mêmes.
          </p>
          <div className="mt-4">
            <FeatureList items={POINTS} />
          </div>
        </div>

        <PasUnLogicielDePlus />
        <CasMetiers />
        <TarifEtLiens />

        <PageFaq items={RELANCE_DEVIS_FAQ} />
      </ServicePageLayout>
    </>
  );
}
