"use client";

import { motion, useReducedMotion, type Variants } from "motion/react";
import type { ReactNode } from "react";

const VARIANTS: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0 },
};

/**
 * Fondu + léger décalage vertical au scroll. Respecte prefers-reduced-motion
 * (via useReducedMotion) : rend le contenu directement sans animation.
 *
 * `immediate` désactive l'animation d'entrée : à utiliser pour tout contenu
 * au-dessus de la ligne de flottaison. L'état initial `hidden` est sérialisé
 * dans le HTML rendu côté serveur, donc un H1 animé reste à opacity:0 jusqu'à
 * l'hydratation — ce qui retarde le LCP du temps de chargement du JS.
 */
export default function Reveal({
  children,
  delay = 0,
  className = "",
  immediate = false,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  immediate?: boolean;
}) {
  const reduced = useReducedMotion();

  if (immediate) return <div className={className}>{children}</div>;

  return (
    <motion.div
      className={className}
      initial={reduced ? false : "hidden"}
      whileInView={reduced ? undefined : "visible"}
      viewport={{ once: true, margin: "-80px" }}
      variants={VARIANTS}
      transition={{ duration: 0.5, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}
