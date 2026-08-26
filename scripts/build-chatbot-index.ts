/**
 * Script d'indexation hors ligne pour la base de connaissance RAG du chatbot.
 *
 * Calcule les embeddings Mistral de tous les chunks (public + interne) et les
 * écrit dans lib/chatbot-knowledge/index.json, chargé ensuite en lecture seule
 * par lib/chatbot-knowledge/retrieval.ts côté serveur.
 *
 * Usage : MISTRAL_API_KEY=... npm run build:knowledge
 * (nécessite `npm install` au préalable pour la dépendance dev `tsx`)
 */
import { writeFileSync } from "node:fs";
import path from "node:path";
import { getAllChunks } from "../lib/chatbot-knowledge/chunks";
import { callMistralEmbeddings } from "../lib/chatbot/mistral-client";
import { MISTRAL_EMBED_MODEL } from "../lib/chatbot/config";
import type { KnowledgeIndex } from "../lib/chatbot-knowledge/types";

const BATCH_SIZE = 10;

async function main() {
  if (!process.env.MISTRAL_API_KEY) {
    console.error(
      "MISTRAL_API_KEY absente. Renseignez-la (dans .env.local ou l'environnement) avant de " +
        "lancer l'indexation.",
    );
    process.exit(1);
  }

  const chunks = getAllChunks();
  console.log(`Indexation de ${chunks.length} chunks (public + interne)...`);

  const embeddedChunks: KnowledgeIndex["chunks"] = [];

  for (let i = 0; i < chunks.length; i += BATCH_SIZE) {
    const batch = chunks.slice(i, i + BATCH_SIZE);
    const embeddings = await callMistralEmbeddings(batch.map((chunk) => chunk.text));
    batch.forEach((chunk, index) => {
      embeddedChunks.push({ id: chunk.id, embedding: embeddings[index] });
    });
    console.log(`  ${Math.min(i + BATCH_SIZE, chunks.length)}/${chunks.length}`);
  }

  const index: KnowledgeIndex = {
    model: MISTRAL_EMBED_MODEL,
    generatedAt: new Date().toISOString(),
    chunks: embeddedChunks,
  };

  const outPath = path.join(process.cwd(), "lib/chatbot-knowledge/index.json");
  writeFileSync(outPath, JSON.stringify(index, null, 2), "utf-8");
  console.log(`Index écrit dans ${outPath}`);
}

main().catch((error) => {
  console.error("Échec de l'indexation :", error);
  process.exit(1);
});
