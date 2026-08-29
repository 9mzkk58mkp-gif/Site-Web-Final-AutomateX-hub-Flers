import type { FaqItem } from "@/lib/faq";

/**
 * FAQ des pages de service, une constante par page.
 *
 * Chaque question est écrite telle qu'un artisan la pose au téléphone, et
 * chaque réponse commence par la réponse — pas par un préambule. C'est ce
 * format que les moteurs génératifs reprennent tel quel, et c'est aussi
 * celui qui répond le plus vite à quelqu'un qui hésite.
 *
 * Les objections traitées en priorité sont celles qui bloquent réellement la
 * vente sur ce marché : le prix, la durée d'engagement, et la propriété du
 * site — les trois plaies du démarchage subies par les artisans.
 *
 * Toute mention de prix porte la mention TVA (art. 293 B du CGI), et aucun
 * tarif ne figure ici s'il n'est pas déjà écrit en clair sur la page.
 */

/* ------------------------------------------------------------------ */
/* Silo Sites Web                                                      */
/* ------------------------------------------------------------------ */

export const SITES_WEB_FAQ: readonly FaqItem[] = [
  {
    question: "Combien coûte un site internet pour un artisan ?",
    answer:
      "Un site vitrine démarre à 890 € et une landing page à 1500 €, sans abonnement caché. Le tarif dépend du nombre de pages et du contenu à produire. Le prix vous est annoncé avant de commencer, pas négocié en fin de rendez-vous. TVA non applicable, art. 293 B du CGI.",
  },
  {
    question: "Est-ce que je reste propriétaire de mon site ?",
    answer:
      "Oui, entièrement. Le nom de domaine est déposé à votre nom, et le site vous appartient une fois payé. Vous n'êtes pas en location : si vous décidez un jour de partir, vous emportez votre site et votre domaine, et n'importe quel autre prestataire peut reprendre derrière moi.",
  },
  {
    question: "Je suis engagé combien de temps ?",
    answer:
      "Sur le site lui-même, aucune durée d'engagement : vous payez la création, le site est à vous. Seule la gestion suivie de votre fiche Google est un service mensuel, et il s'arrête quand vous le décidez, sans préavis ni pénalité.",
  },
  {
    question: "Combien de temps avant que le site soit en ligne ?",
    answer:
      "Une à deux semaines entre le premier échange et la mise en ligne, une fois vos photos et les informations de votre entreprise reçues. Le délai dépend surtout de la vitesse à laquelle vous m'envoyez vos éléments — la partie technique, elle, ne traîne pas.",
  },
  {
    question: "Je n'ai pas de belles photos de mes chantiers, c'est bloquant ?",
    answer:
      "Non. Des photos prises au téléphone sur un chantier fini valent mieux que des images d'illustration achetées : ce sont vos ouvrages que le client veut voir, pas une cuisine de catalogue. Je vous dis quoi photographier et sous quel angle, et je me déplace pour en faire moi-même si nécessaire.",
  },
];

export const MENUISIER_FAQ: readonly FaqItem[] = [
  {
    question: "Qu'est-ce qui doit apparaître sur le site d'un menuisier ?",
    answer:
      "Vos réalisations, en photos et en grand. Un menuisier vend un savoir-faire qui ne se lit pas dans une liste de prestations : un client qui hésite entre deux devis regarde les finitions, les essences, la façon dont un escalier est monté. La galerie passe donc avant le texte, et le sur-mesure a sa propre section.",
  },
  {
    question: "Je fais de l'agencement et de la pose de fenêtres, faut-il deux sites ?",
    answer:
      "Non, une page par activité sur le même site. Un particulier qui cherche à faire poser des fenêtres et un autre qui veut une cuisine sur mesure ne cherchent pas les mêmes mots : deux pages distinctes captent les deux recherches, sans diluer votre identité ni doubler le budget.",
  },
  {
    question: "Combien coûte un site pour un menuisier ?",
    answer:
      "À partir de 890 € pour un site vitrine, sans abonnement caché. Le tarif dépend du nombre de pages et de la quantité de réalisations à mettre en forme. TVA non applicable, art. 293 B du CGI.",
  },
];

