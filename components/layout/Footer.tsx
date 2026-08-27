import Link from "next/link";
import FacebookIcon from "@/components/ui/FacebookIcon";
import LinkedinIcon from "@/components/ui/LinkedinIcon";
import TiktokIcon from "@/components/ui/TiktokIcon";
import {
  FACEBOOK_URL,
  LINKEDIN_URL,
  MAIL_HREF,
  NAP,
  SILO_LINKS,
  TEL_HREF,
  TIKTOK_URL,
} from "@/lib/constants";

export default function Footer() {
  return (
    <footer className="mt-24 border-t border-white/10 px-4 py-12">
      <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-3">
        <div>
          <p className="text-base font-semibold text-text-primary">{NAP.name}</p>
          <p className="mt-2 text-sm text-text-secondary">{NAP.founder}</p>
          <p className="mt-4 text-sm text-text-secondary">
            <a href={TEL_HREF} className="inline-flex min-h-12 items-center hover:text-text-primary">
              {NAP.phoneDisplay}
            </a>
          </p>
          <p className="text-sm text-text-secondary">
            <a href={MAIL_HREF} className="inline-flex min-h-12 items-center hover:text-text-primary">
              {NAP.email}
            </a>
          </p>

          <div className="mt-4 flex items-center gap-3 text-text-secondary">
            <a
              href={LINKEDIN_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Automatex sur LinkedIn"
              className="grid min-h-12 min-w-12 place-items-center rounded-full transition-opacity duration-200 hover:opacity-80"
            >
              <LinkedinIcon />
            </a>
            <a
              href={FACEBOOK_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Automatex sur Facebook"
              className="grid min-h-12 min-w-12 place-items-center rounded-full transition-opacity duration-200 hover:opacity-80"
            >
              <FacebookIcon />
            </a>
            <a
              href={TIKTOK_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Automatex sur TikTok"
              className="grid min-h-12 min-w-12 place-items-center rounded-full transition-opacity duration-200 hover:opacity-80"
            >
              <TiktokIcon />
            </a>
          </div>
        </div>

        <div>
          <p className="font-mono text-xs uppercase tracking-wide text-text-muted-alt">
            Services
          </p>
          <ul className="mt-2">
            {SILO_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="flex min-h-12 items-center text-sm text-text-secondary hover:text-text-primary"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="font-mono text-xs uppercase tracking-wide text-text-muted-alt">
            Informations
          </p>
          <ul className="mt-2">
            <li>
              <Link href="/qui-je-suis" className="flex min-h-12 items-center text-sm text-text-secondary hover:text-text-primary">
                Qui je suis
              </Link>
            </li>
            <li>
              <Link href="/zones-intervention" className="flex min-h-12 items-center text-sm text-text-secondary hover:text-text-primary">
                Zones d&apos;intervention
              </Link>
            </li>
            <li>
              <Link href="/site-web-flers" className="flex min-h-12 items-center text-sm text-text-secondary hover:text-text-primary">
                Site internet à Flers
              </Link>
            </li>
            <li>
              <Link href="/contact" className="flex min-h-12 items-center text-sm text-text-secondary hover:text-text-primary">
                Contact
              </Link>
            </li>
            <li>
              <Link href="/mentions-legales" className="flex min-h-12 items-center text-sm text-text-secondary hover:text-text-primary">
                Mentions légales
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="mx-auto mt-10 max-w-6xl border-t border-white/10 pt-6">
        <p className="text-xs text-text-muted-alt">
          SIRET {NAP.siret} — {NAP.vatNote}
        </p>
        <p className="mt-1 text-xs text-text-muted-alt">
          © {new Date().getFullYear()} {NAP.name}. Tous droits réservés.
        </p>
      </div>
    </footer>
  );
}
