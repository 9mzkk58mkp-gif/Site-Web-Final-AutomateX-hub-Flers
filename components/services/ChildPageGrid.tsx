import ChildPageCard from "@/components/services/ChildPageCard";
import { StaggerGrid, StaggerItem } from "@/components/motion/StaggerGrid";

export default function ChildPageGrid({
  pages,
}: {
  pages: { href: string; title: string; description: string }[];
}) {
  return (
    <StaggerGrid className="mt-4 grid gap-4 sm:grid-cols-2">
      {pages.map((page) => (
        <StaggerItem key={page.href}>
          <ChildPageCard {...page} />
        </StaggerItem>
      ))}
    </StaggerGrid>
  );
}
