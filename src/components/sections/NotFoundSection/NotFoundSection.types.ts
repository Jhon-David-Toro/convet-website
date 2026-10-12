import type { LucideIcon } from "lucide-react";

import type { QuickActionTone } from "@/components/patterns/QuickActionCard";

export type PopularPage = {
  href: string;
  icon: LucideIcon;
  tone: QuickActionTone;
  title: string;
  description: string;
};
