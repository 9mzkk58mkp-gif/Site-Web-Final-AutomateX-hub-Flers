import type { Metadata } from "next";
import Button from "@/components/ui/Button";
import PhoneIcon from "@/components/ui/PhoneIcon";
import SectionHeading from "@/components/services/SectionHeading";
import Reveal from "@/components/motion/Reveal";
import { StaggerGrid, StaggerItem } from "@/components/motion/StaggerGrid";
import { NAP, OTHER_AREAS, PRIORITY_AREAS, TEL_HREF } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Zones d'intervention dans l'Orne",
  description:
    "Installé à Saint-Georges-des-Groseillers, j'interviens dans tout l'Orne avec une priorité sur le bassin de Flers, et à distance partout en France.",
};

export default function ZonesInterventionPage() {
  return (
    <article className="mx-auto max-w-3xl px-4 pt-16 pb-24">
      <Reveal>
        <h1 className="aurora-h1">Zones d&apos;intervention dans l&apos;Orne</h1>

        <p className="mt-6 text-base text-text-secondary">
          Installé à Saint-Georges-des-Groseillers, j&apos;interviens dans tout le département de
          l&apos;Orne, avec une priorité sur le bassin de Flers. Pour les rendez-vous en visio ou
          les projets sans besoin de rencontre physique, je travaille aussi à distance partout en
          France.
        </p>
      </Reveal>

      <div className="mt-10">
        <SectionHeading>Secteurs prioritaires</SectionHeading>
        <StaggerGrid className="mt-4 flex flex-wrap gap-3">
          {PRIORITY_AREAS.map((area) => (
            <StaggerItem key={area}>
              <span className="glass-pill block rounded-full px-4 py-1.5 text-sm text-text-primary">
                {area}
              </span>
            </StaggerItem>
          ))}
        </StaggerGrid>
      </div>

      <Reveal className="mt-10">
        <SectionHeading>Le reste de l&apos;Orne</SectionHeading>
        <p className="mt-3 text-sm text-text-secondary">
          {OTHER_AREAS.join(", ")}, et toutes les communes du département — sur rendez-vous.
        </p>
      </Reveal>

      <Reveal className="mt-10">
        <SectionHeading>Pourquoi ça compte de se déplacer</SectionHeading>
        <p className="mt-3 text-sm text-text-secondary">
          Un site ou une fiche Google, ça se construit mieux en face à face qu&apos;au téléphone.
          Je préfère comprendre votre activité sur place plutôt que deviner depuis un formulaire.
        </p>
      </Reveal>

      <Reveal className="mt-16 flex justify-center">
        <Button href={TEL_HREF} icon={<PhoneIcon />}>
          {NAP.phoneDisplay} — Vérifions si je peux me déplacer chez vous
        </Button>
      </Reveal>
    </article>
  );
}
