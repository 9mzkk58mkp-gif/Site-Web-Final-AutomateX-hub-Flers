# Rapport de build — Chatbot RAG Automatex

Implémentation du chatbot commercial RAG décrit dans `content/04-chatbot-rag-spec.md`. Le design system
Aurora existant n'a pas été modifié — uniquement le widget et son infra serveur.

> **Mise à jour (2026-08-26)** : Cloudflare Turnstile a été retiré délibérément (pas de compte Cloudflare
> prévu à court terme) — `turnstile.ts` et `useTurnstile.ts` ont été supprimés, ce n'est pas un mode
> dégradé temporaire mais l'état normal et assumé du projet. La protection anti-abus repose désormais sur
> le rate limiting (session/IP/global) et le filtre anti prompt-injection, plus un délai artificiel de
> 400ms côté serveur avant traitement de chaque message. Les sections ci-dessous qui mentionnent encore
> Turnstile décrivent l'implémentation initiale, conservées pour l'historique.

## Fichiers créés

**Base de connaissance RAG**
- `lib/chatbot-knowledge/internal.md` — grille tarifaire + argumentaire commercial, contenu exact de la
  spec, jamais affiché publiquement, jamais bundlé côté client.
- `lib/chatbot-knowledge/types.ts` — types partagés (`KnowledgeChunk`, `KnowledgeIndex`).
- `lib/chatbot-knowledge/public-content.ts` — 23 chunks niveau 1 (contenu public), extraits du
  copywriting réel des pages (Home, silos Sites Web / Fiche Google / Automatisations et leurs pages
  filles, Qui je suis, Zones d'intervention, Contact).
- `lib/chatbot-knowledge/chunks.ts` — combine les chunks publics avec `internal.md` (découpé
  automatiquement par section H1/H2) pour l'indexation. ~29 chunks au total.
- `lib/chatbot-knowledge/retrieval.ts` — recherche RAG par similarité cosinus en local (pas de service
  managé payant), charge `index.json` s'il existe, renvoie un tableau vide sinon (aucun crash).
- `scripts/build-chatbot-index.ts` — script d'indexation hors ligne : calcule les embeddings Mistral de
  tous les chunks et écrit `lib/chatbot-knowledge/index.json`. À lancer une fois avec une vraie clé API
  via `npm run build:knowledge` (nouveau script ajouté à `package.json`, dépendance dev `tsx` ajoutée et
  installée).

**Logique serveur du chatbot** (`lib/chatbot/`)
- `config.ts` — constantes centralisées (modèle Mistral, seuils de rate limiting, etc.). Le modèle de
  chat se change via `MISTRAL_CHAT_MODEL` (env) ou en modifiant une seule constante pour passer à
  `mistral-large-latest`.
- `mistral-client.ts` — client fetch minimal (pas de SDK) pour `/chat/completions` et `/embeddings`,
  avec function-calling (`submit_contact_request`) pour la capture de contact structurée.
- `system-prompt.ts` — construit le prompt système (identité, ton, anti-prompt-injection, anti-
  hallucination commerciale) en y injectant le contenu intégral d'`internal.md` et les extraits RAG
  publics pertinents. Server-only.
- `prompt-injection.ts` — filtre regex (FR + EN) appliqué **avant** tout appel API : patterns évidents
  ("ignore les instructions", "system prompt", "tu es maintenant", "mode debug", "affiche tes
  instructions", etc.) → réponse générique sans consommer d'appel Mistral.
- `rate-limit.ts` — compteurs en mémoire serveur : 15 messages/session (fenêtre 10 min d'inactivité),
  200 appels Mistral/jour tous visiteurs confondus, 20 messages/IP/jour. Limite connue : sur un
  déploiement serverless multi-instance, les compteurs ne sont pas partagés entre instances (acceptable
  pour le volume visé, documenté dans le fichier).
- `validation.ts` — regex stricte téléphone FR, sanitization d'`besoin_exprime` (strip HTML, 300
  caractères max), et `buildSafeN8nPayload` qui rejette tout payload contenant un champ non attendu.
- `turnstile.ts` — vérification serveur du token Cloudflare Turnstile ; si `TURNSTILE_SECRET_KEY` est
  absente (dev sans compte Cloudflare), la vérification est ignorée avec un `console.warn` explicite —
  **à activer avant mise en production**.
- `n8n-webhook.ts` — envoi du payload de contact vers `N8N_CHATBOT_WEBHOOK_URL`, côté serveur uniquement.

**Route API**
- `app/api/chat/route.ts` — orchestre : validation d'entrée, rate limiting (session/IP/global), CAPTCHA,
  filtre anti-injection, retrieval RAG, appel Mistral (system/user strictement séparés, jamais concaténés
  en un bloc de texte libre), capture de contact via function-calling + webhook N8N, gestion d'erreurs
  propre (`MissingApiKeyError` → 503 avec message clair, jamais de crash serveur).

**Widget frontend** (`components/chatbot/`, seul gros morceau `'use client'`)
- `ChatWidgetLoader.tsx` — `next/dynamic({ ssr: false })`, monté dans `app/layout.tsx`.
- `ChatWidget.tsx` — bulle flottante bas-droite, badge de notification (localStorage, première visite),
  z-index 998 (sous le `GrainOverlay` à 999, pour que le grain reste visible par-dessus la fenêtre de
  chat comme demandé).
- `ChatPanel.tsx` — fenêtre de chat glassmorphism (`glass-card`), mention RGPD courte visible dès
  l'ouverture avec lien vers `/mentions-legales`, limite de 500 caractères côté input, bandeau "limite
  atteinte" avec lien `tel:`.
- `useChatSession.ts` — état de conversation **en mémoire uniquement** (pas de persistance, timeout
  d'inactivité 10 min → conversation réinitialisée au message suivant).
- `useTurnstile.ts` — charge le script Cloudflare Turnstile seulement si
  `NEXT_PUBLIC_TURNSTILE_SITE_KEY` est renseignée ; sinon `getToken()` renvoie `null` immédiatement (le
  widget reste utilisable en dev sans compte Cloudflare).
- `ChatIcons.tsx` — icônes SVG inline (bulle, fermer, envoyer).

## Fichiers modifiés
- `.env.example` — ajout de `MISTRAL_API_KEY`, `N8N_CHATBOT_WEBHOOK_URL`, `TURNSTILE_SECRET_KEY`,
  `NEXT_PUBLIC_TURNSTILE_SITE_KEY` (placeholders vides, même style de commentaires que l'existant).
- `app/layout.tsx` — ajout de `<ChatWidgetLoader />` dans le body, après `<Footer />`.
- `app/(site)/mentions-legales/page.tsx` — paragraphe RGPD complémentaire sur le chatbot dans la section
  "Données personnelles" (échanges non conservés, mêmes droits d'accès/rectification/suppression).
- `package.json` — ajout du script `build:knowledge` et de la dépendance dev `tsx` (installée).

## Variables d'environnement à renseigner par le client

| Variable | Où l'obtenir |
|---|---|
| `MISTRAL_API_KEY` | Créer un compte sur [console.mistral.ai](https://console.mistral.ai), générer une clé API dans la section "API Keys". |
| `N8N_CHATBOT_WEBHOOK_URL` | Dans l'instance N8N existante, créer un nouveau workflow avec un nœud "Webhook" dédié au chatbot (distinct de celui du formulaire de contact), copier l'URL de production du webhook. |

`TURNSTILE_SECRET_KEY` / `NEXT_PUBLIC_TURNSTILE_SITE_KEY` ne sont plus nécessaires — voir la note en tête
de ce document.

Toutes les valeurs sont à placer dans `.env.local` (déjà ignoré par git, jamais dans `.env.example`).

## Vérification sécurité — bundle client (section 7 de la spec)

Après `npm run build` (build de production, aucune erreur ni avertissement), grep exécuté sur
`.next/static/` pour des extraits distinctifs du système prompt et d'`internal.md` :

```
à partir de 590 / Objection / argumentaire commercial / Base de connaissance /
MISTRAL_API_KEY / N8N_CHATBOT_WEBHOOK_URL / submit_contact_request /
TURNSTILE_SECRET_KEY / Ne jamais inventer un tarif / positionnement face / prestataire solo
```

**Résultat : aucune occurrence trouvée pour aucun de ces patterns.** Le prompt système, `internal.md`, et
les clés serveur ne transitent jamais côté client — ils ne sont utilisés que dans `app/api/chat/route.ts`
et les modules `lib/chatbot*` qu'il importe, jamais dans un composant `'use client'`.

Vérifié également : aucune clé API réelle n'est présente nulle part dans le code (grep sur des patterns
de clés type `sk-...`/`mistral-...` sans résultat) — uniquement des lectures `process.env.X` et des
placeholders vides dans `.env.example`.

## Test de l'endpoint `/api/chat` sans `MISTRAL_API_KEY`

Testé en local (`npm run dev`, variable absente de l'environnement) :

```
POST /api/chat  →  HTTP 503
{"error":"Assistant temporairement indisponible, contactez-moi directement au 06 45 38 42 33."}
```

Pas de crash serveur, message clair, log serveur explicite (`[chatbot] MISTRAL_API_KEY absente`).
Testés également : filtre anti prompt-injection (réponse générique sans appel API), rejet des messages
de plus de 500 caractères (400).

## Ce qui reste à faire manuellement avant mise en production

1. **Créer le compte Mistral** (console.mistral.ai) et renseigner `MISTRAL_API_KEY` dans `.env.local`.
2. **Lancer l'indexation RAG** une première fois : `npm install` (pour `tsx`) puis
   `npm run build:knowledge` — génère `lib/chatbot-knowledge/index.json`. Sans ce fichier, le chatbot
   fonctionne (grâce à `internal.md` toujours injecté intégralement dans le prompt système) mais sans
   les extraits ciblés des pages publiques. Retour à relancer ce script à chaque modification du contenu
   des pages ou d'`internal.md`.
3. **Créer et connecter le webhook N8N dédié** (`N8N_CHATBOT_WEBHOOK_URL`), tester la réception du
   payload `{ source, nom, telephone, metier, besoin_exprime, timestamp }`.
4. ~~Créer le compte Cloudflare Turnstile~~ — retiré délibérément, voir la note en tête de ce document.
   Si un jour le volume d'abus l'exige, `TURNSTILE_SECRET_KEY` / `NEXT_PUBLIC_TURNSTILE_SITE_KEY` restent
   documentées (en commentaire) dans `.env.example` pour réactivation rapide.
5. **Tester en dev avec de vraies clés** avant de brancher le vrai webhook N8N : vérifier une conversation
   complète (qualification → capture de nom/téléphone → appel de l'outil `submit_contact_request` →
   réception du lead côté N8N), vérifier que les tarifs annoncés correspondent à `internal.md`, et tester
   quelques tentatives de prompt injection pour confirmer le comportement.
6. **Limite connue à surveiller en prod** : le rate limiting (session/IP/quota journalier) est en mémoire
   du process Node. Sur un hébergement qui répartit le trafic sur plusieurs instances/fonctions
   serverless, les compteurs ne sont pas partagés entre elles. Pour le volume attendu (un artisan solo,
   trafic faible), c'est suffisant ; si le trafic grossit, migrer vers un store partagé (Netlify Blobs/KV,
   Upstash Redis...) — voir le commentaire en tête de `lib/chatbot/rate-limit.ts`.
