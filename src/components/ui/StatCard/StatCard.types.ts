import type { LucideIcon } from "lucide-react";
import type { ComponentPropsWithRef } from "react";

export type StatTone = "default" | "warning" | "critical";

export type StatCardProps = ComponentPropsWithRef<"div"> & {
  label: string;
  value: string | number;
  caption?: string;
  icon: LucideIcon;
  tone?: StatTone;
};
