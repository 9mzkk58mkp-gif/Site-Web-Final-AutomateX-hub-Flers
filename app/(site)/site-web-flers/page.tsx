import type { Metadata } from "next";
import { pageMetadata, type PageMeta } from "@/lib/metadata";
import PageSchema from "@/components/seo/PageSchema";
import Link from "next/link";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import PhoneIcon from "@/components/ui/PhoneIcon";
import WhatsAppIcon from "@/components/ui/WhatsAppIcon";
import HighlightUnderline from "@/components/ui/HighlightUnderline";
import SectionHeading from "@/components/services/SectionHeading";
import FeatureList from "@/components/services/FeatureList";
import FaqAccordion from "@/components/services/FaqAccordion";
import SchemaScript from "@/components/seo/SchemaScript";
import Reveal from "@/components/motion/Reveal";
import { getFaqSchema, getLocalBusinessSchema, getServiceSchema } from "@/lib/schema";
import { FLERS_FAQ } from "@/lib/faq";
import { NAP, TEL_HREF, WHATSAPP_URL } from "@/lib/constants";

const URL = "/site-web-flers";

/** Identité de la page — source unique des balises meta et du JSON-LD. */
const PAGE: PageMeta = {
  title: "Création de site internet à Flers (Orne)",
  absoluteTitle: "Création de site internet à Flers (Orne) — Automatex",
  description:
    "Création de site internet à Flers (Orne) : landing page dès 1500€, site vitrine dès 590€, en ligne en 1 à 2 semaines. Un seul interlocuteur, pas d'agence.",
  path: URL,
};

export const metadata: Metadata = pageMetadata(PAGE);

const ANTI_AGENCE = [
  "Un seul interlocuteur du premier échange à la mise en ligne : la personne qui conçoit le site est celle qui vous répond au téléphone.",
  "Des délais courts — 1 à 2 semaines — parce qu'il n'y a pas de file de projets ni de validation à plusieurs étages.",
  "Un tarif sans frais de structure : landing page à partir de 1500€, site vitrine starter à partir de 590€.",
  "Un déplacement possible sur votre chantier ou votre local à Flers, sans surcoût dans le bassin flérien.",
];

const POUR_QUI = [
  "Artisans du bâtiment — menuisiers, couvreurs, plombiers, électriciens, maçons : la spécialité mise en avant, avec galerie de réalisations et pages par prestation.",
  "Commerces et TPE de Flers et de l'agglomération : restaurants, garages, cabinets, services à la personne qui ont besoin d'être trouvés sur Google.",
  "Indépendants qui repartent d'un site vieillissant ou d'une simple page Facebook et veulent une vitrine qui inspire confiance.",
];

function IntroBlock() {
  return (
    <Reveal immediate>
      <h1 className="aurora-h1">Création de site internet à Flers</h1>
      <div className="mt-5 flex flex-wrap gap-2">
        <Badge>Flers · Orne</Badge>
        <Badge>Dès 590 €</Badge>
        <Badge>En ligne en 1 à 2 semaines</Badge>
      </div>
      <p className="mt-6 text-base text-text-secondary">
        La création de votre site internet à Flers est assurée par Nolan Hermand,{" "}
        <HighlightUnderline>Automatex</HighlightUnderline>, basé à Saint-Georges-des-Groseillers,
        à 5 à 10 minutes du centre de Flers. Une landing page démarre à 1500&nbsp;€, un site
        vitrine starter à partir de 590&nbsp;€ (TVA non applicable, art. 293&nbsp;B du CGI).
        Comptez 1 à 2 semaines entre le premier échange et la mise en ligne, une fois vos photos
        et informations reçues. La même personne s&apos;occupe de tout, du premier appel à la
        livraison : pas d&apos;agence, pas de chef de projet à relayer, et un rendez-vous en
        face à face possible à Flers si vous le préférez.
      </p>
    </Reveal>
  );
}

function AntiAgenceSection() {
  return (
    <Reveal className="mt-16">
      <SectionHeading>
        Pourquoi choisir un créateur de site local à Flers plutôt qu&apos;une agence&nbsp;?
      </SectionHeading>
      <p className="mt-3 text-sm text-text-secondary">
        Une agence facture une structure : commerciaux, chefs de projet, locaux. Vous, vous
        voulez un site qui tourne et quelqu&apos;un de joignable quand il faut le faire évoluer.
        Travailler avec un prestataire installé à côté de Flers, c&apos;est&nbsp;:
      </p>
      <div className="mt-5">
        <FeatureList items={ANTI_AGENCE} />
      </div>
    </Reveal>
  );
}

