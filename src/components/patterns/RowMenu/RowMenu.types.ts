import type { LucideIcon } from "lucide-react";

export type RowMenuItem = {
  label: string;
  icon: LucideIcon;
  tone?: "default" | "destructive";
} & ({ href: string; onSelect?: never } | { onSelect: () => void; href?: never });

export type RowMenuProps = {
  label: string;
  items: RowMenuItem[];
  className?: string;
};
