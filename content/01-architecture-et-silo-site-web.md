# AUTOMATEX — Architecture complète + Copywriting Silo "Site Web"

## ARCHITECTURE FINALE DES PAGES

```
/                                          → Accueil
/qui-je-suis                               → Page de confiance (E-E-A-T)
/zones-intervention                        → Rayon d'action Orne
/realisations                              → Études de cas clients
/contact                                   → Contact + NAP

/sites-web                                 → PILIER Silo 1
  /sites-web/menuisier                     → Page fille
  /sites-web/couvreur                      → Page fille
  /sites-web/plombier                      → Page fille
  /sites-web/electricien                   → Page fille
  /sites-web/macon                         → Page fille

/fiche-google                              → PILIER Silo 2
  /fiche-google/creer-optimiser            → Page fille
  /fiche-google/avis-google                → Page fille
  /fiche-google/pack-local-maps            → Page fille
  /fiche-google/photos-posts               → Page fille
  /fiche-google/fiche-vs-site              → Page fille

/automatisations                           → PILIER Silo 3
  /automatisations/relance-devis           → Page fille
  /automatisations/tri-emails              → Page fille
  /automatisations/devis-vocal             → Page fille

/mentions-legales
```

Règle de maillage : chaque fille lie vers sa pilier (lien "Retour à [pilier]" en haut + CTA en bas). Chaque pilier liste ses filles avec un extrait de 2 lignes. Les filles d'un même silo se lient entre elles seulement si le contenu s'y prête naturellement (ex : la page "couvreur" peut renvoyer vers "menuisier" si le client fait aussi de la charpente — jamais de lien forcé).

Tous les liens internes du copywriting ci-dessous sont écrits avec le domaine `https://claude.ai/...` par erreur de collage — ce sont en réalité des chemins internes du site (ex: `https://claude.ai/sites-web` → `/sites-web`). Utilise les chemins relatifs internes (`/sites-web`, `/fiche-google/avis-google`, etc.), jamais le domaine claude.ai.

---

## HOME — /

### Hero
H1 : Vos concurrents sont sur Google. Vous, non.

Sous-titre : Des artisans qui font un travail irréprochable, mais invisibles sur Internet. Pendant ce temps, la concurrence récupère vos chantiers avec une fiche Google à jour et un site qui s'affiche bien sur téléphone.

CTA primaire : 📞 06 45 38 42 33
CTA secondaire : WhatsApp

(Ligne de réassurance sous les CTA, petite taille) : Une seule personne du début à la fin. Basé dans l'Orne, je me déplace sur vos chantiers.

### Section Problème
Titre H2 : Le problème, il n'est pas dans votre travail

Vous savez faire votre métier. Le problème, c'est qu'on ne vous trouve pas.

- Un particulier cherche "couvreur près de moi" → il tombe sur votre concurrent, pas sur vous
- Il ouvre votre site sur son téléphone → ça rame, ça casse, il repart
- Le soir, entre deux chantiers, vous répondez aux devis à la main

Pas de théorie ici. Trois problèmes concrets, trois solutions concrètes.

