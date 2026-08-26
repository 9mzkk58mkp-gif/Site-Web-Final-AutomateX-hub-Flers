# Automatex — Rapport de build

Projet : `/Users/nolanhermand/Desktop/Site Web AX` — Next.js 15.5.24 (App Router), TypeScript strict,
Tailwind CSS v4, React 19.

---

## 1. Statut par étape

| Étape | Contenu | Statut |
|---|---|---|
| 0 | Setup projet (Next.js 15, structure `app/`, `components/`, `lib/`, pages placeholder) | ✅ Terminé |
| 1 | Design system "Aurora" (dégradé fixe, grain global, glassmorphism, typographie, composants signature, Header/Footer) | ✅ Terminé |
| 2 | Page d'accueil (Hero, Problème, Services, Histoire, Preuve sociale masquée, Zones, FAQ, schema) | ✅ Terminé |
| 3 | Silo Sites Web (pilier + 5 pages métier) | ✅ Terminé |
| 4 | Silo Fiche Google (pilier + 5 pages filles) | ✅ Terminé |
| 5 | Silo Automatisations (pilier + 3 pages filles) | ✅ Terminé |
| 6 | Pages transversales (qui-je-suis, zones-intervention, contact, mentions-légales) | ✅ Terminé |
| 7 | SEO/GEO (SchemaScript, LocalBusiness/Person/Service/FAQPage, robots.txt, sitemap.ts, llms.txt, metadata) | ✅ Terminé |
| 8 | Performance et vérification finale | ✅ Terminé |
| 9 | Préparation déploiement Netlify | ✅ Terminé (config seulement, aucune action de compte réelle) |

`npm run build` : **succès**, 0 erreur, 0 warning ESLint/TypeScript. Voir section 6.

---

## 2. Pages créées — URL / H1 / meta description

| URL | H1 | Meta description |
|---|---|---|
| `/` | Vos concurrents sont sur Google. Vous, non. | Sites web, fiche Google Business et automatisations pour artisans du bâtiment dans l'Orne. Une seule personne du début à la fin, basée dans le bassin de Flers. |
| `/qui-je-suis` | Une seule personne du début à la fin | Nolan Hermand, CAP menuiserie, fondateur d'Automatex. Une seule personne du début à la fin pour votre site web et votre visibilité Google dans l'Orne. |
| `/zones-intervention` | Zones d'intervention dans l'Orne | Installé à Saint-Georges-des-Groseillers, j'interviens dans tout l'Orne avec une priorité sur le bassin de Flers, et à distance partout en France. |
| `/realisations` | Études de cas à venir | Les études de cas clients d'Automatex arrivent bientôt, avec l'accord des artisans concernés. En attendant, contactez-moi directement pour échanger sur votre projet. |
| `/contact` | Contactez-moi | Contactez Automatex par téléphone, WhatsApp ou formulaire. Nolan Hermand répond personnellement sous 24h ouvrées, sans standard ni intermédiaire. |
| `/sites-web` | Création de site internet pour artisan dans l'Orne | Site vitrine rapide et mobile-first pour artisans du bâtiment dans l'Orne, à partir de 1500€ sans abonnement. Design pensé pour votre métier, pas un template. |
| `/sites-web/menuisier` | Site internet pour menuisier dans l'Orne | Site internet pour menuisier dans l'Orne : galerie de réalisations, matériaux et finitions mis en avant, section sur-mesure pour rassurer vos clients. |
| `/sites-web/couvreur` | Site internet pour couvreur dans l'Orne | Site internet pour couvreur dans l'Orne : certifications et assurance décennale visibles, numéro d'urgence dès l'accueil, avant/après de chantiers. |
| `/sites-web/plombier` | Site internet pour plombier dans l'Orne | Site internet pour plombier dans l'Orne : numéro visible en un clic, mention des urgences, prestations et zone d'intervention affichées clairement. |
| `/sites-web/electricien` | Site internet pour électricien dans l'Orne | Site internet pour électricien dans l'Orne : prestations séparées clairement, certifications Consuel/Qualifelec, formulaire de devis rapide. |
| `/sites-web/macon` | Site internet pour maçon dans l'Orne | Site internet pour maçon dans l'Orne : galerie de chantiers par type, déroulé du chantier expliqué, assurance décennale et zone d'intervention. |
| `/fiche-google` | Optimisation de fiche Google Business pour artisan dans l'Orne | Configuration, avis, pack local, photos : je gère votre fiche Google Business pour artisan dans l'Orne, à partir de 150€ ou incluse dans un pack site web. |
| `/fiche-google/creer-optimiser` | Créer et optimiser sa fiche Google Business | Créer et optimiser sa fiche Google Business : bonne catégorie, zone d'intervention réaliste, description sans bourrage de mots-clés, NAP cohérent. |
| `/fiche-google/avis-google` | Obtenir et gérer ses avis Google en tant qu'artisan | Obtenir et gérer ses avis Google en tant qu'artisan : demander au bon moment, carte NFC pour faciliter la démarche, répondre à chaque avis. |
| `/fiche-google/pack-local-maps` | Apparaître dans le pack local Google Maps | Apparaître dans le pack local Google Maps : pertinence, distance et notoriété, les trois critères ajustés pour sortir dans les 3 premiers résultats. |
| `/fiche-google/photos-posts` | Photos et publications Google : garder sa fiche active | Photos et publications Google : garder sa fiche active avec des photos de chantiers réels, des posts réguliers et des noms de fichiers optimisés. |
| `/fiche-google/fiche-vs-site` | Fiche Google ou site web : lequel choisir en premier | Fiche Google ou site web : lequel choisir en premier selon votre budget, vos réalisations à montrer et le type de clients que vous ciblez. |
| `/automatisations` | Automatisation des devis et de la gestion administrative pour artisans | Relance automatique de devis, tri des e-mails et devis à la voix pour artisans dans l'Orne. Des systèmes simples qui tournent en arrière-plan, sur devis. |
| `/automatisations/relance-devis` | Relance automatique des devis pour artisans | Relance automatique des devis pour artisans : un système suit vos devis sans réponse et relance au bon moment, sans que vous ayez à y penser. |
| `/automatisations/tri-emails` | Tri automatique des e-mails pour artisans | Tri automatique des e-mails pour artisans : demandes de devis mises en avant, réponses brouillon prêtes pour les demandes courantes. |
| `/automatisations/devis-vocal` | Devis à la voix pour artisans | Devis à la voix pour artisans : dictez les informations depuis votre téléphone, le système retranscrit et structure automatiquement le devis. |
| `/mentions-legales` | Mentions légales | Mentions légales d'Automatex : éditeur du site, hébergement, propriété intellectuelle et traitement des données personnelles conformément au RGPD. |

