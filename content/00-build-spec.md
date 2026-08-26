# AUTOMATEX — Spec de build complet (Next.js 15, design "Aurora" v2 validé)

Ce document contient les 10 étapes de build, dans l'ordre. Exécute-les séquentiellement dans le dossier
`/Users/nolanhermand/Desktop/Site Web AX` (qui est actuellement vide, hors ce dossier `content/`).
Ne touche pas au dossier `content/` (fichiers de référence, pas partie du site).

Le design "Aurora" décrit à l'Étape 1 est déjà validé visuellement par le client sur une maquette HTML
statique — ce n'est PAS une exploration créative, reproduis-le exactement tel que décrit. En particulier :
le dégradé de fond doit rester `background-attachment: fixed` (ne défile pas), et le grain SVG doit être
visible sur TOUTE la hauteur de page à opacité 0.5 (ne le réduis pas "pour faire plus propre" — c'est un
choix de marque assumé, déjà corrigé plusieurs fois sur la maquette).

Utilise le skill `hallmark` comme grille de qualité anti-slop (éviter les patterns IA génériques : pas de
carte trio d'icônes emoji cliché, pas de gradient violet/bleu par défaut, pas de faux témoignages, hover
states soignés, vraie hiérarchie typographique) MAIS sans jamais dévier des valeurs exactes données ici
(couleurs, dégradé, grain, glassmorphism) — le design est déjà arrêté, hallmark sert à vérifier la
qualité d'exécution (spacing, micro-interactions, absence de clichés), pas à proposer un autre système.

Utilise le skill `geo` à l'Étape 7 pour la passe SEO/GEO (schema, llms.txt, citability, structure FAQ
autoportante).

---

## ÉTAPE 0 — Setup projet

Crée un nouveau projet Next.js 15 avec App Router, TypeScript strict, et Tailwind CSS.

Contraintes :
- `npx create-next-app@latest .` avec TypeScript, Tailwind, App Router, pas de `src/` directory (garder
  `app/` à la racine), import alias `@/*`. Utilise les flags non-interactifs
  (`--typescript --tailwind --app --no-src-dir --import-alias "@/*" --eslint --use-npm --yes`) pour éviter
  tout prompt interactif.
- Configure `next.config.js` (ou `.ts`) avec `images.formats: ['image/avif', 'image/webp']`
- Active `no-explicit-any` en erreur dans la config ESLint
- Crée la structure de dossiers suivante dans `app/` :

```
app/
  (site)/
    page.tsx                              → home
    qui-je-suis/page.tsx
    zones-intervention/page.tsx
    realisations/page.tsx
    contact/page.tsx
    sites-web/
      page.tsx
      menuisier/page.tsx
      couvreur/page.tsx
      plombier/page.tsx
      electricien/page.tsx
      macon/page.tsx
    fiche-google/
      page.tsx
      creer-optimiser/page.tsx
      avis-google/page.tsx
      pack-local-maps/page.tsx
      photos-posts/page.tsx
      fiche-vs-site/page.tsx
    automatisations/
      page.tsx
      relance-devis/page.tsx
      tri-emails/page.tsx
      devis-vocal/page.tsx
    mentions-legales/page.tsx
  layout.tsx
  globals.css
components/
  layout/
    Header.tsx
    Footer.tsx
    GrainOverlay.tsx
  ui/
    Button.tsx
    Badge.tsx
    Card.tsx
    HighlightUnderline.tsx
    DottedConnector.tsx
    GoogleIcon.tsx
    WhatsAppIcon.tsx
  seo/
    SchemaScript.tsx
  services/
    ServicePageLayout.tsx
lib/
  constants.ts   → NAP, coordonnées, liens (voir content/03-pages-transversales.md, section "NAP DE RÉFÉRENCE")
```

Pour l'instant, chaque `page.tsx` contient juste un H1 temporaire avec le nom de la page.

Convention : zéro `any` TypeScript, Server Components par défaut, composants sous 150-200 lignes,
fonctions sous 50 lignes.

