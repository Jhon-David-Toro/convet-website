import type { Metadata } from "next";

import { CustomerShell } from "@/components/sections/CustomerShell";
import { loadData } from "@/lib/api/api.guard";
import { getNotificationsPage } from "@/lib/api/notifications.api";

import { loadNotificationsPageAction, markAllNotificationsReadAction, markNotificationReadAction } from "./notifications/actions";
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
  const { data } = await loadData(() => getNotificationsPage(1));

  return (
    <CustomerShell
      notifications={{
        items: data?.items ?? [],
        hasOlder: data?.hasMore ?? false,
        actions: { markRead: markNotificationReadAction, markAllRead: markAllNotificationsReadAction, loadPage: loadNotificationsPageAction },
      }}
    >
      {children}
    </CustomerShell>
  );
}
