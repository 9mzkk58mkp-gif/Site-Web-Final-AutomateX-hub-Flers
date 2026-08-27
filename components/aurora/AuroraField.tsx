"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "motion/react";
import { createAuroraScene } from "./aurora-scene";

/**
 * Couche UI de la composition Aurora : possède le cycle de vie du canvas et
 * rien d'autre (skill web3d, « Pattern 1 : Layered Separation »).
 *
 * Décoratif, donc aria-hidden et hors flux : le canvas n'ajoute aucun texte au
 * DOM et ne modifie pas le HTML rendu côté serveur — les crawlers IA, qui
 * n'exécutent pas le JavaScript, voient exactement la même page qu'avant.
 *
 * Secours : sans WebGL, ou pendant le chargement du module, le halo CSS
 * `body::before` reste affiché. La classe `aurora-webgl` n'est posée sur
 * <html> qu'une fois la scène réellement montée, ce qui évite tout écran nu.
 */
export default function AuroraField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // useReducedMotion() renvoie null au premier rendu, avant lecture de la
    // media query. Monter la scène tout de suite ferait démarrer l'animation
    // chez un utilisateur qui la refuse, le temps d'un aller-retour d'effet.
    if (reducedMotion === null) return;

    // prefers-reduced-motion : on garde la richesse du rendu, on supprime le
    // mouvement. Une seule image est dessinée, aucune boucle ni listener.
    const scene = createAuroraScene(canvas, { still: Boolean(reducedMotion) });
    if (!scene) return;

    const root = document.documentElement;
    root.classList.add("aurora-webgl");

    return () => {
      root.classList.remove("aurora-webgl");
      scene.dispose();
    };
  }, [reducedMotion]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 h-full w-full opacity-0 transition-opacity duration-1000 [.aurora-webgl_&]:opacity-100"
    />
  );
}
