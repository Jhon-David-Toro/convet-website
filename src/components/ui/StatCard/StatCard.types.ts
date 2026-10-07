import type { LucideIcon } from "lucide-react";
import type { ComponentPropsWithRef } from "react";

/** Stat tone: `default`, `warning`, `critical`. */
export type StatTone = "default" | "warning" | "critical";

/** Props of the `StatCard` component. */
export type StatCardProps = ComponentPropsWithRef<"div"> & {
  /** Visible text. For icons it becomes the accessible name. */
  label: string;
  /** Current value. */
  value: string | number;
  /** Caption drawn over the illustration. */
  caption?: string;
  /** Icon component to draw. */
  icon: LucideIcon;
  /** `warning` and `critical` tint the icon and the footer; status never relies on color alone: the footer explains it. */
  tone?: StatTone;
};
