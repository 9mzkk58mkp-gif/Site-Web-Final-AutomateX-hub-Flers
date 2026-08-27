"use client";

import { useState } from "react";
import Link from "next/link";
import Button from "@/components/ui/Button";
import PhoneIcon from "@/components/ui/PhoneIcon";
import WhatsAppIcon from "@/components/ui/WhatsAppIcon";
import { NAV_LINKS, NAP, TEL_HREF, WHATSAPP_URL } from "@/lib/constants";

function MenuIcon({ open }: { open: boolean }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        d={open ? "M6 6l12 12M18 6L6 18" : "M4 7h16M4 12h16M4 17h16"}
      />
    </svg>
  );
}

export default function MobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <div className="md:hidden">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls="mobile-nav-panel"
        aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
        className="glass-button-secondary grid h-12 w-12 place-items-center rounded-full text-text-primary"
      >
        <MenuIcon open={open} />
      </button>

      {open && (
        <div
          id="mobile-nav-panel"
          className="glass-header absolute inset-x-4 top-[calc(100%+0.5rem)] rounded-[20px] p-4"
        >
          <nav className="flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="flex min-h-12 items-center rounded-lg px-3 text-sm text-text-secondary transition-colors hover:bg-white/[0.06] hover:text-text-primary"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="mt-4 flex flex-wrap gap-3 border-t border-white/10 pt-4">
            <Button href={TEL_HREF} icon={<PhoneIcon />} className="flex-1">
              {NAP.phoneDisplay}
            </Button>
            <Button href={WHATSAPP_URL} variant="secondary" icon={<WhatsAppIcon />} className="flex-1">
              WhatsApp
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