export const COUVREUR_FAQ: readonly FaqItem[] = [
  {
    question: "Qu'est-ce qui doit apparaître sur le site d'un couvreur ?",
    answer:
      "Votre numéro, tout de suite et sur chaque page. Une toiture qui fuit est une urgence : le client appelle le premier couvreur qu'il arrive à joindre. Viennent ensuite votre assurance décennale et vos qualifications, parce qu'une réfection de toiture représente une grosse somme et que le client cherche à se rassurer avant d'engager.",
  },
  {
    question: "Est-ce utile de montrer mes chantiers de toiture en photo ?",
    answer:
      "Oui, surtout en avant/après. C'est ce qui distingue une entreprise qui travaille réellement d'une annonce en ligne. Un toit refait, une charpente reprise, un faîtage propre : ces photos-là font plus pour votre crédibilité que n'importe quel texte de présentation.",
  },
  {
    question: "Combien coûte un site pour un couvreur ?",
    answer:
      "À partir de 890 € pour un site vitrine, sans abonnement caché, avec le numéro d'urgence mis en avant sur chaque page. TVA non applicable, art. 293 B du CGI.",
  },
];

export const PLOMBIER_FAQ: readonly FaqItem[] = [
  {
    question: "Qu'est-ce qui compte le plus sur le site d'un plombier ?",
    answer:
      "Que le numéro soit cliquable en une seconde depuis un téléphone. La majorité de vos demandes sont des urgences — une fuite, un chauffe-eau en panne — et se cherchent debout dans une cuisine, pas assis devant un ordinateur. Le reste du site sert à rassurer ; ce bouton-là sert à décrocher l'appel.",
  },
  {
    question: "Faut-il séparer le dépannage et les travaux d'installation ?",
    answer:
      "Oui, ce sont deux clients différents. Celui qui a une fuite veut un numéro et une disponibilité ; celui qui refait une salle de bains veut voir des réalisations et comprendre le déroulé. Deux pages distinctes évitent que l'un des deux ne s'y retrouve pas.",
  },
  {
    question: "Combien coûte un site pour un plombier ?",
    answer:
      "À partir de 890 € pour un site vitrine, sans abonnement caché, avec la zone d'intervention et les urgences mises en avant. TVA non applicable, art. 293 B du CGI.",
  },
];

export const ELECTRICIEN_FAQ: readonly FaqItem[] = [
  {
    question: "Qu'est-ce qui doit apparaître sur le site d'un électricien ?",
    answer:
      "Vos prestations séparées clairement, et vos qualifications visibles. Un particulier qui fait une mise aux normes, un autre qui installe une borne de recharge et un troisième qui monte un tableau neuf ne cherchent pas la même chose : une page par prestation évite de les perdre dans une liste.",
  },
  {
    question: "Mes qualifications servent-elles vraiment à quelque chose en ligne ?",
    answer:
      "Oui, sur les chantiers où le client demande une aide ou un financement. Une qualification affichée et vérifiable règle une question que le client se pose de toute façon, et lui évite de vous appeler juste pour la poser.",
  },
  {
    question: "Combien coûte un site pour un électricien ?",
    answer:
      "À partir de 890 € pour un site vitrine, sans abonnement caché, avec un formulaire de demande de devis rapide. TVA non applicable, art. 293 B du CGI.",
  },
];

