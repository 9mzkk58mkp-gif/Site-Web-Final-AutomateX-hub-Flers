/**
 * Souligne un mot-clé avec un trait à main levée en SVG inline.
 * Ligne droite fine, PAS ondulée — cf. design system Aurora.
 */
export default function HighlightUnderline({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <span className="relative inline-block">
      {children}
      <svg
        aria-hidden="true"
        viewBox="0 0 100 10"
        preserveAspectRatio="none"
        className="absolute left-0 -bottom-1 h-[0.28em] w-full text-emerald"
      >
        <line
          x1="1"
          y1="5"
          x2="99"
          y2="5"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    </span>
  );
}
