import type { Metadata } from "next";
import Link from "next/link";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import TalkingAvatar from "@/components/error/TalkingAvatar";
import { SILO_LINKS } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Page non trouvée",
};

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[calc(100vh-6rem)] max-w-xl flex-col items-center justify-center px-4 py-16 text-center">
      <TalkingAvatar />

      <p className="aurora-h1 mt-8 text-6xl">404</p>

      <p className="mt-4 text-base text-text-secondary">
        Cette page n&apos;existe pas ou plus. Voici quelques pistes pour retrouver votre chemin.
      </p>

      <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
        <Button href="/">Retour à l&apos;accueil</Button>
        <Button href="/contact" variant="secondary">
          Contactez-moi
        </Button>
      </div>

      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        {SILO_LINKS.map((link) => (
          <Link key={link.href} href={link.href}>
            <Badge>{link.label}</Badge>
          </Link>
        ))}
      </div>
    </div>
  );
}
