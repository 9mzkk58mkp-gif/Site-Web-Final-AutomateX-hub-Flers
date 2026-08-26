/**
 * Connecteur en pointillés reliant un point (avatar/logo) à un texte,
 * avec un coude à angle droit (style schéma technique) et un point plein
 * vert émeraude avec glow à l'arrivée.
 */
export default function DottedConnector({
  className = "",
}: {
  className?: string;
}) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 60 60"
      className={`overflow-visible ${className}`}
    >
      <path
        d="M2 2 L2 40 L58 40"
        fill="none"
        stroke="rgba(255,255,255,0.4)"
        strokeWidth="1.5"
        strokeDasharray="4 4"
      />
      <circle
        cx="58"
        cy="40"
        r="3.5"
        fill="#4ADE9A"
        style={{ filter: "drop-shadow(0 0 6px rgba(74,222,154,0.8))" }}
      />
    </svg>
  );
}
