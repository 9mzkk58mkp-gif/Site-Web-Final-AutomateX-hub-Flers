import type { Metadata } from "next";
import Button from "@/components/ui/Button";
import PhoneIcon from "@/components/ui/PhoneIcon";
import { NAP, TEL_HREF } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Réalisations d'Automatex",
  description:
    "Les études de cas clients d'Automatex arrivent bientôt, avec l'accord des artisans concernés. En attendant, contactez-moi directement pour échanger sur votre projet.",
};

export default function RealisationsPage() {
  return (
    <article className="mx-auto max-w-3xl px-4 pt-16 pb-24 text-center">
      <h1 className="aurora-h1">Études de cas à venir</h1>

      <p className="mx-auto mt-6 max-w-xl text-base text-text-secondary">
        Automatex démarre son activité : cette page accueillera bientôt les projets réalisés pour
        des artisans de l&apos;Orne, avec leur accord. Pas de fausses réalisations en attendant —
        juste le vrai travail, dès qu&apos;il sera prêt à montrer.
      </p>

      <div className="mt-10 flex justify-center">
        <Button href={TEL_HREF} icon={<PhoneIcon />}>
          {NAP.phoneDisplay} — Discutons de votre projet
        </Button>
      </div>
    </article>
  );
}
