import type { Metadata } from "next";
import { pageMetadata, type PageMeta } from "@/lib/metadata";
import PageSchema from "@/components/seo/PageSchema";
import Link from "next/link";
import SchemaScript from "@/components/seo/SchemaScript";
import Hero from "@/components/home/Hero";
import ProblemSection from "@/components/home/ProblemSection";
import ServicesSection from "@/components/home/ServicesSection";
import FaqSection from "@/components/home/FaqSection";
import ContactForm from "@/components/contact/ContactForm";
import SectionHeading from "@/components/services/SectionHeading";
import Reveal from "@/components/motion/Reveal";
import { getFaqSchema, getLocalBusinessSchema } from "@/lib/schema";
import { HOME_FAQ } from "@/lib/faq";

/** Identité de la page — source unique des balises meta et du JSON-LD. */
const PAGE: PageMeta = {
  title: "Sites web et fiche Google pour artisans dans l'Orne",
  description: "Sites web, fiche Google et systèmes qui font gagner du temps, pour les artisans du bâtiment de l'Orne. Une seule personne du début à la fin, basée dans le bassin de Flers.",
  path: "/",
};

export const metadata: Metadata = pageMetadata(PAGE);

const ENGAGEMENTS = [
  "Le site est à vous : domaine et hébergement à votre nom, jamais en location.",
  "Aucun engagement de durée sur la création d'un site.",
  "Le prix est annoncé avant de commencer, pas en fin de rendez-vous.",
];

export default function HomePage() {
  return (
    <>
      <PageSchema meta={PAGE} />
      <SchemaScript schema={getLocalBusinessSchema()} />
      <SchemaScript schema={getFaqSchema([...HOME_FAQ])} />

      <Hero />
      <ProblemSection />
      <ServicesSection />

      <Reveal className="mx-auto mt-20 max-w-3xl px-4 text-center">
        <h2 className="aurora-h2">Une seule personne du début à la fin</h2>
        <p className="mt-4 text-base text-text-secondary">
          Je m&apos;appelle Nolan Hermand. Je viens du chantier — CAP menuiserie, pose de
          fenêtres. Je sais comment vous travaillez, et je sais que la visibilité passe toujours
          après le boulot.
        </p>
        {/*
          Les trois objections que laisse le démarchage abusif — propriété du
          site, durée d'engagement, prix découvert en rendez-vous. Elles sont
          traitées en entier sur /qui-je-suis ; ici elles arrivent avant le
          premier clic, parce que c'est là qu'elles bloquent.
        */}
        <ul className="mt-8 grid gap-3 text-left text-sm text-text-secondary sm:grid-cols-3">
          {ENGAGEMENTS.map((item) => (
            <li key={item} className="glass-card rounded-2xl px-4 py-3">
              {item}
            </li>
          ))}
        </ul>
        <Link href="/qui-je-suis" className="mt-6 inline-block text-sm font-medium text-emerald hover:underline">
          Pourquoi ce n&apos;est pas une agence →
        </Link>
      </Reveal>

      {/*
        Preuve sociale — section volontairement absente du markup, et non pas
        masquée en CSS : une balise <h2> laissée dans le DOM d'une section vide
        et aria-hidden reste lue par les crawlers et fausse la hiérarchie Hn de
        la page. Structure à rétablir ici, avec un vrai H2 et du contenu, dès
        l'accord des 3 premiers clients (Menuiserie Bois Concept, Ren & Rev,
        MG LOC). Ne jamais remplir avec des témoignages ou logos inventés
        — cf. content/00-build-spec.md et content/01-architecture...md.

        <section>
          <h2 className="aurora-h2 text-center">Ils m'ont fait confiance</h2>
          <div className="mt-10 grid gap-4 md:grid-cols-3">…</div>
        </section>
      */}

      <Reveal className="mx-auto mt-28 max-w-3xl px-4 text-center">
        <h2 className="aurora-h2">
          Installé à Saint-Georges-des-Groseillers, je me déplace dans tout l&apos;Orne
        </h2>
        <p className="mt-4 text-base text-text-secondary">
          Vous êtes artisan dans l&apos;Orne ? On peut se rencontrer en face à face, pas juste par
          mail.
        </p>
        <Link
          href="/zones-intervention"
          className="mt-4 inline-block text-sm font-medium text-emerald hover:underline"
        >
          Zones d&apos;intervention →
        </Link>
      </Reveal>

      <Reveal className="mx-auto mt-28 max-w-3xl px-4 pb-4 text-center">
        <SectionHeading>Décrivez votre projet, je vous réponds sous 24h</SectionHeading>
        <p className="mt-4 text-base text-text-secondary">
          Pas envie d&apos;appeler tout de suite ? Laissez vos coordonnées, je vous recontacte
          rapidement.
        </p>
        <div className="mt-8 text-left">
          <ContactForm />
        </div>
      </Reveal>

      <FaqSection />
    </>
  );
}
