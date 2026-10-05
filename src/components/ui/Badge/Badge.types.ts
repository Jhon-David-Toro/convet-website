import type { LucideIcon } from "lucide-react";
import type { ComponentPropsWithRef } from "react";

import type { IconTone } from "@/components/ui/Icon";

/** Badge tone: `neutral`, `brand`, `success`, `warning`, `error`, `info`, `accent`, `navy`. */
export type BadgeTone =
  | "neutral"
  | "brand"
  | "success"
  | "warning"
  | "error"
  | "info"
  | "accent"
  | "navy";

/** Props of the `Badge` component. */
export type BadgeProps = ComponentPropsWithRef<"span"> & {
  /** Color tone. */
  tone?: BadgeTone;
  /** Status must never be conveyed by color alone: pair it with text (and optionally an icon). */
  icon?: LucideIcon;
  /** Icon color when it differs from the label (e.g. the navy check of success states in Figma). */
  iconTone?: IconTone;
};