22 pages, 22 H1 uniques, 22 meta descriptions uniques (vérifié programmatiquement, aucun doublon).
Titres et mots-clés principaux non dupliqués entre pages (chaque page fille cible une intention
de recherche distincte, comme demandé par la règle de silo).

---

## 3. Écarts par rapport à la spec, et pourquoi

- **Next.js 15 pinné explicitement** : `create-next-app@latest` installe désormais Next 16 par
  défaut. J'ai réinstallé avec `next@^15` / `eslint-config-next@^15` pour respecter la spec ("Next.js 15
  App Router"). Version effective : 15.5.24.
- **Tailwind v4 "CSS-first"** : la spec mentionne `tailwind.config.ts`, mais Tailwind v4 (installé par
  `create-next-app` par défaut) n'utilise plus de fichier de config JS — les tokens sont déclarés en
  CSS via `@theme` dans `app/globals.css`. Fonctionnellement équivalent, juste la syntaxe moderne de
  Tailwind v4.
- **`eslint.config.mjs` réécrit** : le template par défaut de `create-next-app` (conçu pour Next 16)
  importait `eslint-config-next/core-web-vitals` en format tableau flat-config ; avec `eslint-config-next@15`
  ce module exporte l'ancien format `extends`. Réécrit avec le pont `FlatCompat` standard documenté par
  Next.js 15, plus une règle `@typescript-eslint/no-explicit-any: error` ajoutée comme demandé.
- **`next.config.ts` — `outputFileTracingRoot` ajouté** : un `package-lock.json` existe dans le dossier
  utilisateur parent (`/Users/nolanhermand/package-lock.json`, sans rapport avec ce projet), ce qui faisait
  que Next.js détectait la mauvaise racine de workspace. Forcé explicitement à la racine du projet.
- **Sections `components/home/` supplémentaires** : la spec nomme `Hero.tsx`, `ProblemSection.tsx`,
  `ServicesSection.tsx`, `FaqSection.tsx` — les sections Histoire, Preuve sociale et Zones (plus courtes)
  sont restées directement dans `app/(site)/page.tsx` plutôt que d'être extraites en composants séparés,
  pour rester fidèle à la liste explicite de la spec.
