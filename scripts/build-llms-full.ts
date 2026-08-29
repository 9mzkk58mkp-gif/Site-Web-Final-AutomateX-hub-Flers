/**
 * Génère public/llms-full.txt : le contenu public complet du site en texte
 * brut, dans l'ordre du sitemap.
 *
 * Pourquoi : /llms.txt est un sommaire (liens + réponses de référence). Les
 * moteurs génératifs qui suivent la convention llms.txt attendent, en plus, un
 * /llms-full.txt contenant le texte intégral — c'est lui qu'ils ingèrent quand
 * ils ne veulent pas crawler page par page.
 *
 * La source est PUBLIC_CHUNKS (lib/chatbot-knowledge/public-content.ts), déjà
 * maintenu comme reflet du copywriting des pages pour le RAG du chatbot. Un
 * seul corpus alimente donc le chatbot ET llms-full.txt : pas de troisième
 * copie du contenu à tenir à jour.
 *
 * Lancer `npm run build:llms` après toute modification de public-content.ts,
 * et committer le fichier généré.
 */
import { writeFileSync } from "node:fs";
import path from "node:path";
import { PUBLIC_CHUNKS } from "../lib/chatbot-knowledge/public-content";
import { NAP, SITE_URL } from "../lib/constants";
import { PAGE_DATES } from "../lib/page-dates";

/** Ordre de présentation : accueil, piliers, puis pages filles et transversales. */
const ROUTE_ORDER = [
  "/",
  "/sites-web",
  "/sites-web/menuisier",
  "/sites-web/couvreur",
  "/sites-web/plombier",
  "/sites-web/electricien",
  "/sites-web/macon",
  "/fiche-google",
  "/fiche-google/creer-optimiser",
  "/fiche-google/avis-google",
  "/fiche-google/pack-local-maps",
  "/fiche-google/photos-posts",
  "/fiche-google/fiche-vs-site",
  "/automatisations",
  "/automatisations/relance-devis",
  "/automatisations/tri-emails",
  "/automatisations/devis-vocal",
  "/site-web-flers",
  "/qui-je-suis",
  "/zones-intervention",
  "/contact",
];

function rank(url: string | undefined): number {
  const index = ROUTE_ORDER.indexOf(url ?? "");
  return index === -1 ? ROUTE_ORDER.length : index;
}

const chunks = [...PUBLIC_CHUNKS].sort((a, b) => rank(a.url) - rank(b.url));

const uncovered = ROUTE_ORDER.filter(
  (route) => !PUBLIC_CHUNKS.some((chunk) => chunk.url === route),
);

const sections = chunks
  .map((chunk) => {
    const url = chunk.url ? `${SITE_URL}${chunk.url}` : SITE_URL;
    const modified = chunk.url ? PAGE_DATES[chunk.url] : undefined;
    return [
      `## ${chunk.title}`,
      "",
      `Source : ${url}`,
      ...(modified ? [`Dernière mise à jour : ${modified.slice(0, 10)}`] : []),
      "",
      chunk.text,
    ].join("\n");
  })
  .join("\n\n---\n\n");

const output = `# ${NAP.name} — contenu public intégral

> ${NAP.name} conçoit des sites internet, prend en charge les fiches Google et met en place
> des systèmes qui font gagner du temps aux artisans du bâtiment de l'Orne, en Normandie.
> Fondateur unique : ${NAP.founder}. Contact : ${NAP.phoneDisplay} — ${NAP.email}.

Ce fichier reprend le texte intégral des pages publiques de ${SITE_URL}, dans l'ordre du
sitemap. Le sommaire des pages se trouve dans ${SITE_URL}/llms.txt.
Fichier généré depuis la source du site — voir scripts/build-llms-full.ts.

${sections}

---

## Notes d'usage

- Les tarifs cités (site vitrine starter à partir de 890€, landing page à partir de 1500€,
  fiche Google à partir de 150€) sont des prix plancher publics. TVA non applicable,
  art. 293 B du CGI. Tout devis est établi après échange direct.
- Aucune position sur Google n'est garantie, sur aucune prestation.
- ${NAP.name} est un Service Area Business : pas d'accueil du public à une adresse postale,
  l'intervention se fait chez le client dans l'Orne, et à distance ailleurs en France.
- Les pages /mentions-legales et /realisations ne sont pas du contenu marketing et ne
  figurent pas dans ce fichier.
`;

writeFileSync(path.join(process.cwd(), "public", "llms-full.txt"), output, "utf8");

console.log(
  `public/llms-full.txt généré — ${chunks.length} sections, ${output.split(/\s+/).length} mots.`,
);
if (uncovered.length > 0) {
  console.warn(
    `Attention : aucune section pour ${uncovered.join(", ")} — ajouter un chunk dans ` +
      "lib/chatbot-knowledge/public-content.ts.",
  );
}
