import type { NotificationArea, NotificationGroup, NotificationItem, NotificationKind } from "@/lib/notifications/notifications.types";

import type { NotificationDto, NotificationPageDto } from "./notifications.contract";

/** Time zone of the clinic: days and hours are shown as the clinic's customers live them. */
const CLINIC_TIME_ZONE = "America/Aruba";

const MS_PER_DAY = 86_400_000;

type TypeView = { kind: NotificationKind; category: string };

/** Categories of the staff and admin areas for the types whose customer category those areas do not have. */
const AREA_CATEGORIES: Record<Exclude<NotificationArea, "customer">, Partial<Record<NotificationDto["type"], string>>> = {
  staff: { APPOINTMENT_REMINDER: "schedule", APPOINTMENT_COMPLETED: "patients", SYSTEM: "schedule" },
  admin: { APPOINTMENT_REMINDER: "appointments", APPOINTMENT_COMPLETED: "appointments", SYSTEM: "team" },
};

const TYPE_VIEWS: Record<NotificationDto["type"], TypeView> = {
  APPOINTMENT_CREATED: { kind: "request", category: "appointments" },
  APPOINTMENT_CONFIRMED: { kind: "confirmed", category: "appointments" },
  APPOINTMENT_REJECTED: { kind: "cancelled", category: "appointments" },
  APPOINTMENT_RESCHEDULED: { kind: "rescheduled", category: "appointments" },
  APPOINTMENT_CANCELLED: { kind: "cancelled", category: "appointments" },
  APPOINTMENT_REMINDER: { kind: "reminder", category: "reminders" },
  APPOINTMENT_COMPLETED: { kind: "record", category: "pet-health" },
  SYSTEM: { kind: "record", category: "reminders" },
};

/**
 * Calendar day (`YYYY-MM-DD`) of a moment in the clinic's time zone.
 *
 * @param date Moment to place.
 * @returns The day as text.
 */
function clinicDay(date: Date): string {
  return new Intl.DateTimeFormat("en-CA", { timeZone: CLINIC_TIME_ZONE }).format(date);
}

/**
 * Whole days between the clinic day of a moment and the clinic day of now.
 *
 * @param date Moment to place.
 * @param now Current moment.
 * @returns 0 for today, 1 for yesterday and so on.
 */
function daysAgo(date: Date, now: Date): number {
  return Math.round((Date.parse(clinicDay(now)) - Date.parse(clinicDay(date))) / MS_PER_DAY);
}

/**
 * Day group a notification belongs to.
 *
 * @param date When it arrived.
 * @param now Current moment.
 * @returns Today, yesterday or earlier.
 */
export function groupOf(date: Date, now: Date): NotificationGroup {
  const days = daysAgo(date, now);
  if (days <= 0) return "today";
  return days === 1 ? "yesterday" : "earlier";
}

/**
 * Short label of when a notification arrived: the hour today, "Yesterday · hour", or the date and hour.
 *
 * @param date When it arrived.
 * @param now Current moment.
 * @returns The label, e.g. "9:12 AM" or "Oct 8 · 9:12 AM".
 */
export function whenLabel(date: Date, now: Date): string {
  const time = new Intl.DateTimeFormat("en-US", { timeZone: CLINIC_TIME_ZONE, hour: "numeric", minute: "2-digit" }).format(date);
  const group = groupOf(date, now);
  if (group === "today") return time;
  if (group === "yesterday") return `Yesterday · ${time}`;
  const day = new Intl.DateTimeFormat("en-US", { timeZone: CLINIC_TIME_ZONE, month: "short", day: "numeric" }).format(date);
  return `${day} · ${time}`;
}

/**
 * Turns a notification of the backend into the item the notification center shows.
 *
 * @param dto Notification as the backend sends it.
 * @param now Current moment, used to group it by day.
 * @param area Area that shows it; the staff and admin areas file some types under their own categories.
 * @returns The item for the area.
 */
export function toNotificationItem(dto: NotificationDto, now: Date = new Date(), area: NotificationArea = "customer"): NotificationItem {
  const created = new Date(dto.createdAt);
  const { kind, category } = TYPE_VIEWS[dto.type];
  return {
    id: dto.idNotification,
    area,
    category: area === "customer" ? category : (AREA_CATEGORIES[area][dto.type] ?? category),
    kind,
    title: dto.title,
    text: dto.message,
    when: whenLabel(created, now),
    group: groupOf(created, now),
    unread: !dto.isRead,
  };
}

/**
 * Turns a page of the backend into items and whether more pages follow.
 *
 * @param page Page as the backend sends it.
 * @param now Current moment.
 * @param area Area that shows the items.
 * @returns The items of the page, the page number and whether older ones exist.
 */
export function toNotificationPage(page: NotificationPageDto, now: Date = new Date(), area: NotificationArea = "customer") {
  return {
    items: page.data.map((dto) => toNotificationItem(dto, now, area)),
    page: page.pagination.page,
    unreadCount: page.unreadCount,
    hasMore: page.pagination.page < page.pagination.totalPages,
  };
}
