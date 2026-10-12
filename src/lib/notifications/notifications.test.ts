import { describe, expect, it } from "vitest";

import { badgeLabel, categoryCount, filterNotifications, groupByDay, markAllRead, markRead, notificationsFor, unreadCount } from "./notifications.utils";

describe("notifications", () => {
  it("gives every area its own notifications with the figures of the design", () => {
    const customer = notificationsFor("customer");
    const staff = notificationsFor("staff");
    const admin = notificationsFor("admin");
    expect([customer.length, staff.length, admin.length]).toEqual([8, 7, 6]);
    expect([unreadCount(customer), unreadCount(staff), unreadCount(admin)]).toEqual([3, 4, 3]);
    expect(categoryCount(customer, "appointments")).toBe(5);
    expect(categoryCount(staff, "appointments")).toBe(4);
    expect(categoryCount(admin, "team")).toBe(2);
  });

  it("filters by all, unread and category", () => {
    const customer = notificationsFor("customer");
    expect(filterNotifications(customer, "all")).toHaveLength(8);
    expect(filterNotifications(customer, "unread")).toHaveLength(3);
    expect(filterNotifications(customer, "pet-health")).toHaveLength(2);
  });

  it("groups by day without empty days", () => {
    expect(groupByDay(notificationsFor("customer")).map((entry) => [entry.group, entry.items.length])).toEqual([
      ["today", 1],
      ["yesterday", 2],
      ["october", 3],
      ["september", 2],
    ]);
    expect(groupByDay(notificationsFor("admin")).map((entry) => entry.group)).toEqual(["today", "yesterday", "october"]);
  });

  it("marks one or all as read without touching the original", () => {
    const customer = notificationsFor("customer");
    const one = markRead(customer, "c-today");
    expect(unreadCount(one)).toBe(2);
    expect(unreadCount(customer)).toBe(3);
    expect(unreadCount(markAllRead(customer))).toBe(0);
  });

  it("caps the badge at 9+", () => {
    expect(badgeLabel(3)).toBe("3");
    expect(badgeLabel(12)).toBe("9+");
  });
});
