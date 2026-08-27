/**
 * FAQ home — format GEO (questions autoportantes, citables telles quelles).
 * Source unique utilisée par FaqSection.tsx, le schema FAQPage, et llms.txt.
 */
export const HOME_FAQ = [
  {
    question: "Combien coûte un site internet pour un artisan dans l'Orne ?",
    answer:
      "Une landing page démarre à 1500€, sans abonnement caché. Le tarif dépend du nombre de pages et des automatisations ajoutées. Chaque devis est fait sur mesure après un échange direct.",
  },
  {
    question: "Combien de temps pour avoir mon site en ligne ?",
    answer:
      "En général une à deux semaines entre le premier échange et la mise en ligne, une fois les photos et les informations de l'entreprise reçues.",
  },
  {
    question: "Est-ce que vous garantissez la première position sur Google ?",
    answer:
      "Aucune agence sérieuse ne peut garantir une position, les algorithmes changent en permanence. Le travail porte sur une fiche Google complète, un site rapide, et un contenu qui correspond vraiment à votre métier et votre zone.",
  },
  {
    question: "Pourquoi passer par vous plutôt qu'une agence classique ?",
    answer:
      "Une seule personne gère votre projet du premier échange à la mise en ligne, sans intermédiaire. Les délais sont plus courts qu'en agence, et le prix ne comprend pas de frais de structure.",
  },
  {
    question: "Est-ce que je dois m'engager sur la durée ?",
    answer:
      "Non, aucun engagement de durée sur le site en lui-même. La gestion active de la fiche Google (posts, avis, photos) est un service mensuel optionnel, sans engagement non plus.",
  },
] as const;

/**
 * FAQ page locale /site-web-flers — même logique GEO que HOME_FAQ, adaptée à
 * l'intention "site web à Flers". Source unique : FaqAccordion + schema FAQPage.
 */
export const FLERS_FAQ = [
  {
    question: "Combien coûte un site web à Flers ?",
    answer:
      "Une landing page démarre à 1500€ et un site vitrine starter à partir de 590€, sans abonnement caché. Le tarif dépend du nombre de pages, du contenu à produire et des systèmes ajoutés. Chaque devis est établi après un échange direct. TVA non applicable, art. 293 B du CGI.",
  },
  {
    question: "Combien de temps pour avoir mon site en ligne à Flers ?",
    answer:
      "Comptez une à deux semaines entre le premier échange et la mise en ligne, une fois vos photos et les informations de l'entreprise reçues. Étant à Saint-Georges-des-Groseillers, à 5 à 10 minutes de Flers, les allers-retours de validation se font vite.",
  },
  {
    question: "Pourquoi passer par un prestataire local plutôt qu'une agence ?",
    answer:
      "Une seule personne gère votre projet du premier échange à la mise en ligne, sans intermédiaire ni chef de projet à relayer. Les délais sont plus courts, le prix ne comprend pas de frais de structure, et on peut se voir en face à face à Flers plutôt que d'échanger par tickets.",
  },
  {
    question: "Est-ce que je peux rencontrer le prestataire en face à face à Flers ?",
    answer:
      "Oui. Nolan Hermand est installé à Saint-Georges-des-Groseillers, commune limitrophe de Flers. Le rendez-vous se fait chez vous, sur votre lieu d'activité ou dans un lieu neutre à Flers, sans surcoût de déplacement dans le bassin flérien.",
  },
  {
    question: "Le référencement local Google est-il inclus ?",
    answer:
      "Oui. Chaque site est livré avec les bases du référencement local : structure adaptée à votre métier et à votre zone, pages optimisées pour Flers et l'agglomération, et mise en place ou vérification de la fiche Google Business Profile. Aucune position ne peut être garantie, mais le site part sur des fondations saines.",
  },
] as const;