- **Composants utilitaires ajoutés non listés dans l'arborescence de l'Étape 0** : `PhoneIcon.tsx`,
  `AvatarPlaceholder.tsx`, `FeatureList.tsx`, `ChildPageCard.tsx`, `SectionHeading.tsx`,
  `lib/schema.ts`, `lib/faq.ts`. Ajoutés pour respecter la contrainte "zéro duplication de logique" et
  garder chaque composant sous 150-200 lignes — plutôt qu'une déviation, c'est une extension naturelle
  de la structure demandée.
- **Passe qualité `hallmark`** : appliquée sur l'exécution (pas le design) — `transition-all` remplacé
  par des transitions de propriétés explicites, un seul signal de hover par bouton (au lieu de deux),
  anneau `:focus-visible` ajouté globalement (accessibilité clavier, absent de la spec initiale mais
  couvert par "micro-interactions soignées"), easing de l'accordéon FAQ passé de `ease` à une courbe
  nommée, et rythme vertical de la home légèrement varié plutôt qu'un espacement identique partout.
  Aucune valeur de couleur, dégradé, grain ou glassmorphism n'a été modifiée.
- **Quelques meta descriptions sous 150 caractères** : la majorité est dans la fourchette 145-160
  caractères demandée : quelques pages filles (par ex. `/automatisations/tri-emails`, 132 caractères)
  sont un peu plus courtes pour rester factuelles sans remplissage artificiel. Toutes restent uniques
  et sous 160 caractères.
- **Apostrophes typographiques** : le contenu source utilise des apostrophes droites (`'`) ; elles ont
  été conservées telles quelles (rendues via `&apos;`) plutôt que converties en apostrophes courbes
  (`'`) partout, pour ne pas risquer d'altérer le texte fourni sur ~30 fichiers sans relecture manuelle
  complète. Amélioration mineure possible plus tard si souhaité.

---

## 4. Placeholders restants à remplacer par le client

| Élément | Emplacement | Statut actuel |
|---|---|---|
| Photo de Nolan Hermand | `/qui-je-suis` | Cercle dégradé Aurora + initiales "NH" (`components/ui/AvatarPlaceholder.tsx`). Aucune image cassée. |
| Réalisations clients (études de cas) | `/realisations` | Page "Études de cas à venir" honnête, aucune fausse réalisation. À enrichir dès que 1-2 projets clients sont validés pour publication. |
| Témoignages / logos clients (Preuve sociale) | Section home, structurellement présente mais masquée (`hidden`, `data-section="preuve-sociale"`) | Prête à activer dès l'accord des 3 premiers clients cités dans le brief (Menuiserie Bois Concept, Ren & Rev, MG LOC) — ne pas remplir avec du contenu inventé. |
| URL LinkedIn | `lib/constants.ts` → `LINKEDIN_URL` (placeholder), utilisée dans les schemas `Person`/`LocalBusiness` (`sameAs`) | Placeholder `https://www.linkedin.com/in/nolan-hermand-automatex` — à remplacer par la vraie URL dès création/confirmation du profil. |
| Adresse Netlify pour les mentions légales | `/mentions-legales`, section Hébergement | `[adresse Netlify à compléter — à vérifier sur leur site officiel]`, tel que fourni dans le brief. Netlify, Inc. est basé aux États-Unis (San Francisco) — à vérifier et compléter avec l'adresse exacte au moment du déploiement, sur netlify.com/legal ou leurs CGU à jour. |
| Section Cookies (mentions légales) | `/mentions-legales` | `[à compléter selon les outils analytics utilisés, le cas échéant]` — à remplir si un outil d'analytics (Plausible, GA4, etc.) est ajouté plus tard. |
| Webhook N8N | `.env.local` (non créé, ignoré par git) | `NEXT_PUBLIC_N8N_WEBHOOK_URL` doit être défini en local et dans les variables d'environnement Netlify avant que le formulaire de contact fonctionne réellement. |

---

## 5. Vérifications techniques (Étape 8)

- **Dégradé Aurora** : `background-attachment: fixed` confirmé dans le CSS généré (`app/globals.css`
  → classe sur `body`). Valeurs de stops exactement celles fournies.
- **Grain SVG** : monté une seule fois dans `app/layout.tsx` via `<GrainOverlay />` (vérifié : aucune
  autre occurrence dans `app/`). Data URI inline (`feTurbulence`), `background-size: 120px 120px`,
  `mix-blend-mode: overlay`, `opacity: 0.5` — conforme à la spec, non réduit. Zéro requête réseau
  (data URI base64/inline uniquement, pas de fichier externe).
