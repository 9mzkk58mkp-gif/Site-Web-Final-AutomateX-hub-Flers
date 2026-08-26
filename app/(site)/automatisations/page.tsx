import type { Metadata } from "next";
import Badge from "@/components/ui/Badge";
import AutomationIcon from "@/components/ui/AutomationIcon";
import ServicePageLayout from "@/components/services/ServicePageLayout";
import FeatureList from "@/components/services/FeatureList";
import ChildPageGrid from "@/components/services/ChildPageGrid";
import SectionHeading from "@/components/services/SectionHeading";

export const metadata: Metadata = {
  title: "Automatisation des devis et de la gestion administrative pour artisans",
  description:
    "Relance automatique de devis, tri des e-mails et devis à la voix pour artisans dans l'Orne. Des systèmes simples qui tournent en arrière-plan, sur devis.",
};

const INSTALLED = [
  "Relance automatique des devis envoyés sans réponse",
  "Tri des mails entrants avec réponses pré-rédigées",
  "Prise de devis à la voix, retranscrite automatiquement",
];

const CHILD_PAGES = [
  {
    href: "/automatisations/relance-devis",
    title: "Relance automatique de devis",
    description: "Un système suit vos devis sans réponse et relance au bon moment.",
  },
  {
    href: "/automatisations/tri-emails",
    title: "Tri automatique des e-mails",
    description: "Les demandes de devis mises en avant, des brouillons de réponse prêts.",
  },
  {
    href: "/automatisations/devis-vocal",
    title: "Devis à la voix",
    description: "Dictez les informations, le système structure le devis automatiquement.",
  },
];

export default function AutomatisationsPage() {
  return (
    <ServicePageLayout
      eyebrow={<Badge icon={<AutomationIcon />}>Automatisations</Badge>}
      h1="Automatisation des devis et de la gestion administrative pour artisans"
      intro="Le soir, après une journée de chantier, personne n'a envie de répondre aux mails un par un ou de relancer un devis resté sans réponse. Ce sont pourtant ces tâches qui font perdre des clients — pas par manque de compétence, mais par manque de temps."
      ctaText="Voyons ce qui vous ferait gagner du temps"
    >
      <div>
        <SectionHeading>Ce que j&apos;installe</SectionHeading>
        <div className="mt-4">
          <FeatureList items={INSTALLED} />
        </div>
        <p className="mt-6 text-sm text-text-secondary">
          Le principe : Des systèmes simples qui tournent en arrière-plan, sans que vous ayez à y
          penser. Le temps que vous perdez sur l&apos;administratif, on vous le rend.
        </p>
        <p className="mt-2 text-sm text-text-muted">
          Tarif : sur devis, selon les systèmes mis en place. TVA non applicable, art. 293 B du
          CGI.
        </p>
      </div>

      <div>
        <SectionHeading>Le détail par système</SectionHeading>
        <ChildPageGrid pages={CHILD_PAGES} />
      </div>
    </ServicePageLayout>
  );
}
