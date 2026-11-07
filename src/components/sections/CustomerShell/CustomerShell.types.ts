import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

import type { NotificationsSource } from "@/components/sections/NotificationCenter/NotificationCenter.types";

export type CustomerShellProps = {
  children: ReactNode;
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
