import type { LucideIcon } from "lucide-react";

/** One shortcut of the quick access row. */
export type QuickAccessItem = {
  /** Stable id, used as React key. */
  id: string;
  /** Page the shortcut leads to. */
  href: string;
  /** Icon drawn in the circle. */
  icon: LucideIcon;
  /** Name of the shortcut. */
  title: string;
  /** What the person finds there. */
  description: string;
  /** Whether the shortcut is left out on mobile. */
  hiddenOnMobile?: boolean;
};
