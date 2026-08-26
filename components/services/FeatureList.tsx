import CheckIcon from "@/components/ui/CheckIcon";

export default function FeatureList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-3">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-3 text-sm text-text-secondary">
          <CheckIcon size={18} />
          <span className="pt-0.5">{item}</span>
        </li>
      ))}
    </ul>
  );
}
