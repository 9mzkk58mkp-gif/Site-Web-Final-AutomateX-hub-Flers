import { readFileSync, existsSync } from "node:fs";
import path from "node:path";
import { callMistralEmbeddings } from "@/lib/chatbot/mistral-client";
import { RAG_TOP_K } from "@/lib/chatbot/config";
import { getAllChunks } from "./chunks";
import type { KnowledgeIndex } from "./types";

/**
 * Recherche RAG par similarité cosinus, en local côté serveur, sans service
 * managé payant. Les embeddings sont pré-calculés hors ligne (voir
 * scripts/build-chatbot-index.ts) et stockés dans index.json ; ce fichier n'est
 * ni servi statiquement ni importé côté client. Server-only.
 */

const INDEX_PATH = path.join(process.cwd(), "lib/chatbot-knowledge/index.json");

function cosineSimilarity(a: number[], b: number[]): number {
  let dot = 0;
  let normA = 0;
  let normB = 0;
  for (let i = 0; i < a.length; i++) {
    dot += a[i] * b[i];
    normA += a[i] * a[i];
    normB += b[i] * b[i];
  }
  if (normA === 0 || normB === 0) return 0;
  return dot / (Math.sqrt(normA) * Math.sqrt(normB));
}

function loadIndex(): KnowledgeIndex | null {
  if (!existsSync(INDEX_PATH)) return null;
  try {
    return JSON.parse(readFileSync(INDEX_PATH, "utf-8")) as KnowledgeIndex;
  } catch {
    return null;
  }
}

/**
 * Retourne le texte des chunks publics les plus pertinents pour la requête.
 * Renvoie un tableau vide si l'index n'a pas encore été généré (avant le
 * premier `npm run build:knowledge`), sans jamais faire planter la route API.
 */
export async function retrieveRelevantPublicChunks(query: string): Promise<string[]> {
  const index = loadIndex();
  if (!index || index.chunks.length === 0) return [];

  let queryEmbedding: number[];
  try {
    [queryEmbedding] = await callMistralEmbeddings([query]);
  } catch {
    return [];
  }

  const allChunks = getAllChunks();
  const chunkById = new Map(allChunks.map((chunk) => [chunk.id, chunk]));

  interface ScoredChunk {
    title: string;
    url?: string;
    text: string;
    score: number;
  }

  const scored: ScoredChunk[] = [];
  for (const entry of index.chunks) {
    const chunk = chunkById.get(entry.id);
    if (!chunk || chunk.tier !== "public") continue;
    scored.push({
      title: chunk.title,
      url: chunk.url,
      text: chunk.text,
      score: cosineSimilarity(queryEmbedding, entry.embedding),
    });
  }

  scored.sort((a, b) => b.score - a.score);

  return scored.slice(0, RAG_TOP_K).map((item) => `[${item.title} — ${item.url ?? ""}]\n${item.text}`);
}
