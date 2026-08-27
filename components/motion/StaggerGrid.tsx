"use client";

import { motion, useReducedMotion, type Variants } from "motion/react";
import type { ReactNode } from "react";

const CONTAINER: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const ITEM: Variants = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] } },
};

/** Conteneur de grille : révèle ses StaggerItem enfants en cascade au scroll. */
export function StaggerGrid({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const reduced = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={reduced ? false : "hidden"}
      whileInView={reduced ? undefined : "visible"}
      viewport={{ once: true, margin: "-60px" }}
      variants={CONTAINER}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className = "",
  ...rest
}: {
  children: ReactNode;
  className?: string;
  /** Attributs data-* transmis tels quels (ex. data-open de l'accordéon FAQ). */
  [dataAttribute: `data-${string}`]: unknown;
}) {
  return (
    <motion.div className={className} variants={ITEM} {...rest}>
      {children}
    </motion.div>
  );
}
