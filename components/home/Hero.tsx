import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import DottedConnector from "@/components/ui/DottedConnector";
import HighlightUnderline from "@/components/ui/HighlightUnderline";
import PhoneIcon from "@/components/ui/PhoneIcon";
import WhatsAppIcon from "@/components/ui/WhatsAppIcon";
import Reveal from "@/components/motion/Reveal";
import { TEL_HREF, WHATSAPP_URL, NAP } from "@/lib/constants";

export default function Hero() {
  return (
    <section className="mx-auto max-w-4xl px-4 pt-8 text-center sm:pt-24">
      <Reveal immediate>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Badge>Sites Web</Badge>
          <Badge>Visibilité Locale</Badge>
          <Badge>Systèmes</Badge>
        </div>

        <div className="mt-6 flex items-center justify-center gap-3 sm:mt-8">
          <div className="glass-card grid h-12 w-12 place-items-center rounded-full text-sm font-semibold text-text-primary">
            A
          </div>
          <DottedConnector className="h-6 w-10 text-text-muted" />
        </div>

        <h1 className="aurora-h1 mt-4">
          Vos concurrents sont sur <HighlightUnderline>Google</HighlightUnderline>. Vous, non.
        </h1>

        <p className="mt-3 font-mono text-xs text-text-muted-alt">automatex-hub.com</p>

        {/* .geo-answer : passage-réponse ciblé par le speakable du JSON-LD. */}
        <p className="geo-answer mx-auto mt-6 max-w-2xl text-base text-text-secondary">
          Des artisans qui font un travail irréprochable, mais invisibles sur Internet. Pendant ce
          temps, la concurrence récupère vos chantiers avec une fiche Google à jour et un site qui
          s&apos;affiche bien sur téléphone.
        </p>
      </Reveal>

      <Reveal immediate>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Button href={TEL_HREF} icon={<PhoneIcon />}>
            {NAP.phoneDisplay}
          </Button>
          <Button href={WHATSAPP_URL} variant="secondary" icon={<WhatsAppIcon />}>
            WhatsApp
          </Button>
        </div>

        <p className="mt-4 text-sm text-text-muted">
          Une seule personne du début à la fin. Basé dans l&apos;Orne, je me déplace sur vos
          chantiers.
        </p>
      </Reveal>
    </section>
  );
}
