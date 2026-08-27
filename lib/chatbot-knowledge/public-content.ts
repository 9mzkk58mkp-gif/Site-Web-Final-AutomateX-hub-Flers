import type { KnowledgeChunk } from "./types";

/**
 * Niveau 1 — contenu public de la base de connaissance RAG.
 * Repris du copywriting réel des pages du site (voir app/(site)/**\/page.tsx et
 * content/01-architecture-et-silo-site-web.md, content/02-silos-google-automatisations.md,
 * content/03-pages-transversales.md), découpé par section H2/H3 pour l'indexation.
 *
 * Server-only : jamais importé par un composant client. Utilisé uniquement par
 * app/api/chat/route.ts et le script d'indexation scripts/build-chatbot-index.ts.
 */
export const PUBLIC_CHUNKS: KnowledgeChunk[] = [
  {
    id: "home-hero-probleme",
    tier: "public",
    title: "Accueil — le problème de visibilité",
    url: "/",
    text: "Vos concurrents sont sur Google, vous non. Des artisans qui font un travail irréprochable mais restent invisibles sur Internet, pendant que la concurrence récupère leurs chantiers avec une fiche Google à jour et un site qui s'affiche bien sur téléphone. Le problème n'est pas dans le travail de l'artisan : un particulier cherche « couvreur près de moi » et tombe sur un concurrent ; le site ouvert sur téléphone rame ou casse ; le soir, entre deux chantiers, l'artisan répond aux devis à la main. Automatex : une seule personne du début à la fin, basée dans l'Orne, qui se déplace sur les chantiers.",
  },
  {
    id: "home-services",
    tier: "public",
    title: "Accueil — les 3 services",
    url: "/",
    text: "Ce qu'installe Automatex : 1) Site Web — un site vitrine rapide, propre, optimisé mobile, pensé pour le métier de l'artisan, pas un template générique (voir /sites-web). 2) Fiche Google — fiche Google Business optimisée et à jour pour apparaître dans le pack local quand un client cherche le métier près de chez lui (voir /fiche-google). 3) Automatisations — systèmes qui trient les mails et relancent les devis automatiquement, pour rendre le temps perdu sur l'administratif (voir /automatisations).",
  },
  {
    id: "home-histoire-zones",
    tier: "public",
    title: "Accueil — histoire et zone d'intervention",
    url: "/",
    text: "Une seule personne du début à la fin : Nolan Hermand vient du chantier (CAP menuiserie, pose de fenêtres) et sait que la visibilité passe toujours après le boulot. Installé à Saint-Georges-des-Groseillers, il se déplace dans tout l'Orne pour rencontrer les artisans en face à face.",
  },
  {
    id: "home-faq",
    tier: "public",
    title: "Accueil — questions fréquentes",
    url: "/",
    text: "FAQ : Combien coûte un site internet pour un artisan dans l'Orne ? Une landing page démarre à 1500€, sans abonnement caché, tarif dépendant du nombre de pages et des automatisations ajoutées, devis sur mesure après échange direct. Combien de temps pour la mise en ligne ? En général une à deux semaines entre le premier échange et la mise en ligne, une fois les photos et informations reçues. Garantissez-vous la première position sur Google ? Aucune agence sérieuse ne peut garantir une position, les algorithmes changent en permanence ; le travail porte sur une fiche Google complète, un site rapide et un contenu adapté au métier et à la zone. Pourquoi passer par Automatex plutôt qu'une agence classique ? Une seule personne gère le projet du premier échange à la mise en ligne, délais plus courts, pas de frais de structure. Faut-il s'engager sur la durée ? Non, aucun engagement sur le site en lui-même ; la gestion active de la fiche Google est un service mensuel optionnel, sans engagement. TVA non applicable, art. 293 B du CGI.",
  },
  {
    id: "sites-web-pilier",
    tier: "public",
    title: "Silo Sites Web — page pilier",
    url: "/sites-web",
    text: "Création de site internet pour artisan dans l'Orne. Ce que comprend un site Automatex : design propre pensé pour le métier, optimisé mobile en priorité, rapide au chargement, réalisations mises en valeur avec de vraies photos de chantier, formulaire de contact et numéro visibles partout. Tarif indicatif : à partir de 1500€, sans abonnement caché (TVA non applicable, art. 293 B du CGI).",
  },
  {
    id: "sites-web-menuisier",
    tier: "public",
    title: "Site internet pour menuisier",
    url: "/sites-web/menuisier",
    text: "Un menuisier vend un savoir-faire qu'on ne voit pas sur une liste de prestations. Le site doit montrer le travail : galerie photo avant/après par type de projet, mise en avant des matériaux et finitions, page dédiée aux essences de bois, section sur-mesure. Nolan a un CAP menuiserie et deux ans d'apprentissage en pose de fenêtres.",
  },
  {
    id: "sites-web-couvreur",
    tier: "public",
    title: "Site internet pour couvreur",
    url: "/sites-web/couvreur",
    text: "La toiture fait peur au particulier : budget élevé, urgence en cas de fuite, confiance nécessaire. Le site doit rassurer : certifications et assurance décennale mises en avant, numéro d'urgence visible dès l'accueil, photos avant/après, types d'interventions clairs (rénovation, isolation, zinguerie, entretien). Nolan a fait deux mois de couverture en immersion.",
  },
  {
    id: "sites-web-plombier",
    tier: "public",
    title: "Site internet pour plombier",
    url: "/sites-web/plombier",
    text: "Un client qui cherche un plombier cherche une réponse rapide : numéro visible en un clic depuis mobile, mention claire des interventions d'urgence, liste simple des prestations (dépannage, installation, chauffage, sanitaire), zone d'intervention affichée clairement.",
  },
  {
    id: "sites-web-electricien",
    tier: "public",
    title: "Site internet pour électricien",
    url: "/sites-web/electricien",
    text: "Entre mise aux normes, rénovation électrique et bornes de recharge, le site doit distinguer clairement les prestations : séparation nette (mise aux normes, dépannage, domotique, bornes), certifications si disponibles (Consuel, Qualifelec), rassurance sur sécurité et conformité, formulaire de devis rapide.",
  },
  {
    id: "sites-web-macon",
    tier: "public",
    title: "Site internet pour maçon",
    url: "/sites-web/macon",
    text: "Un chantier de maçonnerie engage un budget conséquent et plusieurs semaines. Le client a besoin de se projeter : galerie de chantiers classés par type (extension, rénovation, gros œuvre), déroulé de chantier type, assurance décennale et garanties, zone d'intervention et délais habituels.",
  },
  {
    id: "fiche-google-pilier",
    tier: "public",
    title: "Silo Fiche Google — page pilier",
    url: "/fiche-google",
    text: "Optimisation de fiche Google Business pour artisan dans l'Orne. C'est la fiche Google que les clients voient en premier, avant même le site : Google Maps, pack local, et de plus en plus les réponses des IA. Ce qui est fait : configuration complète (catégorie, zone, horaires, services), stratégie d'avis clients, optimisation pack local, photos et posts réguliers. Tarif indicatif : à partir de 150€, ou inclus dans un pack site web (TVA non applicable, art. 293 B du CGI).",
  },
  {
    id: "fiche-google-creer-optimiser",
    tier: "public",
    title: "Créer et optimiser sa fiche Google",
    url: "/fiche-google/creer-optimiser",
    text: "Une fiche Google Business est gratuite à créer, le problème est de bien la remplir : bonne catégorie principale (facteur qui pèse le plus), zone d'intervention réaliste, description claire sans bourrage de mots-clés, informations identiques partout en ligne (nom, adresse, téléphone). Une fiche mal configurée n'est pas montrée par Google, même avec de bons avis.",
  },
  {
    id: "fiche-google-avis",
    tier: "public",
    title: "Obtenir et gérer ses avis Google",
    url: "/fiche-google/avis-google",
    text: "Les avis rassurent avant l'appel, mais peu de clients pensent à en laisser un spontanément. Comment faire : demander juste après la fin du chantier, faciliter la démarche avec un lien direct ou une carte NFC, répondre à chaque avis positif comme négatif. Automatex propose une carte NFC personnalisée : le client la scanne et arrive directement sur la page d'avis Google, à partir de 90€.",
  },
  {
    id: "fiche-google-pack-local",
    tier: "public",
    title: "Apparaître dans le pack local Google Maps",
    url: "/fiche-google/pack-local-maps",
    text: "Le pack local, ce sont les 3 résultats en haut de Google Maps pour une recherche comme « couvreur près de moi ». Ce qui détermine la position : pertinence (catégorie et services), distance, notoriété (avis, activité de la fiche, présence en ligne). Ajustements concrets : catégorie, description, zone d'intervention, régularité des publications.",
  },
  {
    id: "fiche-google-photos-posts",
    tier: "public",
    title: "Photos et publications Google",
    url: "/fiche-google/photos-posts",
    text: "Une fiche Google qui ne bouge jamais est considérée comme moins fiable par Google. Ce qui fonctionne : photos de chantiers récents (pas des images génériques), posts réguliers sur les réalisations et disponibilités, renommage des fichiers avec mots-clés et zone. Automatex met en place un rythme de publication simple et tenable.",
  },
  {
    id: "fiche-google-vs-site",
    tier: "public",
    title: "Fiche Google ou site web en premier",
    url: "/fiche-google/fiche-vs-site",
    text: "Les deux travaillent ensemble, mais avec un budget serré : la fiche Google en premier si l'artisan veut des appels rapidement, a un budget limité, ou n'a pas encore beaucoup de réalisations à montrer. Le site en premier si l'artisan travaille sur recommandation et devis premium, veut montrer un book détaillé, ou vise des clients qui comparent plusieurs prestataires. Dans l'idéal, les deux ensemble : la fiche capte la recherche locale immédiate, le site convertit et rassure.",
  },
  {
    id: "automatisations-pilier",
    tier: "public",
    title: "Silo Automatisations — page pilier",
    url: "/automatisations",
    text: "Automatisation des devis et de la gestion administrative pour artisans du bâtiment dans l'Orne. Il ne s'agit ni de robotique ni de machines d'atelier : uniquement le travail de bureau d'une entreprise du bâtiment. Ce qui est installé : relance des devis envoyés et restés sans réponse, tri des mails entrants (demandes de chantier d'un côté, factures fournisseurs de l'autre), devis dicté depuis le chantier et retranscrit sans ressaisie. Des systèmes qui tournent en arrière-plan sur les outils habituels de l'artisan (boîte mail, téléphone, tableau de suivi). Concerne menuisiers, couvreurs, plombiers, électriciens et maçons de Flers et de l'Orne. Tarif : sur devis, selon les systèmes mis en place (TVA non applicable, art. 293 B du CGI).",
  },
  {
    id: "automatisations-relance-devis",
    tier: "public",
    title: "Relance devis automatique pour artisans du bâtiment",
    url: "/automatisations/relance-devis",
    text: "Relance devis automatique pour artisans du bâtiment. Un devis sans réponse n'est presque jamais un refus : le client attend un accord de banque, compare deux entreprises, ou a laissé filer le mail. Chaque devis envoyé est suivi, une relance écrite part au bon moment au nom de l'artisan, et la relance suivante est annulée si le client répond. Ce n'est pas un logiciel de devis de plus : le système se branche sur la boîte mail et le suivi de devis existants, sans abonnement mensuel imposé ni interface supplémentaire à apprendre. Tarif sur devis, TVA non applicable, art. 293 B du CGI.",
  },
  {
    id: "automatisations-tri-emails",
    tier: "public",
    title: "Tri automatique des mails pour artisans du bâtiment",
    url: "/automatisations/tri-emails",
    text: "Tri automatique des mails pour artisans du bâtiment. Entre demandes de devis, factures fournisseurs et publicité, la boîte mail d'un menuisier, d'un couvreur ou d'un plombier devient vite un fouillis et les demandes de chantier s'y perdent. Les mails sont triés par type (demande de chantier, facture fournisseur, administratif, reste), les demandes de devis remontent en haut, des réponses brouillon sont préparées pour les demandes courantes. Le tri se met en place sur la boîte mail actuelle, avec des règles définies à partir de ce que l'artisan reçoit vraiment. Rien n'est supprimé. Tarif sur devis, TVA non applicable, art. 293 B du CGI.",
  },
  {
    id: "automatisations-devis-vocal",
    tier: "public",
    title: "Automatiser les devis à la voix",
    url: "/automatisations/devis-vocal",
    text: "Automatiser les devis à la voix. Sur un chantier, prendre des notes pour un devis n'est jamais pratique : les cotes finissent sur un carnet et la mise en forme attend le soir. L'artisan dicte les informations depuis le chantier avec son téléphone, les cotes, quantités et coordonnées du client sont retranscrites et rangées, et il récupère une base de devis prête à chiffrer sans ressaisie. Le suivi des devis (envoyé, vu, accepté, sans réponse) se tient ensuite tout seul dans un tableau, et alimente la relance devis automatique. Tarif sur devis, TVA non applicable, art. 293 B du CGI.",
  },
  {
    id: "qui-je-suis",
    tier: "public",
    title: "Qui je suis — Nolan Hermand",
    url: "/qui-je-suis",
    text: "Nolan Hermand, 19 ans, a fait du chantier avant de faire du web : CAP menuiserie, deux ans d'apprentissage en pose de fenêtres, deux mois de couverture. Pendant son alternance, il a vu des artisans au travail irréprochable mais invisibles sur Internet, pendant que leurs concurrents décrochaient des chantiers grâce à une fiche Google à jour ou un site qui s'affiche bien sur téléphone. Il a créé Automatex pour régler ça. Il gère chaque projet seul, du premier échange à la mise en ligne, pas de commercial ni de chef de projet intermédiaire. Basé à Saint-Georges-des-Groseillers, dans l'Orne, il se déplace pour rencontrer les artisans en face à face.",
  },
  {
    id: "zones-intervention",
    tier: "public",
    title: "Zones d'intervention",
    url: "/zones-intervention",
    text: "Installé à Saint-Georges-des-Groseillers, Automatex intervient dans tout le département de l'Orne, avec une priorité sur le bassin de Flers. Secteurs prioritaires : Flers, Saint-Georges-des-Groseillers, La Selle-la-Forge, Tinchebray-Bocage, Domfront en Poiraie, Condé-en-Normandie. Le reste de l'Orne (Argentan, Alençon, L'Aigle, Mortagne-au-Perche et toutes les communes du département) est couvert sur rendez-vous. Pour les rendez-vous en visio ou les projets sans besoin de rencontre physique, Automatex travaille aussi à distance partout en France.",
  },
  {
    id: "contact",
    tier: "public",
    title: "Contact",
    url: "/contact",
    text: "La manière la plus rapide de joindre Automatex, c'est le téléphone ou WhatsApp au 06 45 38 42 33 — réponse personnelle, pas de standard. Email : nolan.hermand@automatex-hub.com. Un formulaire de contact écrit est aussi disponible sur la page /contact. Réponse sous 24h ouvrées ; pour une urgence, appeler directement.",
  },
];
