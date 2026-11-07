import type { ComponentPropsWithRef } from "react";

import type { NavItemProps } from "@/components/ui/NavItem";

export type SidebarGroup = {
  heading?: string;
  items: NavItemProps[];
};

export type SidebarProps = Omit<ComponentPropsWithRef<"aside">, "children"> & {
  groups: SidebarGroup[];
  branch?: string;
  onBranchClick?: () => void;
  user: { name: string; role: string };
  signOutHref: string;
  /** Signs the user out. When given, the control is a button (signing out changes state, so it must not be a plain link). */
  onSignOut?: () => void;
  homeHref?: string;
};

export type SidebarLogoProps = Pick<SidebarProps, "homeHref">;

export type SidebarBranchProps = {
  branch: string;
  onClick?: () => void;
};

export type SidebarNavProps = Pick<SidebarProps, "groups">;

export type SidebarGroupViewProps = {
  group: SidebarGroup;
};

export type SidebarUserProps = Pick<SidebarProps, "user" | "signOutHref" | "onSignOut">;
