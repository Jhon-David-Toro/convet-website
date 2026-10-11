import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

export type CustomerShellProps = {
  children: ReactNode;
};

export type TopBarConfig = {
  title: string;
  backHref?: string;
};

export type CustomerNavItem = {
  icon: LucideIcon;
  label: string;
  href: string;
};

export type CustomerPathProps = {
  pathname: string;
};
