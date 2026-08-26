import type { Metadata } from "next";
import { MAIL_HREF, NAP } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Mentions légales",
  description:
    "Mentions légales d'Automatex : éditeur du site, hébergement, propriété intellectuelle et traitement des données personnelles conformément au RGPD.",
};

export default function MentionsLegalesPage() {
  return (
    <article className="mx-auto max-w-3xl px-4 pt-16 pb-24">
      <h1 className="aurora-h1">Mentions légales</h1>

      <div className="mt-10 space-y-8 text-sm text-text-secondary">
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
            <a href={MAIL_HREF} className="hover:text-text-primary">
              {NAP.email}
            </a>
            <br />
            Téléphone : {NAP.phoneDisplay}
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-text-primary">Hébergement</h2>
          <p className="mt-2">
            Netlify, Inc. — [adresse Netlify à compléter — à vérifier sur leur site officiel]
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
            <a href={MAIL_HREF} className="hover:text-text-primary">
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
      </div>
    </article>
  );
}