`/realisations` : page prévue dans l'architecture mais dont le contenu client réel n'est pas encore
fourni. Fais une page structurée simple ("Études de cas à venir" / placeholder honnête, pas de fausses
études de cas), à enrichir plus tard.

---

## ÉTAPE 1 — Design system "Aurora"

Mets en place le design system "Aurora" dans `globals.css`, `tailwind.config.ts`, et les composants de
layout/UI.

### 1. Fond de page — dégradé Aurora fixe

Le fond de TOUTE la page (pas juste le hero) est un dégradé linéaire horizontal sombre et désaturé, type
aurore boréale discrète, fixe au scroll (`background-attachment: fixed` sur le body).

Valeurs exactes (linear-gradient 90deg) :
- 0% : #050604
- 10% : #08120E
- 22% : #0D2B22
- 30% : #123A2E
- 38% : #14352F
- 48% : #16283A
- 58% : #171F3A
- 68% : #14172E
- 80% : #0C0B1C
- 100% : #050604

Fond de base (fallback) : #050604
Texte principal : #F4F7F5
Texte secondaire : #8A948E ou #9DA69F selon contexte
Texte muted : #5B655F ou #6B756E

### 2. Grain photographique global (signature de marque)

`components/layout/GrainOverlay.tsx` : div `position: fixed`, `inset: 0`, `z-index: 999`,
`pointer-events: none`, recouvre TOUTE la page en permanence. Fond SVG de bruit (`feTurbulence`) en data
URI, avec `feColorMatrix` pour forcer le bruit en blanc translucide. SVG exact :

```
data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' seed='7' stitchTiles='stitch' result='noise'/%3E%3CfeColorMatrix in='noise' type='matrix' values='0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.9 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E
```

Réglages : `background-size: 120px 120px`, `mix-blend-mode: overlay`, `opacity: 0.5` (volontairement
marqué — signature visuelle assumée, ne pas réduire). Monté une seule fois dans `app/layout.tsx`.

### 3. Glassmorphism

Header (sticky top), badges pill, boutons secondaires, cartes (services, problème) :
- `background: rgba(255,255,255,0.05)` à `0.06`
- `backdrop-filter: blur(12px)` à `blur(20px)` selon la taille (+ `saturate(140%)` à `saturate(160%)`
  pour header et cartes services)
- `-webkit-backdrop-filter` (idem, Safari)
- `border: 1px solid rgba(255,255,255,0.1)` à `rgba(255,255,255,0.22)` selon l'élément
- `border-radius: 999px` (pills/boutons), `16-20px` (cartes), `20px` (header)

### 4. Typographie

- Police principale : Inter, via `next/font/google`, poids 400/500/600/700
- Police technique (URL affichée, labels badges, éléments mono) : JetBrains Mono, via `next/font/google`,
  poids 400/500
- H1 : ~40px, font-weight 500, letter-spacing -0.015em, line-height 1.32
- H2 : ~32px, font-weight 700, letter-spacing -0.01em
- Corps : 14-16px selon contexte, couleur texte secondaire pour les descriptions

### 5. Composants signature

**`components/ui/HighlightUnderline.tsx`** : span enveloppant un mot-clé avec soulignement à main levée en
SVG inline — ligne droite horizontale fine, `stroke-width: 1.5`, `stroke-linecap: round` (PAS ondulée),
positionnée en absolute sous le texte.

**`components/ui/DottedConnector.tsx`** : connecteur SVG en pointillés, part d'un point (avatar/logo),
rejoint un texte en formant un coude à angle droit (style schéma technique), terminé par un point plein
vert émeraude avec glow (`filter: drop-shadow`). Pointillé : `rgba(255,255,255,0.4)`,
`stroke-dasharray: 4 4`. Point final : `#4ADE9A` avec `drop-shadow(0 0 6px rgba(74,222,154,0.8))`.

