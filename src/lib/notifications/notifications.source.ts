import "server-only";

import type { NotificationsSource } from "@/components/sections/NotificationCenter/NotificationCenter.types";
import { loadData } from "@/lib/api/api.guard";
import { getNotificationsPage } from "@/lib/api/notifications.api";

import { loadNotificationsPageAction, markAllNotificationsReadAction, markNotificationReadAction } from "./notifications.actions";
import type { NotificationArea } from "./notifications.types";

/**
 * Notifications of the signed-in user for the bell and the notifications page of an area: the first page from the backend and the
 * Server Actions that read and page them. If the backend fails the area still works, with an empty list.
 *
 * @param area Area of the shell.
 * @returns What the notifications provider needs.
 */
export async function loadNotificationsSource(area: NotificationArea): Promise<NotificationsSource> {
  const { data } = await loadData(() => getNotificationsPage(1, area));
  return {
    items: data?.items ?? [],
    unreadCount: data?.unreadCount ?? 0,
    hasOlder: data?.hasMore ?? false,
    actions: { markRead: markNotificationReadAction, markAllRead: markAllNotificationsReadAction, loadPage: loadNotificationsPageAction },
  };
}
