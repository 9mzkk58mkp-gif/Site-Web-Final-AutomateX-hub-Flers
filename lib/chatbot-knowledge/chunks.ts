import { readFileSync } from "node:fs";
import path from "node:path";
import { PUBLIC_CHUNKS } from "./public-content";
import type { KnowledgeChunk } from "./types";

export type { KnowledgeChunk } from "./types";

/**
 * Découpe lib/chatbot-knowledge/internal.md en chunks par section H1/H2, pour
 * l'indexation RAG niveau 2. Server-only.
 */
function loadInternalChunks(): KnowledgeChunk[] {
  const filePath = path.join(process.cwd(), "lib/chatbot-knowledge/internal.md");
  const raw = readFileSync(filePath, "utf-8");
  const sections = raw.split(/\n(?=#{1,2} )/g).filter((s) => s.trim().length > 0);

  return sections.map((section, index) => {
    const titleMatch = section.match(/^#{1,2} (.+)$/m);
    const title = titleMatch ? titleMatch[1].trim() : `Contenu interne ${index + 1}`;
    return {
      id: `internal-${index}-${title.toLowerCase().replace(/[^a-z0-9]+/g, "-").slice(0, 40)}`,
      tier: "internal",
      title,
      text: section.trim(),
    } satisfies KnowledgeChunk;
  });
}

/** Ensemble complet des chunks (public + interne) indexés pour la recherche RAG. */
export function getAllChunks(): KnowledgeChunk[] {
  return [...PUBLIC_CHUNKS, ...loadInternalChunks()];
}
