import Card from "@/components/ui/Card";
import Reveal from "@/components/motion/Reveal";
import { StaggerGrid, StaggerItem } from "@/components/motion/StaggerGrid";

const PROBLEMS = [
  {
    text: 'Un particulier cherche "couvreur près de moi" → il tombe sur votre concurrent, pas sur vous',
  },
  {
    text: "Il ouvre votre site sur son téléphone → ça rame, ça casse, il repart",
  },
  {
    text: "Le soir, entre deux chantiers, vous répondez aux devis à la main",
  },
];

function ProblemDot() {
  return (
    <span
      aria-hidden="true"
      className="mb-4 block h-2.5 w-2.5 rounded-full bg-emerald"
      style={{ filter: "drop-shadow(0 0 6px rgba(74,222,154,0.6))" }}
    />
  );
}

export default function ProblemSection() {
  return (
    <section className="mx-auto mt-20 max-w-6xl px-4">
      <Reveal>
        <h2 className="aurora-h2 text-center">
          Le problème, il n&apos;est pas dans votre travail
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-center text-base text-text-secondary">
          Vous savez faire votre métier. Le problème, c&apos;est qu&apos;on ne vous trouve pas.
        </p>
      </Reveal>

      <StaggerGrid className="mt-10 grid gap-4 md:grid-cols-3">
        {PROBLEMS.map((problem) => (
          <StaggerItem key={problem.text}>
            <Card>
              <ProblemDot />
              <p className="text-sm text-text-secondary">{problem.text}</p>
            </Card>
          </StaggerItem>
        ))}
      </StaggerGrid>

      <p className="mt-8 text-center text-sm text-text-muted">
        Pas de théorie ici. Trois problèmes concrets, trois solutions concrètes.
      </p>
    </section>
  );
}
