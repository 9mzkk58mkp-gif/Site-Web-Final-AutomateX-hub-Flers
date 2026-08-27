/**
 * Titre de section. Rend un <h2> par défaut ; `level={3}` sert aux
 * sous-sections d'une même réponse, pour garder une hiérarchie Hn valide
 * (jamais deux H2 pour les deux branches d'une seule question).
 */
export default function SectionHeading({
  children,
  level = 2,
}: {
  children: React.ReactNode;
  level?: 2 | 3;
}) {
  const className =
    level === 2 ? "text-xl font-semibold text-text-primary" : "text-base font-semibold text-text-primary";

  if (level === 3) return <h3 className={className}>{children}</h3>;
  return <h2 className={className}>{children}</h2>;
}
