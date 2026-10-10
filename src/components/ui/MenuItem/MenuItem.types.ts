import type { LucideIcon } from "lucide-react";
import type { ComponentPropsWithRef } from "react";

export type MenuItemProps = ComponentPropsWithRef<"div"> & {
  icon?: LucideIcon;
  selected?: boolean;
  tone?: "default" | "destructive";
};
