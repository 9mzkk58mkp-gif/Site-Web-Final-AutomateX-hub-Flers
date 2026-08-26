/**
 * Types partagés pour la base de connaissance RAG du chatbot.
 * Server-only : ce module ne doit jamais être importé par un composant client.
 */

export type KnowledgeTier = "public" | "internal";

export interface KnowledgeChunk {
  /** Identifiant stable, utilisé comme clé dans l'index d'embeddings. */
  id: string;
  tier: KnowledgeTier;
  /** Titre court du chunk (nom de section ou de page). */
  title: string;
  /** Chemin de la page source, pour du contenu public uniquement. */
  url?: string;
  /** Texte brut du chunk, découpé par section H2/H3 des pages du site. */
  text: string;
}

export interface EmbeddedChunk {
  id: string;
  embedding: number[];
}

export interface KnowledgeIndex {
  model: string;
  generatedAt: string;
  chunks: EmbeddedChunk[];
}
