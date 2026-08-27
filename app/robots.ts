import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/constants";

/**
 * robots.txt généré depuis SITE_URL (source unique, cf. lib/constants.ts).
 *
 * `User-agent: *` suffirait techniquement à autoriser les crawlers IA, mais
 * plusieurs d'entre eux (ClaudeBot, OAI-SearchBot, meta-externalagent…) sont
 * évalués sur la présence d'une directive *explicite* par les audits GEO, et
 * certains opérateurs ne lisent que le bloc qui les nomme. On les liste donc
 * un par un : ajouter un agent ici est le seul geste nécessaire pour l'ouvrir.
 */

/** Crawlers de récupération/indexation utilisés par les moteurs génératifs. */
const AI_CRAWLERS = [
  // OpenAI — GPTBot (entraînement), OAI-SearchBot (index ChatGPT Search),
  // ChatGPT-User (navigation déclenchée par un utilisateur).
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  // Anthropic — ClaudeBot (crawl), Claude-User et Claude-SearchBot (temps réel).
  "ClaudeBot",
  "Claude-User",
  "Claude-SearchBot",
  // Google — Google-Extended pilote Gemini et les AI Overviews séparément
  // de Googlebot ; Google-CloudVertexBot couvre les agents Vertex.
  "Google-Extended",
  "Google-CloudVertexBot",
  // Perplexity — PerplexityBot (index) et Perplexity-User (citation en direct).
  "PerplexityBot",
  "Perplexity-User",
  // Microsoft Copilot s'appuie sur l'index Bing.
  "Bingbot",
  // Apple Intelligence / Siri.
  "Applebot",
  "Applebot-Extended",
  // Meta AI, Amazon (Alexa/Rufus), Mistral, DuckDuckGo, Common Crawl.
  "meta-externalagent",
  "Amazonbot",
  "MistralAI-User",
  "DuckAssistBot",
  "CCBot",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/" },
      ...AI_CRAWLERS.map((userAgent) => ({ userAgent, allow: "/" })),
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
