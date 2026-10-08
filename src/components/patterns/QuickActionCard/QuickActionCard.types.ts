import type { LucideIcon } from "lucide-react";
import type Link from "next/link";
import type { ComponentProps } from "react";

/** Quick action tone: `default`, `primary`, `whatsapp`, `emergency`. */
export type QuickActionTone = "default" | "primary" | "whatsapp" | "emergency";

/** Props of the `QuickActionCard` component. */
export type QuickActionCardProps = Omit<ComponentProps<typeof Link>, "title" | "children"> & {
  /** Link destination. */
  href: string;
  /** Color tone. */
  tone?: QuickActionTone;
  /** Icon component to draw. */
  icon: LucideIcon;
  /** Title text. */
  title: string;
  /** Description text under the title. */
  description: string;
};
