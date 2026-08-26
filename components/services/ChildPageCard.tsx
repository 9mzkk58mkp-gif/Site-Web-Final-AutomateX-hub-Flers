import Link from "next/link";
import Card from "@/components/ui/Card";

export default function ChildPageCard({
  href,
  title,
  description,
}: {
  href: string;
  title: string;
  description: string;
}) {
  return (
    <Link href={href} className="block">
      <Card className="h-full transition-colors duration-200 hover:bg-white/[0.08]">
        <p className="text-base font-medium text-text-primary">{title}</p>
        <p className="mt-2 text-sm text-text-secondary">{description}</p>
      </Card>
    </Link>
  );
}
