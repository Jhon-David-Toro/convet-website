import type { LucideIcon } from "lucide-react";
import type Link from "next/link";
import type { ComponentProps } from "react";

export type QuickActionTone = "default" | "primary" | "whatsapp" | "emergency";

export type QuickActionCardProps = Omit<ComponentProps<typeof Link>, "title" | "children"> & {
  href: string;
  tone?: QuickActionTone;
  icon: LucideIcon;
  title: string;
  description: string;
};
