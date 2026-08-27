import type { ReactNode } from "react";

/**
 * Carte en verre. `interactive` ajoute l'élévation et le halo émeraude au
 * survol — à réserver aux cartes cliquables, pour que le relief reste un
 * signal d'affordance et pas une décoration.
 * Le mouvement est neutralisé sous prefers-reduced-motion (voir globals.css).
 */
export default function Card({
  children,
  className = "",
  interactive = true,
}: {
  children: ReactNode;
  className?: string;
  interactive?: boolean;
}) {
  return (
    <div className={`glass-card rounded-2xl p-6 ${interactive ? "card-interactive" : ""} ${className}`}>
      {children}
    </div>
  );
}