**`components/ui/Badge.tsx`** : pill outline glassmorphism, texte JetBrains Mono 11px, icône optionnelle
à gauche (ex. logo Google sur badge "Fiche Google").

**`components/ui/GoogleIcon.tsx`** et **`components/ui/WhatsAppIcon.tsx`** : SVG des vrais logos (Google 4
couleurs officielles, WhatsApp vert #25D366), 18-20px, utilisables dans les boutons CTA.

**`components/ui/Button.tsx`** : deux variants — primary (fond vert émeraude #1FD9A0, texte foncé
#06110D, icône optionnelle à gauche) et secondary (glassmorphism, icône optionnelle à gauche).

### 6. Badges de la home

Trois badges pill en haut du hero : "Sites Web", "Visibilité Locale", "Automatisations" — texte exact,
sans emoji, JetBrains Mono.

### 7. Header/Footer

- Header : sticky top, glassmorphism, logo "Automatex" à gauche (font-weight 600), nav au centre (Sites
  Web, Fiche Google, Automatisations, Qui je suis), CTA téléphone à droite en bouton glassmorphism avec
  icône téléphone.
- Footer : fond transparent (le dégradé Aurora du body continue derrière), NAP complet (voir
  `lib/constants.ts`), liens vers les 3 silos, mentions légales.

Ne code pas encore les pages de contenu à cette étape, uniquement design system, GrainOverlay, Header,
Footer, composants UI réutilisables.

Une fois cette étape terminée, lance `npm run dev`, vérifie que ça compile sans erreur, et vérifie (via
lecture du CSS généré / structure) que le dégradé est bien fixed et que le grain est monté globalement
dans le layout racine (pas répété par page) avant de passer à la suite.

---

## ÉTAPE 2 — Page d'accueil

Construis la page d'accueil (`app/(site)/page.tsx`) avec le contenu de la section "HOME — /" du fichier
`content/01-architecture-et-silo-site-web.md` (dans ce même dossier projet).

Structure technique :
- Hero : badges pill en haut, H1 sur plusieurs lignes avec "Google" souligné via `HighlightUnderline`
  (le mot "Google" n'apparaît pas dans le H1 actuel "Vos concurrents sont sur Google. Vous, non." —
  souligne "Google" à cet endroit précis), URL "automatex-hub.com" affichée en JetBrains Mono sous le H1,
  avatar/logo relié par un `DottedConnector`
- Sous le hero : CTA primary (icône téléphone, `tel:+33645384233`) + CTA secondary (icône WhatsApp,
  `https://wa.me/33645384233`), centré, avec la ligne de réassurance en dessous
- Section Problème : 3 cartes glassmorphism avec un point vert émeraude au lieu d'icône/emoji, grille 3
  colonnes (empilées en mobile)
- Section Services : 3 cartes glassmorphism, chacune avec un `Badge` (dont "Fiche Google" avec
  `GoogleIcon`), titre, description, lien "Voir le détail"
- Section Histoire courte avec lien vers `/qui-je-suis`
- Section Zones avec lien vers `/zones-intervention`
- Section Preuve sociale : structure prête mais vide/masquée proprement (pas de faux témoignages)
- Section FAQ : accordéon dont le contenu Q&A reste dans le DOM même fermé (caché en CSS max-height, pas
  en conditional rendering), pour que Google et les IA puissent le lire
- Schema JSON-LD FAQPage dans le composant de page (pas dans `generateMetadata`), questions/réponses
  identiques au texte affiché
- Schema LocalBusiness sur cette page uniquement

Découpe en sous-composants dans `components/home/` : `Hero.tsx`, `ProblemSection.tsx`,
`ServicesSection.tsx`, `FaqSection.tsx`. Server Components par défaut, composants sous 200 lignes.

---

## ÉTAPE 3 — Silo Site Web

Construis la page pilier `/sites-web` et ses 5 pages filles (menuisier, couvreur, plombier, electricien,
macon), avec le contenu du silo "SILO 1 — /sites-web" dans `content/01-architecture-et-silo-site-web.md`.

Page pilier :
- Même esprit visuel que la home (glassmorphism, badges), bandeau de titre compact avec le dégradé
  Aurora en fond (déjà global via le body)
- H1, intro, liste des inclusions du service en cartes/liste stylée
- Section listant les 5 pages filles avec lien et description 2 lignes, en cartes glassmorphism
- CTA téléphone en bas

Chaque page fille :
- Lien "Retour à Sites Web" en haut vers `/sites-web`
- H1 spécifique au métier (jamais dupliqué)
- Contenu spécifique au métier tel que fourni
- Schema JSON-LD `Service` propre à chaque page
- CTA téléphone en bas

Crée `components/services/ServicePageLayout.tsx` pour la structure visuelle partagée — le contenu
textuel de chaque page reste unique.

---

## ÉTAPE 4 — Silo Fiche Google

Construis la page pilier `/fiche-google` et ses 5 pages filles (creer-optimiser, avis-google,
pack-local-maps, photos-posts, fiche-vs-site), avec le contenu du silo "SILO 2 — /fiche-google" dans
`content/02-silos-google-automatisations.md`.

Même structure technique que l'Étape 3, en réutilisant `ServicePageLayout.tsx`. Ajoute `GoogleIcon` dans
le badge/titre de la page pilier.

---

## ÉTAPE 5 — Silo Automatisations

Construis la page pilier `/automatisations` et ses 3 pages filles (relance-devis, tri-emails,
devis-vocal), avec le contenu du silo "SILO 3 — /automatisations" dans
`content/02-silos-google-automatisations.md`.

Même structure technique que l'Étape 3, en réutilisant `ServicePageLayout.tsx`.

---

## ÉTAPE 6 — Pages transversales

Construis les pages `/qui-je-suis`, `/zones-intervention`, `/contact`, `/mentions-legales`, avec le
contenu de `content/03-pages-transversales.md`.

`/qui-je-suis` :
- Schema JSON-LD `Person`
- Emplacement photo de Nolan (absente) : cercle avec dégradé Aurora en fond et initiales "NH" en
  JetBrains Mono, en attendant la vraie photo — pas d'image cassée

`/contact` :
- Formulaire : nom, téléphone, métier (select, 5 métiers), message
- Champs en glassmorphism (fond translucide, bordure fine, backdrop-filter)
- Soumission vers `NEXT_PUBLIC_N8N_WEBHOOK_URL` (jamais hardcodée)
- Confirmation claire après envoi
- Boutons téléphone/WhatsApp avec les mêmes composants `Button` + icônes que la home
- Schema JSON-LD `LocalBusiness` complet avec NAP exact (`lib/constants.ts`)

`/mentions-legales` : contenu juridique simple sur fond Aurora standard, pas de schema nécessaire.

---

## ÉTAPE 7 — SEO technique et Schema (passe finale, utilise le skill `geo`)

1. `components/seo/SchemaScript.tsx` : composant serveur générique, objet schema typé en prop, rendu
   dans `<script type="application/ld+json">`. Utilisé partout, jamais de duplication de logique.

2. Schema `LocalBusiness` (home + contact), `@type: "ProfessionalService"` en plus si pertinent :
   - `name`: "Automatex"
   - `founder`: référence vers le schema `Person` de Nolan
   - `telephone`: "+33645384233"
   - `email`: "nolan.hermand@automatex-hub.com"
   - `areaServed`: liste des communes de l'Orne (JAMAIS d'adresse postale complète visible — Service
     Area Business, adresse masquée)
   - `priceRange`: "€€"
   - `sameAs`: lien LinkedIn (placeholder si non fourni, à documenter comme TODO)

3. Schema `Person` (`/qui-je-suis`) :
   - `name`: "Nolan Hermand", `jobTitle`: "Fondateur", `worksFor`: référence Organization Automatex
   - description mentionnant CAP Menuiserie, factuel, sans inventer de diplôme
   - `sameAs`: LinkedIn (placeholder si non fourni)

4. Schema `Service` sur chaque page fille des 3 silos :
   - `name` précis, `provider`: référence Organization Automatex, `areaServed`: "Orne, Normandie",
     `description` reprenant la meta description de la page

5. Schema `FAQPage` uniquement sur la home.

6. Tous les schemas injectés dans les Server Components des pages, jamais dans `generateMetadata`, jamais
   dans un composant client.

7. `public/robots.txt` :
```
User-agent: *
Allow: /

User-agent: GPTBot
Allow: /

User-agent: Google-Extended
Allow: /

User-agent: PerplexityBot
Allow: /

Sitemap: https://automatex-hub.com/sitemap.xml
```

8. `app/sitemap.ts` (natif Next.js) listant toutes les pages.

9. `public/llms.txt` en markdown résumant l'activité d'Automatex, les pages principales avec URLs, et
   3-4 réponses de référence factuelles (tarifs, délais, zone d'intervention) — reprends les réponses de
   la FAQ home.

10. `generateMetadata` rempli sur CHAQUE page (title unique, description unique 150-160 caractères, sans
    duplication entre pages).

11. `next/image` partout où une image apparaît, avec alt text descriptif incluant métier/zone quand
    pertinent.

---

## ÉTAPE 8 — Performance et vérification finale

1. `npm run build` et corrige toute erreur/warning TypeScript/ESLint.
2. Vérifie qu'aucun composant sans besoin d'interactivité n'utilise `'use client'` inutilement.
3. Vérifie que les polices sont chargées via `next/font` (pas de `<link>` externe).
4. Vérifie que le GrainOverlay et le dégradé n'utilisent pas de requête réseau (data URI inline). Si tu
   as accès à Lighthouse en CLI, lance-le sur le build de prod locale ; sinon documente que le pattern
   SVG est petit (120x120) et inline, donc sans coût réseau, et vérifie visuellement/structurellement
   qu'il n'y a rien de plus lourd que nécessaire. Ne supprime jamais le grain pour "gagner en perf" — si
   un problème de perf est identifié, réduis la taille du pattern ou l'opacité en dernier recours
   seulement, en expliquant pourquoi.
5. Liste tous les endroits où une image est attendue mais absente (photo de Nolan, réalisations clients)
   et confirme qu'un placeholder Aurora (cercle dégradé + initiales) est en place partout où c'est
   pertinent.
6. Génère un résumé texte (dans ta réponse finale, pas un fichier) de toutes les pages créées avec leur
   URL, leur H1, et leur meta description, pour vérification manuelle de la cohérence SEO (pas de doublon
   de H1 ou de mot-clé principal entre deux pages).

---

## ÉTAPE 9 — Préparation déploiement Netlify

1. `netlify.toml` à la racine, configuration Next.js (build command, publish directory, plugin
   `@netlify/plugin-nextjs`).
2. `.env.example` listant `NEXT_PUBLIC_N8N_WEBHOOK_URL`, sans valeur réelle.
3. Vérifie que `.env.local` est bien dans `.gitignore`.
4. N'exécute AUCUNE action de compte Netlify réelle (pas de login, pas de déploiement) — donne
   simplement, dans ton rapport final, les étapes exactes pour connecter le repo GitHub à Netlify et
   déployer, en supposant un compte Netlify gratuit déjà créé. Ce projet n'est pas encore un dépôt git —
   signale-le dans ton rapport (il faudra `git init` + créer le repo GitHub avant de connecter Netlify).

---

## Rapport final attendu

À la fin, fournis un rapport texte structuré avec :
- Statut de chaque étape (0 à 9)
- Liste des pages créées avec URL / H1 / meta description (Étape 8, point 6)
- Tout écart pris par rapport à la spec et pourquoi
- Placeholders restants à remplacer par le client (photo, avis clients, réalisations, LinkedIn, adresse
  Netlify dans mentions légales)
- Résultat de `npm run build` (succès/erreurs)
- Instructions de déploiement Netlify (Étape 9, point 4)
