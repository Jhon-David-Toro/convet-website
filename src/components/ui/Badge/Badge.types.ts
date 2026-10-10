import type { LucideIcon } from "lucide-react";
import type { ComponentPropsWithRef } from "react";

import type { IconTone } from "@/components/ui/Icon";

export type BadgeTone =
  | "neutral"
  | "brand"
  | "success"
  | "warning"
  | "error"
  | "info"
  | "accent"
  | "navy";

export type BadgeProps = ComponentPropsWithRef<"span"> & {
  tone?: BadgeTone;
  icon?: LucideIcon;
  iconTone?: IconTone;
};
