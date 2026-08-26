/**
 * Grain photographique — signature de marque Automatex.
 * Monté UNE SEULE FOIS dans app/layout.tsx (racine), jamais par page.
 * Opacité et fréquence lissées (0.15, baseFrequency 0.55) suite au retour
 * client du 2026-08-26 — grain trop granuleux à 0.5/0.85. Reste visible
 * comme signature, mais discret.
 */
const GRAIN_SVG =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.55' numOctaves='2' seed='7' stitchTiles='stitch' result='noise'/%3E%3CfeColorMatrix in='noise' type='matrix' values='0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.9 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E";

export default function GrainOverlay() {
  return (
    <div
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 999,
        pointerEvents: "none",
        backgroundImage: `url("${GRAIN_SVG}")`,
        backgroundSize: "160px 160px",
        mixBlendMode: "overlay",
        opacity: 0.15,
      }}
    />
  );
}
