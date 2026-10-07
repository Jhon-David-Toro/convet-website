import type { ComponentPropsWithRef } from "react";

import type { NavItemProps } from "@/components/ui/NavItem";

/** A titled group of sidebar navigation items. */
export type SidebarGroup = {
  /** Group title (e.g. "Main", "Account"). */
  heading?: string;
  /** Items to render. */
  items: NavItemProps[];
};

/** Props of the `Sidebar` component. */
export type SidebarProps = Omit<ComponentPropsWithRef<"aside">, "children"> & {
  /** Groups of navigation items. */
  groups: SidebarGroup[];
  /** Active branch. The selector is only shown when there is more than one branch. */
  branch?: string;
  /** Called when the user clicks the branch selector. */
  onBranchClick?: () => void;
  /** Signed-in user: name and role. */
  user: { name: string; role: string };
  /** Link that signs the user out. */
  signOutHref: string;
  /** Link of the logo; defaults to `/`. */
  homeHref?: string;
};

/** Props of the home link with the logo. */
export type SidebarLogoProps = Pick<SidebarProps, "homeHref">;

/** Props of the branch selector button. */
export type SidebarBranchProps = {
  /** Name of the active branch. */
  branch: string;
  /** Called when the element is clicked. */
  onClick?: () => void;
};

/** Props of the navigation (all groups). */
export type SidebarNavProps = Pick<SidebarProps, "groups">;

/** Props of one navigation group. */
export type SidebarGroupViewProps = {
  /** Group of navigation items with its heading. */
  group: SidebarGroup;
};

/** Props of the signed-in user row. */
export type SidebarUserProps = Pick<SidebarProps, "user" | "signOutHref">;
