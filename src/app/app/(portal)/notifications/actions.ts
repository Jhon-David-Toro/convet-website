"use server";

import { runAction } from "@/lib/api/api.guard";
import type { ActionResult } from "@/lib/api/api.types";
import { getNotificationsPage, markAllNotificationsRead, markNotificationRead } from "@/lib/api/notifications.api";
import { requireRole } from "@/lib/auth/auth.access";
import type { NotificationItem } from "@/lib/notifications/notifications.types";

/**
 * Marks one notification as read.
 *
 * @param id Id of the notification.
 * @returns Success or a safe error.
 */
export async function markNotificationReadAction(id: string): Promise<ActionResult> {
  await requireRole(["CUSTOMER"]);
  return runAction(() => markNotificationRead(id));
}

/**
 * Marks every notification of the customer as read.
 *
 * @returns Success or a safe error.
 */
export async function markAllNotificationsReadAction(): Promise<ActionResult> {
  await requireRole(["CUSTOMER"]);
  return runAction(markAllNotificationsRead);
}

/**
 * Loads one page of older notifications.
 *
 * @param page Page number, starting at 1.
 * @returns The items of that page and whether more follow, or a safe error.
 */
export async function loadNotificationsPageAction(page: number): Promise<ActionResult<{ items: NotificationItem[]; hasMore: boolean }>> {
  await requireRole(["CUSTOMER"]);
  if (!Number.isInteger(page) || page < 1) return { ok: false, kind: "validation", message: "Invalid page." };
  return runAction(async () => {
    const { items, hasMore } = await getNotificationsPage(page);
    return { items, hasMore };
  });
}
