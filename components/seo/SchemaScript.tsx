/**
 * Composant serveur générique pour injecter un schema JSON-LD.
 * Toujours utilisé dans un Server Component, jamais dans generateMetadata
 * ni dans un composant client — cf. content/00-build-spec.md, Étape 7.
 */
export type JsonLdSchema = Record<string, unknown>;

export default function SchemaScript({ schema }: { schema: JsonLdSchema }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
