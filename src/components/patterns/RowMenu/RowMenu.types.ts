import type { LucideIcon } from "lucide-react";

export type RowMenuItem = {
  label: string;
  icon: LucideIcon;
  href: string;
  tone?: "default" | "destructive";
};

export type RowMenuProps = {
  label: string;
  items: RowMenuItem[];
  className?: string;
};
