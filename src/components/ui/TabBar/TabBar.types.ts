import type { LucideIcon } from "lucide-react";
import type Link from "next/link";
import type { ComponentProps, ComponentPropsWithRef } from "react";

/** Props of the `TabBar` component. */
export type TabBarProps = ComponentPropsWithRef<"nav">;

/** Props of the `TabBarItem` component. */
export type TabBarItemProps = Omit<ComponentProps<typeof Link>, "children"> & {
  /** Icon component to draw. */
  icon: LucideIcon;
  /** Visible text. For icons it becomes the accessible name. */
  label: string;
  /** Current section: light blue pill, brand color and `aria-current="page"`. */
  active?: boolean;
};
