import type { LucideIcon } from "lucide-react";

export type QuickAccessItem = {
  id: string;
  href: string;
  icon: LucideIcon;
  title: string;
  description: string;
  hiddenOnMobile?: boolean;
};
