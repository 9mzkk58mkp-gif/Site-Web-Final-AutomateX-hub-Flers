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
import { TRI_EMAILS_FAQ } from "@/lib/service-faq";

const URL = "/automatisations/tri-emails";
const DESCRIPTION =
  "Tri automatique des mails pour artisans du bâtiment : les demandes de chantier remontent en haut, les factures fournisseurs de côté, les réponses courantes prêtes.";

/** Identité de la page — source unique des balises meta et du JSON-LD. */
const PAGE: PageMeta = {
  title: "Tri automatique des mails pour artisans du bâtiment",
  description: DESCRIPTION,
  path: URL,
};

export const metadata: Metadata = pageMetadata(PAGE);

const POINTS = [
  "Les mails sont triés par type : demande de chantier, facture fournisseur, administratif, reste",
  "Les demandes de devis remontent en haut, repérables sans ouvrir la boîte en entier",
  "Des réponses brouillon sont préparées pour les demandes courantes — vous relisez et vous envoyez",
  "Rien n'est supprimé ni classé sans que vous puissiez le retrouver",
];

const CE_QUI_SE_PERD = [
  "La demande d'un particulier pour un devis de toiture, arrivée entre deux catalogues de fournisseur",
  "Le mail d'un client qui accepte enfin le devis envoyé il y a un mois",
  "La relance d'un maître d'œuvre sur un chantier en cours, noyée sous les newsletters",
  "La pièce jointe d'un plan ou d'un permis, impossible à retrouver le jour où on en a besoin",
];

function LeProbleme() {
  return (
    <div>
      <SectionHeading>
        Qu&apos;est-ce qui se perd dans une boîte mail d&apos;artisan mal triée&nbsp;?
      </SectionHeading>
      <p className="mt-3 text-sm text-text-secondary">
        Ce sont presque toujours les mêmes messages qui passent à la trappe : les demandes de
        devis de particuliers et les réponses de clients, noyées sous les mails de fournisseurs
        et la publicité.
      </p>
      <div className="mt-4">
        <FeatureList items={CE_QUI_SE_PERD} />
      </div>
      <p className="mt-6 text-sm text-text-secondary">
        Une entreprise du bâtiment reçoit chaque jour des mails de nature très différente :
        demandes de particuliers, tarifs de fournisseurs, appels d&apos;offres, administratif,
        publicité. Ils arrivent tous au même endroit, dans le même ordre. Le tri se fait le soir,
        vite, et c&apos;est là que les demandes de chantier passent à la trappe.
      </p>
    </div>
  );
}

function CommentCaSePasse() {
  return (
    <div>
      <SectionHeading>Faut-il changer de boîte mail pour trier automatiquement&nbsp;?</SectionHeading>
      <p className="mt-3 text-sm text-text-secondary">
        Le tri se met en place sur votre boîte mail actuelle — la même adresse, la même
        application sur votre téléphone. Vous n&apos;avez pas de nouvel outil à ouvrir et vos
        anciens messages restent là où ils sont.
      </p>
      <p className="mt-3 text-sm text-text-secondary">
        Les règles sont définies avec vous, à partir de ce que vous recevez vraiment : les noms de
        vos fournisseurs habituels, les mots qui reviennent dans les demandes de devis de votre
        métier, les envois que vous ne voulez plus voir remonter.
      </p>
    </div>
  );
}

function SuiteEtTarif() {
  return (
    <div>
      <p className="text-sm text-text-secondary">
        Ce que ça change : vous ne passez plus la soirée à trier, et une demande de chantier ne
        reste pas trois jours sans réponse parce qu&apos;elle était en douzième position.
      </p>
      <p className="mt-3 text-sm text-text-secondary">
        Tarif sur devis, selon le volume et vos outils en place. TVA non applicable, art. 293 B du
        CGI.
      </p>
      <p className="mt-3 text-sm text-text-secondary">
        Une fois les demandes visibles, l&apos;étape suivante est de ne plus perdre celles qui ont
        déjà donné lieu à un chiffrage : voir la{" "}
        <Link
          href="/automatisations/relance-devis"
          className="font-medium text-emerald hover:underline"
        >
          relance devis automatique
        </Link>
        . Et si les demandes n&apos;arrivent pas encore assez, le problème est plutôt du côté de
        la{" "}
        <Link href="/fiche-google" className="font-medium text-emerald hover:underline">
          fiche Google Business de votre entreprise
        </Link>
        .
      </p>
    </div>
  );
}

export default function TriEmailsPage() {
  return (
    <>
      <PageSchema meta={PAGE} />
      <SchemaScript
        schema={getServiceSchema({
          name: "Tri automatique des mails pour artisans du bâtiment",
          description: DESCRIPTION,
          url: URL,
        })}
      />
      <ServicePageLayout
        backLink={{ href: "/automatisations", label: "Retour aux systèmes" }}
        h1="Tri automatique des mails pour artisans du bâtiment"
        intro="Entre les demandes de devis, les factures fournisseurs et la publicité, la boîte mail d'un menuisier, d'un couvreur ou d'un plombier devient vite un fouillis. Résultat : des demandes de chantier qui se perdent dans le tas, et des clients qui appellent quelqu'un d'autre."
        ctaText="On regarde comment organiser vos mails"
      >
        <LeProbleme />

        <div>
          <SectionHeading>Comment fonctionne le tri automatique des mails&nbsp;?</SectionHeading>
          <p className="mt-3 text-sm text-text-secondary">
            Chaque mail entrant est rangé par type dès son arrivée — demande de chantier, facture
            fournisseur, administratif, reste — et les demandes de devis remontent en haut de la
            boîte. Rien n&apos;est supprimé, tout reste retrouvable.
          </p>
          <div className="mt-4">
            <FeatureList items={POINTS} />
          </div>
        </div>

        <CommentCaSePasse />
        <SuiteEtTarif />

        <PageFaq items={TRI_EMAILS_FAQ} />
      </ServicePageLayout>
    </>
  );
}