export const MACON_FAQ: readonly FaqItem[] = [
  {
    question: "Qu'est-ce qui doit apparaître sur le site d'un maçon ?",
    answer:
      "Vos chantiers classés par type, et le déroulé d'un chantier. Une terrasse, une extension et un mur de clôture n'intéressent pas les mêmes clients : les ranger par type permet à chacun de trouver le sien. Le déroulé, lui, répond à la question que tout le monde se pose sans l'écrire — combien de temps et dans quel ordre.",
  },
  {
    question: "Faut-il afficher les garanties sur le site ?",
    answer:
      "Oui. Sur du gros œuvre, la décennale est la première chose qu'un particulier vérifie avant de signer. L'afficher clairement vous évite de perdre un client qui aurait supposé, à tort, que vous n'en aviez pas.",
  },
  {
    question: "Combien coûte un site pour un maçon ?",
    answer:
      "À partir de 890 € pour un site vitrine, sans abonnement caché, avec une galerie de chantiers classée par type. TVA non applicable, art. 293 B du CGI.",
  },
];

/* ------------------------------------------------------------------ */
/* Silo Fiche Google                                                   */
/* ------------------------------------------------------------------ */

export const FICHE_GOOGLE_FAQ: readonly FaqItem[] = [
  {
    question: "Combien coûte la prise en charge de ma fiche Google ?",
    answer:
      "À partir de 150 €, ou incluse quand elle accompagne la création d'un site. Le suivi dans la durée — publications, avis, photos — est un service mensuel séparé et optionnel. TVA non applicable, art. 293 B du CGI.",
  },
  {
    question: "Ma fiche existe déjà, est-ce que ça sert encore à quelque chose ?",
    answer:
      "Souvent plus que d'en créer une. La plupart des fiches existantes ont la mauvaise catégorie principale, une zone d'intervention vide ou des horaires qui datent — trois réglages qui pèsent lourd sur votre position. Une fiche à moitié remplie n'est pas montrée, même avec de bons avis.",
  },
  {
    question: "Est-ce que je garde la main sur ma fiche Google ?",
    answer:
      "Oui, le compte reste le vôtre. J'interviens avec un accès que vous m'accordez et que vous pouvez retirer à tout moment depuis votre propre compte Google, sans passer par moi. Vous ne dépendez de personne pour reprendre votre fiche.",
  },
  {
    question: "Vous garantissez que je sortirai en premier sur Google ?",
    answer:
      "Non, et méfiez-vous de qui vous le promet. Personne ne contrôle le classement de Google, et les critères changent régulièrement. Ce qui se garantit, c'est le travail : une fiche complète, cohérente avec votre site, active, et réglée sur ce que Google regarde réellement.",
  },
];

export const CREER_OPTIMISER_FAQ: readonly FaqItem[] = [
  {
    question: "Créer une fiche Google, c'est payant ?",
    answer:
      "Non, la création est gratuite chez Google. Ce qui se paie, c'est le temps de la remplir correctement et de la tenir à jour — c'est là que se joue la différence entre une fiche qui sort et une fiche que personne ne voit.",
  },
  {
    question: "Quelle est l'erreur la plus fréquente sur une fiche d'artisan ?",
    answer:
      "La catégorie principale mal choisie. C'est le réglage qui pèse le plus sur votre position, et beaucoup d'artisans se déclarent en « entreprise de construction » alors qu'ils sont couvreurs ou plombiers. Résultat : la fiche ne remonte pas sur les recherches qui comptent pour eux.",
  },
  {
    question: "Faut-il indiquer mon adresse si je travaille chez les clients ?",
    answer:
      "Non, et c'est même déconseillé si vous ne recevez pas de public. Google prévoit un réglage pour les entreprises qui se déplacent : vous masquez l'adresse et vous déclarez votre zone d'intervention à la place. Votre domicile n'apparaît pas, et vous sortez quand même sur votre secteur.",
  },
  {
    question: "Une zone d'intervention large, c'est mieux ?",
    answer:
      "Non, l'inverse. Déclarer tout un département quand vous travaillez sur le bassin de Flers dilue votre fiche sans rien vous rapporter : la distance reste un critère, et une zone irréaliste ne vous fait pas sortir plus loin. Mieux vaut une zone honnête et bien couverte.",
  },
];

