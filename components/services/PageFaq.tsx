import FaqAccordion from "@/components/services/FaqAccordion";
import SectionHeading from "@/components/services/SectionHeading";
import SchemaScript from "@/components/seo/SchemaScript";
import { getFaqSchema } from "@/lib/schema";
import type { FaqItem } from "@/lib/faq";

/**
 * Bloc FAQ de fin de page de service : le rendu visible et le schema FAQPage
 * sont produits à partir du même tableau, dans le même composant. Impossible,
 * par construction, de structurer une réponse qui ne serait pas affichée —
 * c'est exactement ce que Google sanctionne sur les FAQPage.
 *
 * Le composant reste serveur ; seul l'accordéon (état d'ouverture) est client.
 */
export default function PageFaq({
  items,
  heading = "Les questions qu'on me pose",
}: {
  items: readonly FaqItem[];
  heading?: string;
}) {
  return (
    <section>
      <SchemaScript schema={getFaqSchema([...items])} />
      <SectionHeading>{heading}</SectionHeading>
      <FaqAccordion items={items} />
    </section>
  );
}
