import type { ReactNode } from "react";

export default function Badge({
  children,
  icon,
}: {
  children: ReactNode;
  icon?: ReactNode;
}) {
  return (
    <span className="glass-pill inline-flex items-center gap-2 rounded-full px-4 py-1.5 font-mono text-[11px] uppercase tracking-wide text-text-secondary-alt">
      {icon}
      {children}
    </span>
  );
}
