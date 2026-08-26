import type { Metadata } from "next";
import Button from "@/components/ui/Button";
import PhoneIcon from "@/components/ui/PhoneIcon";
import WhatsAppIcon from "@/components/ui/WhatsAppIcon";
import ContactForm from "@/components/contact/ContactForm";
import SchemaScript from "@/components/seo/SchemaScript";
import SectionHeading from "@/components/services/SectionHeading";
import { getLocalBusinessSchema } from "@/lib/schema";
import { MAIL_HREF, NAP, TEL_HREF, WHATSAPP_URL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Contactez-moi",
  description:
    "Contactez Automatex par téléphone, WhatsApp ou formulaire. Nolan Hermand répond personnellement sous 24h ouvrées, sans standard ni intermédiaire.",
};

export default function ContactPage() {
  return (
    <>
      <SchemaScript schema={getLocalBusinessSchema()} />

      <article className="mx-auto max-w-3xl px-4 pt-16 pb-24">
        <h1 className="aurora-h1">Contactez-moi</h1>

        <p className="mt-6 text-base text-text-secondary">
          La manière la plus rapide de me joindre, c&apos;est le téléphone ou WhatsApp. Je réponds
          personnellement — pas de standard, pas de formulaire qui atterrit nulle part.
        </p>

        <div className="mt-8 flex flex-wrap gap-4">
          <Button href={TEL_HREF} icon={<PhoneIcon />}>
            {NAP.phoneDisplay}
          </Button>
          <Button href={WHATSAPP_URL} variant="secondary" icon={<WhatsAppIcon />}>
            WhatsApp
          </Button>
        </div>

        <div className="mt-4 space-y-1 text-sm text-text-secondary">
          <p>
            Adresse :{" "}
            {NAP.legalAddress.street}, {NAP.legalAddress.postalCode}{" "}
            {NAP.legalAddress.city}
          </p>
          <p>
            Email :{" "}
            <a href={MAIL_HREF} className="hover:text-text-primary">
              {NAP.email}
            </a>
          </p>
        </div>

        <div className="mt-12">
          <SectionHeading>Écrivez-moi directement</SectionHeading>
          <div className="mt-6">
            <ContactForm />
          </div>
        </div>

        <p className="mt-16 text-center text-xs text-text-muted">
          {NAP.name} — {NAP.founder} — SIRET {NAP.siret} — {NAP.vatNote}
        </p>
      </article>
    </>
  );
}
