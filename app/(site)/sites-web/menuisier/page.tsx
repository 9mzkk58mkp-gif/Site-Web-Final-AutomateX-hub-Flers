import type { Metadata } from "next";
import ServicePageLayout from "@/components/services/ServicePageLayout";
import FeatureList from "@/components/services/FeatureList";
import SectionHeading from "@/components/services/SectionHeading";
import SchemaScript from "@/components/seo/SchemaScript";
import { getServiceSchema } from "@/lib/schema";

const URL = "/sites-web/menuisier";
const DESCRIPTION =
  "Site internet pour menuisier dans l'Orne : galerie de réalisations, matériaux et finitions mis en avant, section sur-mesure pour rassurer vos clients.";

export const metadata: Metadata = {
  title: "Site internet pour menuisier dans l'Orne",
  description: DESCRIPTION,
  alternates: { canonical: "/sites-web/menuisier" },
};

const POINTS = [
  "Galerie photo avant/après par type de projet (agencement, extérieur, escalier, fenêtres)",
  "Mise en avant des matériaux et finitions travaillés",
  "Page dédiée aux matériaux et essences si vous travaillez plusieurs types de bois",
  "Section \"sur-mesure\" qui rassure sur la capacité à répondre à des demandes spécifiques",
];

export default function MenuisierPage() {
  return (
    <>
      <SchemaScript
        schema={getServiceSchema({
          name: "Site internet pour menuisier dans l'Orne",
          description: DESCRIPTION,
          url: URL,
        })}
      />
      <ServicePageLayout
        backLink={{ href: "/sites-web", label: "Retour à Sites Web" }}
        h1="Site internet pour menuisier dans l'Orne"
        intro="Un menuisier vend un savoir-faire qu'on ne voit pas sur une simple liste de prestations. Vos clients veulent voir vos réalisations avant de vous contacter : une cuisine sur mesure, un escalier, une pose de fenêtres. Le site doit montrer le travail, pas juste le décrire."
        ctaText="Discutons de votre site"
      >
        <div>
          <SectionHeading>Qu&apos;est-ce qui compte pour un site de menuisier&nbsp;?</SectionHeading>
          <p className="mt-3 text-sm text-text-secondary">
            Montrer le travail fini avant tout : galerie de réalisations par type de projet, matériaux et finitions mis en avant, et une section sur-mesure. Un menuisier vend un savoir-faire qui ne se lit pas sur une liste de prestations.
          </p>
          <div className="mt-4">
            <FeatureList items={POINTS} />
          </div>
        </div>

        <p className="text-sm text-text-secondary">
          Ce que je connais du métier : CAP menuiserie, deux ans d&apos;apprentissage en pose de
          fenêtres. Je sais ce qu&apos;un client cherche à voir avant de vous appeler : la
          précision de la finition, pas juste &laquo; menuisier depuis 10 ans &raquo;.
        </p>
      </ServicePageLayout>
    </>
  );
}