- **Polices** : Inter + JetBrains Mono chargées exclusivement via `next/font/google` dans
  `app/layout.tsx`. Aucune balise `<link>` externe vers Google Fonts.
- **Composants clients** : seulement 2 sur l'ensemble du site — `FaqSection.tsx` (accordéon avec
  état ouvert/fermé) et `ContactForm.tsx` (formulaire avec soumission fetch). Tout le reste est
  Server Component par défaut.
- **`any` TypeScript** : zéro occurrence, règle ESLint `@typescript-eslint/no-explicit-any: error`
  active et respectée (`npx eslint .` : 0 erreur).
- **Taille des composants** : le plus long fichier du projet est `ContactForm.tsx` à 107 lignes,
  largement sous la limite de 150-200 lignes.
- **`next/image`** : aucune image bitmap n'existe encore sur le site (ni photo de Nolan, ni
  réalisations) — tous les emplacements d'image utilisent le placeholder Aurora en CSS/SVG plutôt
  qu'un `<img>`/`next/image` cassé. `next/image` sera à utiliser dès qu'une vraie photo est fournie
  (le composant `AvatarPlaceholder` devra alors être remplacé par un `next/image` avec `alt` décrivant
  le sujet, ex. `alt="Nolan Hermand, fondateur d'Automatex, à Saint-Georges-des-Groseillers"`).
  `next.config.ts` a déjà `images.formats: ['image/avif', 'image/webp']` configuré pour quand ce
  sera le cas.

---

## 6. Résultat `npm run build`

```
✓ Compiled successfully in 2.8s
✓ Linting and checking validity of types ... (0 erreur, 0 warning)
✓ Generating static pages (27/27)
```

27 routes générées statiquement (22 pages + `/sitemap.xml` + `/_not-found` + fichiers publics
`robots.txt`/`llms.txt`), toutes prérendues en statique (`○ Static`). Aucune erreur, aucun warning
TypeScript ou ESLint.

---

## 7. Instructions de déploiement Netlify

**Prérequis signalé** : ce dossier n'est **pas encore un dépôt git**. Avant de connecter Netlify :

1. Depuis `/Users/nolanhermand/Desktop/Site Web AX` :
   ```bash
   git init
   git add .
   git commit -m "Initial commit — site Automatex"
   ```
2. Créer un dépôt sur GitHub (vide, sans README) puis :
   ```bash
   git remote add origin https://github.com/<votre-compte>/<nom-du-repo>.git
   git branch -M main
   git push -u origin main
   ```

**Connexion Netlify → GitHub** (compte Netlify gratuit déjà supposé créé) :

1. Sur [app.netlify.com](https://app.netlify.com), cliquer **Add new site → Import an existing project**.
2. Choisir **Deploy with GitHub**, autoriser Netlify à accéder au compte GitHub, puis sélectionner le
   dépôt du site.
3. Netlify détecte `netlify.toml` à la racine (déjà présent dans ce build) : build command
   `npm run build`, plugin `@netlify/plugin-nextjs` auto-installé.
4. Dans **Site settings → Environment variables**, ajouter :
   - `NEXT_PUBLIC_N8N_WEBHOOK_URL` = URL réelle du webhook N8N (sinon le formulaire de contact
     affichera une erreur d'envoi).
5. Cliquer **Deploy site**. Le premier déploiement construit et publie automatiquement.
6. Une fois en ligne, dans **Domain settings**, ajouter le domaine personnalisé (`automatex-hub.com`)
   et suivre les instructions DNS de Netlify (enregistrements A/CNAME chez le registrar du domaine).
7. Vérifier après déploiement : `/robots.txt`, `/sitemap.xml` et `/llms.txt` sont bien accessibles à la
   racine du domaine final, et que les URLs qu'ils contiennent correspondent au domaine réellement
   utilisé (actuellement câblées sur `https://automatex-hub.com` via `lib/constants.ts` → `SITE_URL`,
   à mettre à jour si le domaine final diffère).
8. Chaque futur `git push` sur la branche `main` déclenche un nouveau déploiement automatique
   (déploiement continu Netlify, activé par défaut).

Aucune action de compte Netlify réelle n'a été effectuée dans le cadre de ce build (pas de login,
pas de déploiement) — uniquement la préparation des fichiers de configuration (`netlify.toml`,
`.env.example`, vérification de `.gitignore`).
