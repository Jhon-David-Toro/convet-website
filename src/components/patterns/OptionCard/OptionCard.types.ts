import type { LucideIcon } from "lucide-react";
import type { ComponentPropsWithRef } from "react";

export type OptionCardProps = Omit<ComponentPropsWithRef<"input">, "type" | "children" | "title"> & {
  "data-state"?: "hover";
  name: string;
  icon: LucideIcon;
  title: string;
  subtitle?: string;
  meta?: string;
};

export type OptionTextProps = Pick<OptionCardProps, "title" | "subtitle">;