(Pas d'emoji/icône réaliste dans le design final — carte avec point vert émeraude à la place, cf. design system.)

### Section Services (3 cartes)
Titre H2 : Ce que j'installe pour vous

**Carte 1 — Site Web**
Un site qui fait qu'on vous choisit, vous.
Un site vitrine rapide, propre, qui s'affiche bien sur mobile et montre vos réalisations. Pas un site générique — un site pensé pour votre métier.
→ Voir le détail (/sites-web)

**Carte 2 — Fiche Google**
Le premier qu'on trouve, c'est le premier qu'on appelle.
Votre fiche Google Business optimisée, à jour, qui vous sort dans le pack local quand un client cherche votre métier près de chez lui.
→ Voir le détail (/fiche-google)

**Carte 3 — Automatisations**
Moins de bureau, plus de chantier.
Des systèmes qui trient vos mails et relancent vos devis tout seuls. Le temps que vous perdez sur l'administratif, on vous le rend.
→ Voir le détail (/automatisations)

### Section Histoire (courte, teaser vers "Qui je suis")
Titre H2 : Une seule personne du début à la fin

Je m'appelle Nolan Hermand. Je viens du chantier — CAP menuiserie, pose de fenêtres. Je sais comment vous travaillez, et je sais que la visibilité passe toujours après le boulot.

→ Mon parcours (/qui-je-suis)

### Section Preuve sociale (à activer dès les premiers clients réels)
Titre H2 : Ils m'ont fait confiance

(Placeholder structurel — à remplir avec les 3 premiers clients : Menuiserie Bois Concept, Ren & Rev, MG LOC, dès accord client pour affichage. Ne pas inventer d'avis ou de logos maintenant — prévoir la section vide/masquée proprement, pas de fausse preuve sociale.)

### Section Zones
Titre H2 : Installé à Saint-Georges-des-Groseillers, je me déplace dans tout l'Orne

Vous êtes artisan dans l'Orne ? On peut se rencontrer en face à face, pas juste par mail.

→ Zones d'intervention (/zones-intervention)

### Section FAQ (format GEO — questions autoportantes, citables telles quelles par une IA)
Titre H2 : Questions fréquentes

**Q : Combien coûte un site internet pour un artisan dans l'Orne ?**
R : Une landing page démarre à 1500€, sans abonnement caché. Le tarif dépend du nombre de pages et des automatisations ajoutées. Chaque devis est fait sur mesure après un échange direct.

**Q : Combien de temps pour avoir mon site en ligne ?**
R : En général une à deux semaines entre le premier échange et la mise en ligne, une fois les photos et les informations de l'entreprise reçues.

**Q : Est-ce que vous garantissez la première position sur Google ?**
R : Aucune agence sérieuse ne peut garantir une position, les algorithmes changent en permanence. Le travail porte sur une fiche Google complète, un site rapide, et un contenu qui correspond vraiment à votre métier et votre zone.

**Q : Pourquoi passer par vous plutôt qu'une agence classique ?**
R : Une seule personne gère votre projet du premier échange à la mise en ligne, sans intermédiaire. Les délais sont plus courts qu'en agence, et le prix ne comprend pas de frais de structure.

**Q : Est-ce que je dois m'engager sur la durée ?**
R : Non, aucun engagement de durée sur le site en lui-même. La gestion active de la fiche Google (posts, avis, photos) est un service mensuel optionnel, sans engagement non plus.

(TVA non applicable, art. 293 B du CGI — à afficher partout où un prix apparaît)

---

## SILO 1 — /sites-web (page pilier)

H1 : Création de site internet pour artisan dans l'Orne

Intro : Un site vitrine ne sert à rien s'il charge lentement ou s'il ne s'affiche pas bien sur téléphone. C'est pourtant ce que la majorité des artisans ont aujourd'hui : un site fait il y a cinq ans, jamais mis à jour, ou pas de site du tout.

Ce que comprend un site Automatex :
- Un design propre, pensé pour votre métier — pas un template générique
- Optimisé mobile en priorité (la majorité de vos clients vous cherchent depuis leur téléphone)
- Rapide au chargement (Google pénalise les sites lents, vos visiteurs aussi)
- Vos réalisations mises en valeur avec de vraies photos de chantier
- Un formulaire de contact et un numéro visibles partout

Tarif indicatif : à partir de 1500€, sans abonnement caché. (TVA non applicable, art. 293 B du CGI)

Section pages métier : Chaque métier a ses propres besoins. Voici le détail par spécialité :
- Site internet pour menuisier dans l'Orne (/sites-web/menuisier)
- Site internet pour couvreur dans l'Orne (/sites-web/couvreur)
- Site internet pour plombier dans l'Orne (/sites-web/plombier)
- Site internet pour électricien dans l'Orne (/sites-web/electricien)
- Site internet pour maçon dans l'Orne (/sites-web/macon)

CTA bas de page : 📞 06 45 38 42 33 — Parlons de votre projet

---

## PAGES FILLES — Silo Site Web

(Chaque page suit la même structure mais avec un angle et des détails propres au métier — pas de copier-coller. Le H1 change l'intention de recherche visée.)

### /sites-web/menuisier
H1 : Site internet pour menuisier dans l'Orne

Intro spécifique métier : Un menuisier vend un savoir-faire qu'on ne voit pas sur une simple liste de prestations. Vos clients veulent voir vos réalisations avant de vous contacter : une cuisine sur mesure, un escalier, une pose de fenêtres. Le site doit montrer le travail, pas juste le décrire.

Ce qui compte pour un site de menuisier :
- Galerie photo avant/après par type de projet (agencement, extérieur, escalier, fenêtres)
- Mise en avant des matériaux et finitions travaillés
- Page dédiée aux matériaux et essences si vous travaillez plusieurs types de bois
- Section "sur-mesure" qui rassure sur la capacité à répondre à des demandes spécifiques

Ce que je connais du métier : CAP menuiserie, deux ans d'apprentissage en pose de fenêtres. Je sais ce qu'un client cherche à voir avant de vous appeler : la précision de la finition, pas juste "menuisier depuis 10 ans".

CTA : 📞 06 45 38 42 33 — Discutons de votre site

### /sites-web/couvreur
H1 : Site internet pour couvreur dans l'Orne

Intro spécifique métier : La toiture, c'est un chantier qui fait peur au particulier : budget élevé, urgence en cas de fuite, confiance obligatoire avant de laisser quelqu'un monter sur son toit. Votre site doit rassurer avant tout — certifications, assurance décennale, avant/après clairs.

Ce qui compte pour un site de couvreur :
- Mise en avant immédiate des certifications et de l'assurance décennale
- Un numéro d'urgence visible dès la page d'accueil (fuite, dégât des eaux)
- Photos avant/après de chantiers de rénovation de toiture
- Section claire sur les types d'interventions (rénovation, isolation, zinguerie, entretien)

Ce que je connais du métier : Deux mois de couverture en immersion. Assez pour savoir qu'un client en urgence ne cherche pas un joli site — il cherche un numéro qui répond vite et une preuve que vous êtes du métier.

CTA : 📞 06 45 38 42 33 — Discutons de votre site

### /sites-web/plombier
H1 : Site internet pour plombier dans l'Orne

Intro spécifique métier : Fuite, panne de chauffe-eau, urgence sanitaire : un client qui cherche un plombier cherche une réponse rapide, pas un porte-folio. Le site doit afficher la disponibilité et le numéro en évidence, avant tout le reste.

Ce qui compte pour un site de plombier :
- Numéro de contact visible en un clic depuis mobile, sans scroller
- Mention claire des interventions d'urgence si vous en proposez
- Liste simple des prestations (dépannage, installation, chauffage, sanitaire)
- Zone d'intervention affichée clairement pour rassurer sur le délai de venue

CTA : 📞 06 45 38 42 33 — Discutons de votre site

### /sites-web/electricien
H1 : Site internet pour électricien dans l'Orne

Intro spécifique métier : Entre mise aux normes, rénovation électrique et installation de bornes de recharge, un électricien couvre souvent plusieurs types de prestations très différentes. Le site doit les distinguer clairement pour que le client trouve tout de suite ce qu'il cherche.

Ce qui compte pour un site d'électricien :
- Séparation claire des prestations (mise aux normes, dépannage, domotique, bornes)
- Mention des certifications si vous en avez (Consuel, Qualifelec)
- Rassurance sur la sécurité et la conformité des installations
- Formulaire de contact simple pour une demande de devis rapide

CTA : 📞 06 45 38 42 33 — Discutons de votre site

### /sites-web/macon
H1 : Site internet pour maçon dans l'Orne

Intro spécifique métier : Un chantier de maçonnerie engage souvent un budget conséquent et plusieurs semaines de travaux. Le client a besoin de se projeter avant de contacter : réalisations passées, types de chantiers gérés (extension, gros œuvre, rénovation).

Ce qui compte pour un site de maçon :
- Galerie de chantiers réalisés, classés par type (extension, rénovation, gros œuvre)
- Explication claire du déroulé d'un chantier type
- Mise en avant de l'assurance décennale et des garanties
- Zone d'intervention et délais habituels affichés

CTA : 📞 06 45 38 42 33 — Discutons de votre site
