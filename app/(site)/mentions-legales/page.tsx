import type { Metadata } from "next";
import Reveal from "@/components/motion/Reveal";
import { MAIL_HREF, NAP } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Mentions légales",
  description:
    "Mentions légales d'Automatex : éditeur du site, hébergement, propriété intellectuelle et traitement des données personnelles conformément au RGPD.",
  alternates: { canonical: "/mentions-legales" },
};

export default function MentionsLegalesPage() {
  return (
    <article className="mx-auto max-w-3xl px-4 pt-16 pb-24">
      <Reveal immediate>
        <h1 className="aurora-h1">Mentions légales</h1>
      </Reveal>

      <Reveal delay={0.08} className="mt-10 space-y-8 text-sm text-text-secondary">
        <section>
          <h2 className="text-base font-semibold text-text-primary">Éditeur du site</h2>
          <p className="mt-2">
            {NAP.name} — {NAP.founder}
            <br />
            {NAP.legalAddress.street}, {NAP.legalAddress.postalCode} {NAP.legalAddress.city}
            <br />
            SIRET {NAP.siret}
            <br />
            APE {NAP.ape}
            <br />
            {NAP.vatNote}
            <br />
            Email :{" "}
            <a href={MAIL_HREF} className="-my-2 inline-block py-2 hover:text-text-primary">
              {NAP.email}
            </a>
            <br />
            Téléphone : {NAP.phoneDisplay}
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-text-primary">Hébergement</h2>
          <p className="mt-2">
            Netlify, Inc. — 101 2nd Street, San Francisco, CA 94105, États-Unis.
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-text-primary">Directeur de publication</h2>
          <p className="mt-2">{NAP.founder}</p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-text-primary">Propriété intellectuelle</h2>
          <p className="mt-2">
            L&apos;ensemble du contenu de ce site (textes, visuels, structure) est la propriété
            d&apos;Automatex, sauf mention contraire. Toute reproduction sans autorisation est
            interdite.
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-text-primary">Données personnelles</h2>
          <p className="mt-2">
            Les informations transmises via le formulaire de contact sont utilisées uniquement
            pour répondre à votre demande. Elles ne sont ni vendues ni transmises à des tiers.
            Conformément au RGPD, vous disposez d&apos;un droit d&apos;accès, de rectification et
            de suppression de vos données en écrivant à{" "}
            <a href={MAIL_HREF} className="-my-2 inline-block py-2 hover:text-text-primary">
              {NAP.email}
            </a>
            .
          </p>
          <p className="mt-4">
            L&apos;assistant de conversation (chatbot) présent sur le site fonctionne selon les mêmes
            principes : vos échanges sont utilisés uniquement pour répondre à votre demande et, si vous
            le souhaitez, transmettre vos coordonnées à Nolan afin qu&apos;il vous recontacte. L&apos;historique
            de conversation n&apos;est pas conservé de façon persistante — il reste en mémoire le temps de
            l&apos;échange, puis n&apos;est pas sauvegardé. Aucune donnée du chatbot n&apos;est vendue ni transmise à
            des tiers en dehors de cet usage. Vous disposez des mêmes droits d&apos;accès, de rectification et
            de suppression en écrivant à{" "}
            <a href={MAIL_HREF} className="-my-2 inline-block py-2 hover:text-text-primary">
              {NAP.email}
            </a>
            .
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-text-primary">Cookies</h2>
          <p className="mt-2">
            [à compléter selon les outils analytics utilisés, le cas échéant]
          </p>
        </section>
      </Reveal>
    </article>
  );
}
