import type { Metadata } from "next";
import { pageMetadata, type PageMeta } from "@/lib/metadata";
import PageSchema from "@/components/seo/PageSchema";
import Link from "next/link";
import ServicePageLayout from "@/components/services/ServicePageLayout";
import FeatureList from "@/components/services/FeatureList";
import SectionHeading from "@/components/services/SectionHeading";
import SchemaScript from "@/components/seo/SchemaScript";
import { getServiceSchema } from "@/lib/schema";

const URL = "/automatisations/devis-vocal";
const DESCRIPTION =
  "Automatiser les devis d'un artisan du bâtiment : dictez les cotes depuis le chantier, le devis se met en forme et le suivi se tient tout seul. Sur devis.";

/** Identité de la page — source unique des balises meta et du JSON-LD. */
const PAGE: PageMeta = {
  title: "Automatiser les devis : dictez-les depuis le chantier",
  description: DESCRIPTION,
  path: URL,
};

export const metadata: Metadata = pageMetadata(PAGE);

const POINTS = [
  "Vous dictez les informations du devis depuis le chantier, avec votre téléphone",
  "Les cotes, les quantités et le nom du client sont retranscrits et rangés au bon endroit",
  "Vous récupérez une base de devis prête à chiffrer et à finaliser, sans ressaisie le soir",
  "Chaque devis part ensuite dans votre suivi, avec sa date d'envoi et son statut",
];

const CE_QUE_CA_EVITE = [
  "Le carnet trempé dans la camionnette et les cotes relevées deux fois par sécurité",
  "La photo du métré prise à la va-vite, illisible trois jours plus tard",
  "Les deux heures du samedi matin passées à retaper ce qui a été dit sur le chantier",
  "Le devis promis « pour la fin de semaine » qui part finalement dix jours après la visite",
];

function PourquoiLaVoix() {
  return (
    <div>
      <SectionHeading>
        Pourquoi dicter un devis plutôt que le noter à la main&nbsp;?
      </SectionHeading>
      <p className="mt-3 text-sm text-text-secondary">
        Parce que le devis démarre pendant la visite, avec les cotes exactes et les détails
        frais, au lieu d&apos;attendre une ressaisie le soir à partir d&apos;un carnet.
      </p>
      <p className="mt-3 text-sm text-text-secondary">
        Sur un chantier, on a rarement les mains libres et jamais de bureau. Vous prenez les cotes
        d&apos;une pose de fenêtres, d&apos;une reprise de toiture ou d&apos;un tableau
        électrique, vous notez trois lignes sur un carnet, et le vrai travail de mise en forme
        attend le soir. Entre les deux, il se perd toujours quelque chose.
      </p>
      <p className="mt-3 text-sm text-text-secondary">
        Dicter, ça se fait pendant la visite, à voix haute, devant le client. Le devis démarre au
        moment où vous êtes encore sur place, avec les détails frais.
      </p>
    </div>
  );
}

function SuiviDevis() {
  return (
    <div>
      <SectionHeading>Comment suivre ses devis une fois envoyés&nbsp;?</SectionHeading>
      <p className="mt-3 text-sm text-text-secondary">
        Automatiser les devis ne s&apos;arrête pas à la saisie. Une fois le devis parti, il faut
        savoir où il en est : envoyé, vu, accepté, sans réponse depuis trois semaines. Ce suivi de
        devis se tient tout seul dans un tableau que vous ouvrez quand vous voulez, sans le
        remplir à la main.
      </p>
      <p className="mt-3 text-sm text-text-secondary">
        C&apos;est ce tableau qui alimente ensuite la{" "}
        <Link
          href="/automatisations/relance-devis"
          className="font-medium text-emerald hover:underline"
        >
          relance devis automatique
        </Link>{" "}
        : les deux fonctionnent bien ensemble, mais chacun se met en place séparément.
      </p>
    </div>
  );
}

function CeQueCaEvite() {
  return (
    <div>
      <SectionHeading>Ce que ça vous évite</SectionHeading>
      <div className="mt-4">
        <FeatureList items={CE_QUE_CA_EVITE} />
      </div>
      <p className="mt-6 text-sm text-text-secondary">
        Je viens du chantier — CAP menuiserie, pose de fenêtres, 2 mois de couverture. Un métré
        pris entre deux poses, je sais à quoi ça ressemble et pourquoi ça finit sur un coin de
        carnet.
      </p>
      <p className="mt-3 text-sm text-text-secondary">
        Tarif sur devis, selon vos outils en place. TVA non applicable, art. 293 B du CGI. On
        regarde d&apos;abord si ça vaut le coup pour votre volume de devis — parfois non, et je
        vous le dirai.
      </p>
    </div>
  );
}

export default function DevisVocalPage() {
  return (
    <>
      <PageSchema meta={PAGE} />
      <SchemaScript
        schema={getServiceSchema({
          name: "Automatiser les devis à la voix",
          description: DESCRIPTION,
          url: URL,
        })}
      />
      <ServicePageLayout
        backLink={{ href: "/automatisations", label: "Retour à Automatisations" }}
        h1="Automatiser vos devis : dictez-les depuis le chantier"
        intro="Sur un chantier, prendre des notes pour un devis n'est jamais pratique. Vous dictez les informations à voix haute pendant la visite, elles sont retranscrites et mises en forme, et le devis est déjà à moitié fait quand vous rentrez. C'est la première brique pour automatiser les devis d'une entreprise du bâtiment."
        ctaText="Voyons si ça peut vous servir"
      >
        <PourquoiLaVoix />

        <div>
          <SectionHeading>Comment fonctionne un devis dicté à la voix&nbsp;?</SectionHeading>
          <p className="mt-3 text-sm text-text-secondary">
            Vous dictez les informations depuis le chantier avec votre téléphone ; les cotes, les
            quantités et les coordonnées du client sont retranscrites et rangées au bon endroit.
            Vous récupérez une base de devis prête à chiffrer, sans ressaisie le soir.
          </p>
          <div className="mt-4">
            <FeatureList items={POINTS} />
          </div>
        </div>

        <SuiviDevis />
        <CeQueCaEvite />
      </ServicePageLayout>
    </>
  );
}
