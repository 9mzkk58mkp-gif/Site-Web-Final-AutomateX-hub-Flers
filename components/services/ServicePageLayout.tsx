import type { ReactNode } from "react";
import Link from "next/link";
import Button from "@/components/ui/Button";
import PhoneIcon from "@/components/ui/PhoneIcon";
import Reveal from "@/components/motion/Reveal";
import { NAP, TEL_HREF } from "@/lib/constants";

function BackArrowIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M19 12H5M11 18l-6-6 6-6"
      />
    </svg>
  );
}

/**
 * Structure visuelle partagée par les pages piliers et filles des 3 silos.
 * Le contenu textuel de chaque page reste unique — passé via `children`.
 */
export default function ServicePageLayout({
  backLink,
  eyebrow,
  h1,
  intro,
  children,
  ctaText,
}: {
  backLink?: { href: string; label: string };
  eyebrow?: ReactNode;
  h1: string;
  intro?: string;
  children?: ReactNode;
  ctaText: string;
}) {
  return (
    <article className="mx-auto max-w-3xl px-4 pt-16 pb-24">
      {backLink && (
        <Link
          href={backLink.href}
          className="inline-flex items-center gap-2 text-sm text-text-secondary hover:text-text-primary"
        >
          <BackArrowIcon />
          {backLink.label}
        </Link>
      )}

      <Reveal>
        {eyebrow && <div className="mt-6 flex flex-wrap gap-3">{eyebrow}</div>}

        <h1 className="aurora-h1 mt-6">{h1}</h1>

        {intro && <p className="mt-6 text-base text-text-secondary">{intro}</p>}
      </Reveal>

      {children && (
        <Reveal delay={0.1} className="mt-10 space-y-8">
          {children}
        </Reveal>
      )}

      <Reveal delay={0.15} className="mt-16 flex justify-center">
        <Button href={TEL_HREF} icon={<PhoneIcon />}>
          {NAP.phoneDisplay} — {ctaText}
        </Button>
      </Reveal>
    </article>
  );
}
