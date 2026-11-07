import { beforeEach, describe, expect, it, vi } from "vitest";

const { page, markOne, markAll } = vi.hoisted(() => ({ page: vi.fn(), markOne: vi.fn(), markAll: vi.fn() }));
vi.mock("@/lib/auth/auth.access", () => ({ requireRole: vi.fn().mockResolvedValue({}) }));
vi.mock("next/navigation", () => ({ redirect: vi.fn() }));
vi.mock("@/lib/api/notifications.api", () => ({ getNotificationsPage: page, markNotificationRead: markOne, markAllNotificationsRead: markAll }));

import { ApiError } from "@/lib/api/api.errors";

import { loadNotificationsPageAction, markAllNotificationsReadAction, markNotificationReadAction } from "./actions";

beforeEach(() => {
  page.mockReset();
  markOne.mockReset();
  markAll.mockReset();
});

describe("notification actions", () => {
  it("marks one or all notifications as read", async () => {
    markOne.mockResolvedValue(undefined);
    markAll.mockResolvedValue(undefined);
    await expect(markNotificationReadAction("n1")).resolves.toEqual({ ok: true, data: undefined });
    await expect(markAllNotificationsReadAction()).resolves.toEqual({ ok: true, data: undefined });
    expect(markOne).toHaveBeenCalledWith("n1");
  });

  it("returns a safe error when the backend refuses", async () => {
    markOne.mockImplementation(async () => {
      throw new ApiError("not-found", { status: 404 });
    });
    await expect(markNotificationReadAction("n1")).resolves.toMatchObject({ ok: false, kind: "not-found" });
  });

  it("loads a page and rejects an invalid page number without calling the backend", async () => {
    page.mockResolvedValue({ items: [], page: 2, hasMore: false });
    await expect(loadNotificationsPageAction(2)).resolves.toEqual({ ok: true, data: { items: [], hasMore: false } });
    await expect(loadNotificationsPageAction(0)).resolves.toMatchObject({ ok: false, kind: "validation" });
    expect(page).toHaveBeenCalledTimes(1);
  });
});