function ContexteFlersSection() {
  return (
    <Reveal className="mt-16">
      <SectionHeading>Quel est le bassin de vie autour de Flers&nbsp;?</SectionHeading>
      <p className="mt-3 text-sm text-text-secondary">
        Flers compte 14&nbsp;432 habitants et joue le rôle de ville-centre de la Communauté
        d&apos;agglomération Flers Agglo, qui réunit 42 communes et environ 53&nbsp;500
        habitants, dans l&apos;arrondissement d&apos;Argentan, au sein du département de
        l&apos;Orne. La ville a été largement reconstruite après les bombardements de juin 1944.
      </p>
      <p className="mt-3 text-sm text-text-secondary">
        Pour un artisan ou un commerçant, cet ancrage change tout : la clientèle ne vient pas
        seulement de Flers intra-muros, mais de toute l&apos;agglomération qui gravite autour.
        Un site bien construit et une présence Google soignée permettent de capter cette
        demande à l&apos;échelle du bassin, pas seulement de votre rue.
      </p>
    </Reveal>
  );
}

function PourQuiSection() {
  return (
    <Reveal className="mt-16">
      <SectionHeading>Automatex s&apos;adresse-t-il uniquement aux artisans&nbsp;?</SectionHeading>
      <p className="mt-3 text-sm text-text-secondary">
        Non. L&apos;artisanat du bâtiment reste la spécialité mise en avant, mais la démarche vaut
        pour tout commerce ou toute TPE de Flers et de l&apos;agglomération qui a besoin
        d&apos;être trouvé sur Google.
      </p>
      <div className="mt-5">
        <FeatureList items={POUR_QUI} />
      </div>
      <p className="mt-5 text-sm text-text-secondary">
        Je viens du chantier — CAP menuiserie, pose de fenêtres. Je sais lire un métier manuel
        et traduire un savoir-faire en pages qui donnent envie d&apos;appeler. Voir{" "}
        <Link href="/sites-web" className="font-medium text-emerald hover:underline">
          la création de sites web pour artisans
        </Link>{" "}
        et{" "}
        <Link href="/qui-je-suis" className="font-medium text-emerald hover:underline">
          mon parcours, du chantier au web
        </Link>
        .
      </p>
    </Reveal>
  );
}

function FaqSection() {
  return (
    <Reveal className="mt-20">
      <h2 className="aurora-h2 text-center">Questions fréquentes sur un site web à Flers</h2>
      <FaqAccordion items={FLERS_FAQ} />
    </Reveal>
  );
}

function CtaSection() {
  return (
    <Reveal className="mt-20 text-center">
      <SectionHeading>Parlons de votre site</SectionHeading>
      <p className="mx-auto mt-4 max-w-xl text-base text-text-secondary">
        Le plus simple reste l&apos;appel : quelques minutes suffisent pour cadrer le besoin et
        vous donner un ordre de prix. On peut aussi se voir à Flers.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Button href={TEL_HREF} icon={<PhoneIcon />}>
          {NAP.phoneDisplay}
        </Button>
        <Button href={WHATSAPP_URL} variant="secondary" icon={<WhatsAppIcon />}>
          Écrire sur WhatsApp
        </Button>
      </div>
      <p className="mt-6 text-sm text-text-secondary">
        Vous préférez détailler par écrit ?{" "}
        <Link href="/contact" className="font-medium text-emerald hover:underline">
          Décrire le projet via le formulaire de contact
        </Link>
        . Voir aussi{" "}
        <Link href="/zones-intervention" className="font-medium text-emerald hover:underline">
          les zones d&apos;intervention autour de Flers
        </Link>
        .
      </p>
    </Reveal>
  );
}

export default function SiteWebFlersPage() {
  return (
    <>
      <PageSchema meta={PAGE} />
      <SchemaScript schema={getLocalBusinessSchema()} />
      <SchemaScript schema={getFaqSchema([...FLERS_FAQ])} />
      <SchemaScript
        schema={getServiceSchema({
          name: PAGE.title,
          description: PAGE.description,
          url: URL,
          // Les deux prix plancher annoncés en clair dans l'intro de la page.
          offers: [
            { label: "Landing page", fromPrice: 1500 },
            { label: "Site vitrine starter", fromPrice: 590 },
          ],
        })}
      />

      <article className="mx-auto max-w-3xl px-4 pt-16 pb-24">
        <IntroBlock />
        <AntiAgenceSection />
        <ContexteFlersSection />
        <PourQuiSection />
        <FaqSection />
        <CtaSection />

        <p className="mt-16 text-center text-xs text-text-muted-alt">
          TVA non applicable, art. 293 B du CGI.
        </p>
      </article>
    </>
  );
}
