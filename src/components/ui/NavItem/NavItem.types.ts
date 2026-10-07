import type { LucideIcon } from "lucide-react";
import type Link from "next/link";
import type { ComponentProps } from "react";

/** Props of the `NavItem` component. */
export type NavItemProps = Omit<ComponentProps<typeof Link>, "children"> & {
  /** Icon component to draw. */
  icon?: LucideIcon;
  /** Visible text. For icons it becomes the accessible name. */
  label: string;
  /** Current page: light blue fill, bold text and `aria-current="page"`. */
  active?: boolean;
  /** Optional counter (e.g. pending items). */
  count?: number | string;
};
