import type { LucideIcon } from "lucide-react";
import type { ComponentPropsWithRef } from "react";

/** Props of the `MenuItem` component. */
export type MenuItemProps = ComponentPropsWithRef<"div"> & {
  /** Icon component to draw. */
  icon?: LucideIcon;
  /** Highlights the item and shows the check. The consumer defines the role (`option`, `menuitem`…) and `aria-selected`. */
  selected?: boolean;
  /** Color tone. */
  tone?: "default" | "destructive";
};
