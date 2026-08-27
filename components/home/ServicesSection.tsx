import Link from "next/link";
import Badge from "@/components/ui/Badge";
import Card from "@/components/ui/Card";
import GoogleIcon from "@/components/ui/GoogleIcon";
import SiteIcon from "@/components/ui/SiteIcon";
import AutomationIcon from "@/components/ui/AutomationIcon";
import Reveal from "@/components/motion/Reveal";
import { StaggerGrid, StaggerItem } from "@/components/motion/StaggerGrid";

const SERVICES = [
  {
    badge: "Sites Web",
    title: "Un site qui fait qu'on vous choisit, vous.",
    description:
      "Un site vitrine rapide, propre, qui s'affiche bien sur mobile et montre vos réalisations. Pas un site générique — un site pensé pour votre métier.",
    href: "/sites-web",
    linkLabel: "Voir la création de sites web pour artisans",
    icon: <SiteIcon />,
  },
  {
    badge: "Fiche Google",
    title: "Le premier qu'on trouve, c'est le premier qu'on appelle.",
    description:
      "Votre fiche Google Business optimisée, à jour, qui vous sort dans le pack local quand un client cherche votre métier près de chez lui.",
    href: "/fiche-google",
    linkLabel: "Voir l'optimisation de fiche Google Business",
    icon: <GoogleIcon size={14} />,
  },
  {
    badge: "Automatisations",
    title: "Moins de bureau, plus de chantier.",
    description:
      "Des systèmes qui trient vos mails et relancent vos devis tout seuls. Le temps que vous perdez sur l'administratif, on vous le rend.",
    href: "/automatisations",
    linkLabel: "Voir la relance de devis et le tri des mails",
    icon: <AutomationIcon />,
  },
];

export default function ServicesSection() {
  return (
    <section className="mx-auto mt-28 max-w-6xl px-4">
      <Reveal>
        <h2 className="aurora-h2 text-center">Ce que j&apos;installe pour vous</h2>
      </Reveal>

      <StaggerGrid className="mt-10 grid gap-4 md:grid-cols-3">
        {SERVICES.map((service) => (
          <StaggerItem key={service.href} className="h-full">
            <Card className="flex h-full flex-col">
              <Badge icon={service.icon}>{service.badge}</Badge>
              <p className="mt-4 text-lg font-medium text-text-primary">{service.title}</p>
              <p className="mt-2 flex-1 text-sm text-text-secondary">{service.description}</p>
              <Link
                href={service.href}
                className="mt-6 inline-flex min-h-12 items-center text-sm font-medium text-emerald hover:underline"
              >
                {service.linkLabel} →
              </Link>
            </Card>
          </StaggerItem>
        ))}
      </StaggerGrid>
    </section>
  );
}