export const AVIS_GOOGLE_FAQ: readonly FaqItem[] = [
  {
    question: "C'est légal d'acheter des avis Google ?",
    answer:
      "Non. Publier ou faire publier de faux avis est sanctionné en France au titre des pratiques commerciales trompeuses par le Code de la consommation, avec des amendes qui se chiffrent en dizaines de milliers d'euros. Indépendamment de la loi, Google supprime les avis achetés quand il les détecte et peut suspendre la fiche entière — vous perdez alors aussi les vrais avis accumulés. Le risque est hors de proportion avec le gain.",
  },
  {
    question: "Comment demander un avis sans avoir l'air insistant ?",
    answer:
      "En demandant une seule fois, au bon moment : juste après la fin du chantier, quand le client est content et que vous êtes encore devant lui. C'est le moment où la demande paraît naturelle. Passé une semaine, elle devient une relance, et le taux de réponse s'effondre.",
  },
  {
    question: "Que faire d'un avis négatif ?",
    answer:
      "Y répondre, calmement et publiquement. Un avis négatif isolé au milieu d'avis positifs ne fait pas de mal : ce qui fait du mal, c'est un avis négatif sans réponse. Les prochains clients lisent votre réponse autant que la critique, et une réponse posée vous sert plus qu'un dossier parfait.",
  },
  {
    question: "Combien d'avis faut-il pour que ça change quelque chose ?",
    answer:
      "Il n'y a pas de seuil magique, mais la régularité compte plus que le total. Une entreprise qui récolte deux ou trois avis par mois envoie un meilleur signal qu'une autre qui en a trente, tous datés de la même semaine il y a deux ans.",
  },
];

export const GOOGLE_MAPS_FAQ: readonly FaqItem[] = [
  {
    question: "Pourquoi mes concurrents sortent devant moi sur Google Maps ?",
    answer:
      "Parce que leur fiche répond mieux à trois questions que Google se pose : est-ce qu'elle correspond à ce qui est cherché, est-ce que l'entreprise est proche, et est-ce qu'elle a l'air fiable. Ce n'est pas un jugement sur votre travail — c'est un réglage de fiche, et il se rattrape.",
  },
  {
    question: "Je suis loin du centre-ville, est-ce que c'est perdu d'avance ?",
    answer:
      "Non, mais la distance ne se change pas. Vous sortirez plus difficilement sur une recherche faite à l'autre bout du département, et plus facilement autour de vous. C'est pour ça que les deux autres critères — la fiche et la fiabilité — méritent d'être travaillés à fond : ce sont les seuls sur lesquels vous avez la main.",
  },
  {
    question: "Combien de temps avant de voir un changement ?",
    answer:
      "Quelques semaines en général, parfois plus. Google ne réévalue pas une fiche instantanément, et les effets se voient d'abord sur les recherches proches de vous. Personne ne peut vous garantir un délai — qui vous en promet un invente.",
  },
];

export const PHOTOS_POSTS_FAQ: readonly FaqItem[] = [
  {
    question: "À quelle fréquence faut-il publier sur sa fiche Google ?",
    answer:
      "Un rythme que vous pouvez tenir vaut mieux qu'un rythme ambitieux abandonné au bout d'un mois. Deux publications par mois, régulières, envoient un meilleur signal qu'une salve de dix suivie de six mois de silence.",
  },
  {
    question: "Je peux utiliser des photos trouvées sur internet ?",
    answer:
      "Non, pour deux raisons. Ces images appartiennent à quelqu'un, et surtout elles ne montrent pas votre travail : un client reconnaît une photo de catalogue et se demande aussitôt pourquoi vous n'avez pas les vôtres. Une photo de chantier prise au téléphone est plus convaincante.",
  },
  {
    question: "Qu'est-ce que je publie, concrètement ?",
    answer:
      "Ce que vous venez de finir. Un chantier terminé, un avant/après, une disponibilité pour la saison qui arrive. Vous n'avez rien à inventer : il s'agit de montrer que l'entreprise tourne, pas de faire de la communication.",
  },
];

