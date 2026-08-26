import type { ReactNode } from "react";

type CommonProps = {
  children: ReactNode;
  icon?: ReactNode;
  variant?: "primary" | "secondary";
  className?: string;
};

type ButtonAsLink = CommonProps & {
  href: string;
};

const BASE =
  "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-medium whitespace-nowrap";

// Un seul signal de hover par variante : couleur pour le bouton plein,
// déplacement pour le bouton glass (jamais les deux à la fois).
const VARIANTS: Record<"primary" | "secondary", string> = {
  primary:
    "bg-emerald text-emerald-dark transition-[filter] duration-200 ease-out hover:brightness-110",
  secondary:
    "glass-button-secondary text-text-primary transition-transform duration-200 ease-out hover:-translate-y-0.5 active:translate-y-0",
};

export default function Button({
  children,
  icon,
  variant = "primary",
  href,
  className = "",
}: ButtonAsLink) {
  return (
    <a href={href} className={`${BASE} ${VARIANTS[variant]} ${className}`}>
      {icon}
      {children}
    </a>
  );
}
