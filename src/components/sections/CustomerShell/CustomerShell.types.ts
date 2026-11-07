import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

import type { NotificationsSource } from "@/components/sections/NotificationCenter/NotificationCenter.types";

export type CustomerShellProps = {
  children: ReactNode;
  /** Signed-in customer shown in the sidebar and the greeting. */
  user: { name: string; role: string; firstName: string };
  /** Notifications of the customer from the backend; without it the sample data is shown. */
  notifications?: NotificationsSource;
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

export type CustomerTopBarProps = CustomerPathProps & {
  firstName: string;
};

export type CustomerSidebarProps = CustomerPathProps & {
  user: { name: string; role: string };
};
