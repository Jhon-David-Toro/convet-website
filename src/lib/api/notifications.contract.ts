import { z } from "zod";

/** Types of `NotificationType` in `prisma/schema.prisma`. */
export const NOTIFICATION_TYPES = [
  "APPOINTMENT_CREATED",
  "APPOINTMENT_CONFIRMED",
  "APPOINTMENT_REJECTED",
  "APPOINTMENT_RESCHEDULED",
  "APPOINTMENT_CANCELLED",
  "APPOINTMENT_REMINDER",
  "APPOINTMENT_COMPLETED",
  "SYSTEM",
] as const;

export const notificationSchema = z.object({
  idNotification: z.string(),
  type: z.enum(NOTIFICATION_TYPES),
  title: z.string(),
  message: z.string(),
  isRead: z.boolean(),
  createdAt: z.string(),
});

/** Answer of `GET /notifications`: one page plus the total of unread ones. */
export const notificationPageSchema = z.object({
  data: z.array(notificationSchema),
  pagination: z.object({ page: z.number(), limit: z.number(), total: z.number(), totalPages: z.number() }),
  unreadCount: z.number(),
});

export type NotificationDto = z.infer<typeof notificationSchema>;

export type NotificationPageDto = z.infer<typeof notificationPageSchema>;

/** Notifications per page requested from the backend (it accepts 1 to 100). */
export const NOTIFICATIONS_PAGE_SIZE = 20;

export const NOTIFICATION_ENDPOINTS = {
  list: "/notifications",
  readAll: "/notifications/read-all",
  read: (idNotification: string) => `/notifications/${encodeURIComponent(idNotification)}/read`,
} as const;
