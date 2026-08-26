import Image from "next/image";
import Link from "next/link";
import PhoneIcon from "@/components/ui/PhoneIcon";
import MobileNav from "@/components/layout/MobileNav";
import { NAP, NAV_LINKS, TEL_HREF } from "@/lib/constants";

export default function Header() {
  return (
    <header className="sticky top-4 z-40 px-4">
      <div className="glass-header relative mx-auto flex max-w-6xl items-center justify-between rounded-[20px] px-5 py-3">
        <Link
          href="/"
          className="flex items-center gap-2 text-base font-semibold tracking-tight text-text-primary"
        >
          <Image src="/logo-mark.png" alt="" width={28} height={28} className="h-7 w-7" priority />
          {NAP.name}
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-text-secondary transition-colors hover:text-text-primary"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={TEL_HREF}
            className="glass-button-secondary flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium text-text-primary transition-colors hover:bg-white/10"
          >
            <PhoneIcon />
            <span className="hidden sm:inline">{NAP.phoneDisplay}</span>
          </a>

          <MobileNav />
        </div>
      </div>
    </header>
  );
}
