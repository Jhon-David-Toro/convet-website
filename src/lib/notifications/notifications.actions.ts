"use server";

import { runAction } from "@/lib/api/api.guard";
import type { ActionResult } from "@/lib/api/api.types";
import { getNotificationsPage, markAllNotificationsRead, markNotificationRead } from "@/lib/api/notifications.api";
import { requireRole } from "@/lib/auth/auth.access";
import { ROLES } from "@/lib/auth/auth.contract";

import { ROLE_AREAS } from "./notifications.constants";
import type { NotificationArea, NotificationItem } from "./notifications.types";

/**
 * Marks one notification of the signed-in user as read. Any role can; the backend only touches the user's own notifications.
 *
 * @param id Id of the notification.
 * @returns Success, or a safe error.
 */
export async function markNotificationReadAction(id: string): Promise<ActionResult> {
  await requireRole([...ROLES]);
  return runAction(() => markNotificationRead(id));
}

/**
 * Marks every notification of the signed-in user as read.
 *
 * @returns Success, or a safe error.
 */
export async function markAllNotificationsReadAction(): Promise<ActionResult> {
  await requireRole([...ROLES]);
  return runAction(markAllNotificationsRead);
}

/**
 * Loads one more page of notifications for the "load older" button, filed under the categories of the user's area.
 *
 * @param page Page number, from 1.
 * @param area Shell showing the page; admins may also browse the staff area.
 * @returns The items of the page and whether older ones exist, or a safe error.
 */
export async function loadNotificationsPageAction(page: number, area?: NotificationArea): Promise<ActionResult<{ items: NotificationItem[]; hasMore: boolean }>> {
  const user = await requireRole([...ROLES]);
  if (!Number.isInteger(page) || page < 1) return { ok: false, kind: "validation", message: "Invalid page." };
  const permittedArea = user.role === "ADMIN" && area === "staff" ? "staff" : ROLE_AREAS[user.role];
  return runAction(async () => {
    const { items, hasMore } = await getNotificationsPage(page, permittedArea);
    return { items, hasMore };
  });
}
