import { GROUP_ORDER, NOTIFICATIONS } from "./notifications.constants";
import type { NotificationArea, NotificationGroup, NotificationItem } from "./notifications.types";

export const FILTER_ALL = "all";

export const FILTER_UNREAD = "unread";

export const MAX_BADGE = 9;

/**
 * Notifications of an area, newest first.
 *
 * @param area Area of the app: customer, staff or admin.
 * @returns The notifications that area receives.
 */
export function notificationsFor(area: NotificationArea): NotificationItem[] {
  return NOTIFICATIONS.filter((item) => item.area === area);
}

/**
 * How many notifications have not been read.
 *
 * @param items Notifications to count.
 * @returns The number of unread ones.
 */
export function unreadCount(items: NotificationItem[]): number {
  return items.filter((item) => item.unread).length;
}

/**
 * Text of the badge on the bell: the count, capped at "9+".
 *
 * @param count Number of unread notifications.
 * @returns The count, or "9+" when there are more than nine.
 */
export function badgeLabel(count: number): string {
  return count > MAX_BADGE ? `${MAX_BADGE}+` : String(count);
}

/**
 * Notifications that pass a filter: all of them, only the unread ones, or one category.
 *
 * @param items Notifications to filter.
 * @param filter `all`, `unread` or the value of a category.
 * @returns The matching notifications, in the same order.
 */
export function filterNotifications(items: NotificationItem[], filter: string): NotificationItem[] {
  if (filter === FILTER_ALL) return items;
  if (filter === FILTER_UNREAD) return items.filter((item) => item.unread);
  return items.filter((item) => item.category === filter);
}

/**
 * How many notifications a category has.
 *
 * @param items Notifications to count.
 * @param category Value of the category.
 * @returns The number of notifications in it.
 */
export function categoryCount(items: NotificationItem[], category: string): number {
  return items.filter((item) => item.category === category).length;
}

/**
 * Notifications grouped by day, in the order the days go (today first), skipping the days that have none.
 *
 * @param items Notifications, newest first.
 * @returns One entry per day that has notifications.
 */
export function groupByDay(items: NotificationItem[]): { group: NotificationGroup; items: NotificationItem[] }[] {
  return GROUP_ORDER.map((group) => ({ group, items: items.filter((item) => item.group === group) })).filter((entry) => entry.items.length > 0);
}

/**
 * Marks one notification as read.
 *
 * @param items Notifications.
 * @param id Id of the one that was read.
 * @returns The notifications with that one read.
 */
export function markRead(items: NotificationItem[], id: string): NotificationItem[] {
  return items.map((item) => (item.id === id ? { ...item, unread: false } : item));
}

/**
 * Marks every notification as read.
 *
 * @param items Notifications.
 * @returns The notifications, all read.
 */
export function markAllRead(items: NotificationItem[]): NotificationItem[] {
  return items.map((item) => ({ ...item, unread: false }));
}
