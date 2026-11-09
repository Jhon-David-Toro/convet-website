import type { Metadata } from "next";

import { CustomerShell } from "@/components/sections/CustomerShell";
import { requireRole } from "@/lib/auth/auth.access";
import { loadNotificationsSource } from "@/lib/notifications/notifications.source";
import type { CustomerLayoutProps } from "./layout.types";

export const metadata: Metadata = {
  title: "My account · CONVET",
};

/**
 * Layout of the signed-in customer area: every page under `/app` shares the sidebar, the top bar and the tab bar.
 * It loads the first page of notifications for the bell; if that fails the area still works with an empty list.
 *
 * @param props Props of the layout, see {@link CustomerLayoutProps}.
 * @param props.children Page of the customer area.
 * @returns The rendered element.
 */
export default async function CustomerLayout({ children }: CustomerLayoutProps) {
  const user = await requireRole(["CUSTOMER"]);
  const notifications = await loadNotificationsSource("customer");

  return (
    <CustomerShell
      user={{ name: `${user.firstName} ${user.lastName}`, role: "Client", firstName: user.firstName }}
      notifications={notifications}
    >
      {children}
    </CustomerShell>
  );
}
