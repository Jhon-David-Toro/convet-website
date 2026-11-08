import { useRef, useState } from "react";

import { markAllRead, markRead, notificationsFor, olderFor, unreadCount } from "@/lib/notifications/notifications.utils";
import type { NotificationArea, NotificationItem } from "@/lib/notifications/notifications.types";

import type { NotificationState, NotificationsSource } from "../NotificationCenter.types";

/**
 * Puts back as unread the notifications whose "read" could not be saved.
 *
 * @param items Current notifications.
 * @param ids Ids that must be unread again.
 * @returns The notifications with those ids unread.
 */
function restoreUnread(items: NotificationItem[], ids: Set<string>): NotificationItem[] {
  return items.map((item) => (ids.has(item.id) ? { ...item, unread: true } : item));
}

/**
 * Adds a page of notifications, skipping the ones already loaded.
 *
 * @param items Notifications already loaded.
 * @param page Notifications of the next page.
 * @returns All of them, without repeats.
 */
function appendPage(items: NotificationItem[], page: NotificationItem[]): NotificationItem[] {
  const known = new Set(items.map((item) => item.id));
  return [...items, ...page.filter((item) => !known.has(item.id))];
}

/**
 * State of the notifications of an area. Reading is optimistic: the notification looks read at once and goes back to unread
 * if the backend refuses. Without a `source` it works on the sample data of the design, and nothing is saved.
 *
 * @param area Area of the app: customer, staff or admin.
 * @param source Notifications and actions of the backend, when there are any.
 * @returns The notifications and the functions that read or load them.
 */
export function useNotificationState(area: NotificationArea, source?: NotificationsSource): NotificationState {
  const [items, setItems] = useState(() => source?.items ?? notificationsFor(area));
  const [totalUnread, setTotalUnread] = useState(() => source?.unreadCount ?? unreadCount(source?.items ?? notificationsFor(area)));
  const [hasOlder, setHasOlder] = useState(() => source?.hasOlder ?? olderFor(area).length > 0);
  const loadedPage = useRef(1);

  /**
   * Marks one notification as read.
   *
   * @param id Id of the notification.
   */
  async function read(id: string) {
    const wasUnread = items.some((item) => item.id === id && item.unread);
    if (!wasUnread) return;
    setItems((current) => markRead(current, id));
    setTotalUnread((current) => Math.max(0, current - 1));
    const result = await source?.actions.markRead(id);
    if (result && !result.ok) {
      setItems((current) => restoreUnread(current, new Set([id])));
      setTotalUnread((current) => current + 1);
    }
  }

  /** Marks every notification as read. */
  async function readAll() {
    const pending = new Set(items.filter((item) => item.unread).map((item) => item.id));
    const previousTotal = totalUnread;
    setItems(markAllRead);
    setTotalUnread(0);
    const result = await source?.actions.markAllRead();
    if (result && !result.ok) {
      setItems((current) => restoreUnread(current, pending));
      setTotalUnread(previousTotal);
    }
  }

  /** Loads the next page of older notifications; on a failure the button stays so the user can try again. */
  async function loadOlder() {
    if (!source) {
      setItems((current) => [...current, ...olderFor(area)]);
      setHasOlder(false);
      return;
    }
    const result = await source.actions.loadPage(loadedPage.current + 1, area);
    if (!result.ok) return;
    loadedPage.current += 1;
    setItems((current) => appendPage(current, result.data.items));
    setHasOlder(result.data.hasMore);
  }

  return { items, unread: totalUnread, markRead: read, markAllRead: readAll, hasOlder, loadOlder };
}
