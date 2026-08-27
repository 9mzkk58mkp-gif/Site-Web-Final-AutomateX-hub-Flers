import SchemaScript from "@/components/seo/SchemaScript";
import { getTrail } from "@/lib/breadcrumbs";
import type { PageMeta } from "@/lib/metadata";
import { getBreadcrumbSchema, getWebPageSchema } from "@/lib/schema";

/**
 * Bloc JSON-LD commun à toutes les pages : WebPage (identité, langue, date de
 * dernière modification réelle, passages speakable) + BreadcrumbList quand la
 * page a des parents.
 *
 * À poser en premier enfant du rendu de chaque page, avec le même objet
 * PageMeta que celui passé à pageMetadata(). Le JSON-LD étant émis côté
 * serveur, il reste lisible par les crawlers IA, qui n'exécutent pas le
 * JavaScript.
 */
export default function PageSchema({ meta }: { meta: PageMeta }) {
  const trail = getTrail(meta.path);

  return (
    <>
      <SchemaScript
        schema={getWebPageSchema({
          path: meta.path,
          name: meta.title,
          description: meta.description,
          breadcrumb: trail.length > 0 ? trail : undefined,
        })}
      />
      {trail.length > 0 && <SchemaScript schema={getBreadcrumbSchema(trail)} />}
    </>
  );
}
