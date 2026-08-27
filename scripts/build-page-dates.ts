/**
 * Génère lib/page-dates.ts : date de dernière modification réelle de chaque
 * page, lue dans l'historique Git.
 *
 * Pourquoi : app/sitemap.ts renvoyait `new Date()` pour toutes les routes, ce
 * qui annonce à chaque déploiement que l'intégralité du site vient d'être
 * modifiée. Les moteurs (et les crawlers IA, qui utilisent lastmod pour
 * arbitrer un re-crawl) finissent par ignorer le signal. La date Git est la
 * seule source honnête disponible sans CMS.
 *
 * Lancer `npm run build:page-dates` après avoir modifié le contenu d'une page,
 * et committer le fichier généré (le build Netlify n'a pas toujours l'historique
 * Git complet, on ne peut donc pas le calculer au moment du build).
 */
import { execFileSync } from "node:child_process";
import { readdirSync, writeFileSync } from "node:fs";
import path from "node:path";

const SITE_DIR = path.join(process.cwd(), "app", "(site)");
const OUTPUT = path.join(process.cwd(), "lib", "page-dates.ts");

function findPageFiles(dir: string): string[] {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) return findPageFiles(full);
    return entry.name === "page.tsx" ? [full] : [];
  });
}

/** app/(site)/sites-web/menuisier/page.tsx -> /sites-web/menuisier */
function toRoute(file: string): string {
  const rel = path.relative(SITE_DIR, path.dirname(file));
  return rel === "" ? "/" : `/${rel.split(path.sep).join("/")}`;
}

function lastCommitDate(file: string): string {
  const out = execFileSync("git", ["log", "-1", "--format=%cI", "--", file], {
    encoding: "utf8",
  }).trim();
  if (!out) throw new Error(`Aucun commit trouvé pour ${file} — committer avant de générer.`);
  return out;
}

const entries = findPageFiles(SITE_DIR)
  .map((file) => [toRoute(file), lastCommitDate(file)] as const)
  .sort(([a], [b]) => a.localeCompare(b));

const body = entries.map(([route, date]) => `  "${route}": "${date}",`).join("\n");

writeFileSync(
  OUTPUT,
  `/**
 * FICHIER GÉNÉRÉ — ne pas éditer à la main.
 * Régénérer avec \`npm run build:page-dates\` (voir scripts/build-page-dates.ts).
 *
 * Date de dernière modification réelle de chaque page, issue de l'historique
 * Git. Consommée par app/sitemap.ts (<lastmod>) et lib/schema.ts (dateModified).
 */
export const PAGE_DATES: Record<string, string> = {
${body}
};

/** Date de modification d'une route, ou la plus récente du site en secours. */
export function getPageDate(route: string): string {
  return PAGE_DATES[route] ?? SITE_LAST_MODIFIED;
}

export const SITE_LAST_MODIFIED: string = ${JSON.stringify(
    entries.map(([, d]) => d).sort().at(-1) ?? new Date().toISOString(),
  )};
`,
  "utf8",
);

console.log(`lib/page-dates.ts généré — ${entries.length} routes.`);