export const FICHE_VS_SITE_FAQ: readonly FaqItem[] = [
  {
    question: "Si je ne peux en faire qu'un seul, je commence par quoi ?",
    answer:
      "Par la fiche Google, dans la plupart des cas. Elle coûte moins cher, elle est visible plus vite, et elle capte les recherches urgentes faites depuis un téléphone. Le site prend le relais quand le client compare plusieurs entreprises avant de choisir.",
  },
  {
    question: "Est-ce qu'une fiche Google peut remplacer un site ?",
    answer:
      "Pour un dépannage, souvent oui. Pour un chantier à plusieurs milliers d'euros, non : le client veut voir des réalisations, comprendre comment vous travaillez et se rassurer avant d'appeler. Une fiche ne donne pas cette place-là.",
  },
  {
    question: "Combien ça coûte de faire les deux ?",
    answer:
      "La fiche est incluse quand elle accompagne la création d'un site : comptez à partir de 890 € pour un site vitrine avec la fiche mise en place et vérifiée. TVA non applicable, art. 293 B du CGI.",
  },
];

/* ------------------------------------------------------------------ */
/* Silo Systèmes                                                       */
/* ------------------------------------------------------------------ */

export const SYSTEMES_FAQ: readonly FaqItem[] = [
  {
    question: "Est-ce qu'il faut changer mes outils ou mon logiciel ?",
    answer:
      "Non. Tout se branche sur ce que vous utilisez déjà — votre boîte mail, votre téléphone, votre suivi de devis. Il n'y a pas de nouveau logiciel à apprendre, pas de deuxième interface à ouvrir le soir, et rien à ressaisir ailleurs.",
  },
  {
    question: "Combien ça coûte ?",
    answer:
      "Sur devis, selon ce qui est mis en place et selon vos outils actuels. On commence toujours par un échange : vous décrivez votre semaine type, je vous dis ce qui vaut la peine d'être repris et ce qui n'en vaut pas la peine. TVA non applicable, art. 293 B du CGI.",
  },
  {
    question: "Est-ce que je garde le contrôle de ce qui part à mes clients ?",
    answer:
      "Oui. Rien n'est envoyé à votre insu : vous voyez ce qui part, à quel moment, et vous pouvez couper ou modifier quand vous voulez. Le principe est de vous enlever le suivi, pas la décision.",
  },
  {
    question: "Je ne suis pas à l'aise avec l'informatique, c'est un problème ?",
    answer:
      "Non, c'est plutôt la raison d'être de ces systèmes. Ils tournent en arrière-plan et ne vous demandent rien au quotidien. Si l'installation exige que vous appreniez quelque chose de compliqué, c'est qu'elle est mal faite.",
  },
];

export const RELANCE_DEVIS_FAQ: readonly FaqItem[] = [
  {
    question: "Au bout de combien de temps part la relance ?",
    answer:
      "Au délai que vous fixez, généralement une semaine après l'envoi du devis, puis une seconde fois deux à trois semaines plus tard. Vous choisissez ces délais selon votre métier : un dépannage ne se relance pas au même rythme qu'une réfection de toiture.",
  },
  {
    question: "Et si le client a déjà répondu entre-temps ?",
    answer:
      "La relance suivante s'annule d'elle-même. Dès qu'une réponse arrive, le suivi le voit et coupe : vous ne risquez pas de relancer quelqu'un qui vient d'accepter votre devis, ce qui est précisément ce qui fait mauvaise impression.",
  },
  {
    question: "La relance est-elle écrite à mon nom ?",
    answer:
      "Oui, à votre nom et dans un français qui ressemble au vôtre. Le client reçoit un message qui pourrait être le vôtre, pas une notification automatique reconnaissable à dix mètres. Vous validez les textes avant la mise en route.",
  },
  {
    question: "Combien coûte la mise en place ?",
    answer:
      "Sur devis, selon les outils que vous utilisez déjà pour vos devis et votre boîte mail. TVA non applicable, art. 293 B du CGI.",
  },
];

