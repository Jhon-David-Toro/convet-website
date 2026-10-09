import type { LucideIcon } from "lucide-react";

import type { IconTone } from "@/components/ui/Icon";

/** One line of contact information: icon, main text and detail. */
export type ContactLineItem = {
  /** Stable id, used as React key. */
  id: string;
  /** Icon drawn before the text. */
  icon: LucideIcon;
  /** Color tone of the icon. */
  iconTone?: IconTone;
  /** Main text. */
  title: string;
  /** Secondary text under the main one. */
  detail: string;
  /** Shorter secondary text used below the desktop breakpoint. */
  detailShort?: string;
  /** Whether the line is left out on mobile. */
  hiddenOnMobile?: boolean;
};

/** Props of one contact line. */
export type ContactLineProps = {
  item: ContactLineItem;
};
