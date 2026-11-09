import { describe, expect, it } from "vitest";

import { notificationPageSchema } from "./notifications.contract";
import { groupOf, toNotificationItem, toNotificationPage, whenLabel } from "./notifications.mappers";

/** 2026-10-09 14:00 in Aruba (UTC-4). */
const NOW = new Date("2026-10-09T18:00:00Z");

const DTO = { idNotification: "n1", type: "APPOINTMENT_CONFIRMED", title: "Appointment confirmed", message: "Luna · Fri, Oct 9", isRead: false, createdAt: "2026-10-09T13:12:00Z" } as const;

describe("groupOf and whenLabel", () => {
  it("groups by the clinic's calendar day, not by UTC", () => {
    expect(groupOf(new Date("2026-10-10T01:00:00Z"), NOW)).toBe("today");
    expect(groupOf(new Date("2026-10-08T05:00:00Z"), NOW)).toBe("yesterday");
    expect(groupOf(new Date("2026-10-01T15:00:00Z"), NOW)).toBe("earlier");
  });

  it("labels the hour, yesterday and older dates", () => {
    expect(whenLabel(new Date("2026-10-09T13:12:00Z"), NOW)).toBe("9:12 AM");
    expect(whenLabel(new Date("2026-10-08T14:00:00Z"), NOW)).toBe("Yesterday · 10:00 AM");
    expect(whenLabel(new Date("2026-10-01T14:00:00Z"), NOW)).toBe("Oct 1 · 10:00 AM");
  });
});

describe("toNotificationItem", () => {
  it("maps the type to a kind and category and isRead to unread", () => {
    expect(toNotificationItem(DTO, NOW)).toMatchObject({ id: "n1", area: "customer", kind: "confirmed", category: "appointments", title: "Appointment confirmed", text: "Luna · Fri, Oct 9", group: "today", unread: true });
    expect(toNotificationItem({ ...DTO, type: "APPOINTMENT_REMINDER", isRead: true }, NOW)).toMatchObject({ kind: "reminder", category: "reminders", unread: false });
  });
});

describe("notification page", () => {
  it("validates the envelope and tells whether more pages follow", () => {
    const body = { data: [DTO], pagination: { page: 1, limit: 20, total: 25, totalPages: 2 }, unreadCount: 1 };
    const page = toNotificationPage(notificationPageSchema.parse(body), NOW);
    expect(page).toMatchObject({ page: 1, hasMore: true, unreadCount: 1 });
    expect(page.items).toHaveLength(1);
    expect(toNotificationPage(notificationPageSchema.parse({ ...body, pagination: { page: 2, limit: 20, total: 25, totalPages: 2 } }), NOW).hasMore).toBe(false);
  });

  it("rejects an unknown notification type", () => {
    expect(notificationPageSchema.safeParse({ data: [{ ...DTO, type: "OTHER" }], pagination: { page: 1, limit: 1, total: 1, totalPages: 1 }, unreadCount: 0 }).success).toBe(false);
  });
});

describe("toNotificationItem by area", () => {
  const dto = { idNotification: "n1", type: "APPOINTMENT_COMPLETED" as const, title: "Visit done", message: "Luna", isRead: false, createdAt: "2026-11-08T12:00:00.000Z" };

  it("files the types under the categories of each area", () => {
    const now = new Date("2026-11-08T15:00:00.000Z");
    expect(toNotificationItem(dto, now)).toMatchObject({ area: "customer", category: "pet-health" });
    expect(toNotificationItem(dto, now, "staff")).toMatchObject({ area: "staff", category: "patients" });
    expect(toNotificationItem({ ...dto, type: "SYSTEM" }, now, "admin")).toMatchObject({ area: "admin", category: "team" });
    expect(toNotificationItem({ ...dto, type: "APPOINTMENT_CREATED" }, now, "staff")).toMatchObject({ category: "appointments" });
  });
});