export const TRI_EMAILS_FAQ: readonly FaqItem[] = [
  {
    question: "Est-ce que des mails peuvent être supprimés par erreur ?",
    answer:
      "Non, rien n'est supprimé. Les mails sont classés, pas jetés : tout reste dans votre boîte et reste retrouvable. Le tri ne fait que remonter les demandes de chantier en haut et ranger le reste.",
  },
  {
    question: "Faut-il changer d'adresse mail ?",
    answer:
      "Non, le tri se branche sur votre boîte actuelle. Vous gardez votre adresse, vos contacts et votre historique — vous les retrouvez simplement rangés.",
  },
  {
    question: "Les réponses partent-elles toutes seules ?",
    answer:
      "Non. Des brouillons sont préparés pour les demandes courantes, mais rien ne part sans que vous l'ayez relu et envoyé. Vous gagnez le temps de la rédaction, pas le contrôle de ce que vous dites.",
  },
];

export const DEVIS_VOCAL_FAQ: readonly FaqItem[] = [
  {
    question: "Il me faut une application particulière pour dicter ?",
    answer:
      "Non, votre téléphone suffit. Vous dictez pendant la visite comme vous laisseriez un message, et vous récupérez les informations mises en forme. Rien à installer sur un ordinateur, rien à apprendre avant de commencer.",
  },
  {
    question: "Et si je me trompe en dictant, ou si je reprends une cote ?",
    answer:
      "Vous vous reprenez à voix haute, comme vous le feriez sur un carnet. C'est la dernière valeur qui est retenue, et vous relisez de toute façon avant de chiffrer : la dictée fait gagner la ressaisie, elle ne remplace pas votre relecture.",
  },
  {
    question: "Le devis est-il envoyé automatiquement au client ?",
    answer:
      "Non. Vous récupérez une base prête à chiffrer et à finaliser ; c'est vous qui décidez du prix et de l'envoi. Le suivi ne démarre qu'une fois le devis parti.",
  },
  {
    question: "Ça marche sur un chantier sans réseau ?",
    answer:
      "La dictée s'enregistre sur le téléphone et se traite dès que le réseau revient. Vous n'avez pas à attendre d'avoir du signal pour prendre vos cotes — ce qui, dans le bocage, est rarement acquis.",
  },
];

/**
 * Index par route, consommé uniquement par scripts/build-llms-full.ts pour
 * annexer à chaque page son bloc FAQ. Les pages, elles, importent leur
 * constante directement : une clé manquante ne doit jamais pouvoir rendre
 * une page sans sa FAQ.
 */
export const ROUTE_FAQ: Record<string, readonly FaqItem[]> = {
  "/sites-web": SITES_WEB_FAQ,
  "/sites-web/menuisier": MENUISIER_FAQ,
  "/sites-web/couvreur": COUVREUR_FAQ,
  "/sites-web/plombier": PLOMBIER_FAQ,
  "/sites-web/electricien": ELECTRICIEN_FAQ,
  "/sites-web/macon": MACON_FAQ,
  "/fiche-google": FICHE_GOOGLE_FAQ,
  "/fiche-google/creer-optimiser": CREER_OPTIMISER_FAQ,
  "/fiche-google/avis-google": AVIS_GOOGLE_FAQ,
  "/fiche-google/pack-local-maps": GOOGLE_MAPS_FAQ,
  "/fiche-google/photos-posts": PHOTOS_POSTS_FAQ,
  "/fiche-google/fiche-vs-site": FICHE_VS_SITE_FAQ,
  "/automatisations": SYSTEMES_FAQ,
  "/automatisations/relance-devis": RELANCE_DEVIS_FAQ,
  "/automatisations/tri-emails": TRI_EMAILS_FAQ,
  "/automatisations/devis-vocal": DEVIS_VOCAL_FAQ,
};
