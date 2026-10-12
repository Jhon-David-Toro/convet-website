import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

export type ShellVariant = "staff" | "admin";

export type StaffShellProps = {
  children: ReactNode;
  variant?: ShellVariant;
};

export type StaffNavItem = {
  icon: LucideIcon;
  label: string;
  href: string;
  base: string;
  count?: number;
};

export type StaffNavGroup = {
  heading: string;
  items: StaffNavItem[];
};

export type StaffTopBarConfig = {
  title: string;
  subtitle?: string;
  backHref?: string;
};

export type ShellConfig = {
  homeHref: string;
  nav: StaffNavGroup[];
  user: { name: string; role: string };
  branch: string;
  titles: Record<string, StaffTopBarConfig>;
  exactTitles?: Record<string, StaffTopBarConfig>;
};

export type StaffPathProps = {
  pathname: string;
  config: ShellConfig;
};

export type StaffMenuProps = StaffPathProps & {
  open: boolean;
  onClose: () => void;
};

export type StaffMenuTriggerProps = {
  onMenu: () => void;
};

export type StaffTopBarStartProps = StaffPathProps & StaffMenuTriggerProps;

export type LeadingButtonProps = StaffMenuTriggerProps & {
  backHref?: string;
};

export type StaffTopBarEndProps = StaffPathProps & StaffMenuTriggerProps;
