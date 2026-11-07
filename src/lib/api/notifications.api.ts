import "server-only";

import { apiRequest } from "./api.client";
import { NOTIFICATION_ENDPOINTS, NOTIFICATIONS_PAGE_SIZE, notificationPageSchema } from "./notifications.contract";
import { toNotificationPage } from "./notifications.mappers";

/**
 * One page of the notifications of the signed-in user, newest first.
 *
 * @param page Page number, starting at 1.
 * @returns The items of the page and whether older ones exist.
 * @throws {ApiError} When the backend fails or answers something unexpected.
 */
export async function getNotificationsPage(page = 1) {
  const answer = await apiRequest(NOTIFICATION_ENDPOINTS.list, { query: { page, limit: NOTIFICATIONS_PAGE_SIZE }, schema: notificationPageSchema });
  return toNotificationPage(answer);
}

/**
 * Marks one notification as read.
 *
 * @param idNotification Id of the notification.
 * @throws {ApiError} When the backend fails or the notification is not the user's.
 */
export async function markNotificationRead(idNotification: string): Promise<void> {
  await apiRequest(NOTIFICATION_ENDPOINTS.read(idNotification), { method: "PATCH" });
}

/**
 * Marks every notification of the signed-in user as read.
 *
 * @throws {ApiError} When the backend fails.
 */
export async function markAllNotificationsRead(): Promise<void> {
  await apiRequest(NOTIFICATION_ENDPOINTS.readAll, { method: "PATCH" });
}
