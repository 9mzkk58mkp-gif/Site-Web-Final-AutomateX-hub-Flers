import type { Metadata } from "next";
import { pageMetadata, type PageMeta } from "@/lib/metadata";
import PageSchema from "@/components/seo/PageSchema";
import Link from "next/link";
import Button from "@/components/ui/Button";
import PhoneIcon from "@/components/ui/PhoneIcon";
import SectionHeading from "@/components/services/SectionHeading";
import Reveal from "@/components/motion/Reveal";
import { NAP, TEL_HREF } from "@/lib/constants";

/** Identité de la page — source unique des balises meta et du JSON-LD. */
const PAGE: PageMeta = {
  title: "Réalisations",
  description:
    "Les études de cas clients d'Automatex arrivent bientôt, avec l'accord des artisans concernés. En attendant, contactez-moi directement pour échanger sur votre projet.",
  path: "/realisations",
  // Page volontairement hors index tant qu'elle n'a pas de contenu : une page
  // sans étude de cas envoyée à l'indexation pèse sur l'évaluation de qualité
  // du site. À repasser en index dès la première réalisation publiée (et à
  // remettre dans app/sitemap.ts au même moment).
  noIndex: true,
};

export const metadata: Metadata = pageMetadata(PAGE);

export default function RealisationsPage() {
  return (
    <article className="mx-auto max-w-3xl px-4 pt-16 pb-24">
      <PageSchema meta={PAGE} />
      <Reveal immediate>
        <h1 className="aurora-h1 text-center">Études de cas à venir</h1>
      </Reveal>

      <section className="mt-12">
        <Reveal>
          <SectionHeading>Pourquoi aucune réalisation n&apos;est encore affichée ?</SectionHeading>
          <p className="mt-3 text-sm text-text-secondary">
            Parce qu&apos;Automatex démarre son activité et qu&apos;aucune étude de cas n&apos;a
            encore été publiée avec l&apos;accord écrit du client concerné. Cette page accueillera
            les projets réalisés pour des artisans de l&apos;Orne, présentés avec leur nom et leurs
            vraies photos de chantier, une fois qu&apos;ils auront donné leur autorisation.
          </p>
          <p className="mt-3 text-sm text-text-secondary">
            Pas de fausses réalisations en attendant, pas de captures d&apos;écran de sites qui ne
            sont pas les miens, pas de témoignages inventés — juste le vrai travail, dès qu&apos;il
            sera prêt à montrer.
          </p>
        </Reveal>
      </section>

      <section className="mt-12">
        <Reveal>
          <SectionHeading>Que pouvez-vous regarder en attendant ?</SectionHeading>
          <p className="mt-3 text-sm text-text-secondary">
            Le détail de ce qui est livré sur chaque prestation, métier par métier. Trois pages
            décrivent précisément le contenu d&apos;un projet, ce qui remplace utilement une galerie
            de réalisations tant qu&apos;il n&apos;y en a pas.
          </p>
          <p className="mt-3 text-sm text-text-secondary">
            Voir{" "}
            <Link href="/sites-web" className="font-medium text-emerald hover:underline">
              la création d&apos;un site pour artisan
            </Link>
            ,{" "}
            <Link href="/fiche-google" className="font-medium text-emerald hover:underline">
              l&apos;optimisation d&apos;une fiche Google Business
            </Link>{" "}
            et{" "}
            <Link href="/qui-je-suis" className="font-medium text-emerald hover:underline">
              mon parcours, du chantier au web
            </Link>
            .
          </p>
        </Reveal>
      </section>

      <Reveal className="mt-14 flex justify-center">
        <Button href={TEL_HREF} icon={<PhoneIcon />}>
          {NAP.phoneDisplay} — Discutons de votre projet
        </Button>
      </Reveal>
    </article>
  );
}
