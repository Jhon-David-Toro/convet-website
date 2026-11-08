import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import type { NotificationItem } from "@/lib/notifications/notifications.types";

import { NotificationList } from "./parts/NotificationList";
import { NotificationsProvider } from "./NotificationsProvider";
import { useNotificationCenter } from "./NotificationsContext";
import type { NotificationsSource } from "./NotificationCenter.types";

const ITEM: NotificationItem = { id: "n1", area: "customer", category: "appointments", kind: "confirmed", title: "Appointment confirmed", text: "Luna", when: "9:12 AM", group: "today", unread: true };
const OLDER: NotificationItem = { ...ITEM, id: "n2", title: "Old one", group: "earlier", unread: false };

/**
 * Builds a source whose actions can be controlled by each test.
 *
 * @param overrides Actions to replace.
 * @returns The source.
 */
function source(overrides: Partial<NotificationsSource["actions"]> = {}): NotificationsSource {
  return {
    items: [ITEM],
    hasOlder: true,
    actions: {
      markRead: vi.fn().mockResolvedValue({ ok: true, data: undefined }),
      markAllRead: vi.fn().mockResolvedValue({ ok: true, data: undefined }),
      loadPage: vi.fn().mockResolvedValue({ ok: true, data: { items: [OLDER, ITEM], hasMore: false } }),
      ...overrides,
    },
  };
}

/**
 * Small consumer that exposes the state and the actions.
 *
 * @returns The rendered element.
 */
function Probe() {
  const { unread, markAllRead, loadOlder, hasOlder, items } = useNotificationCenter();
  return (
    <div>
      <p>unread:{unread}</p>
      <p>items:{items.length}</p>
      {hasOlder && <button onClick={loadOlder}>older</button>}
      <button onClick={markAllRead}>read all</button>
      <NotificationList items={items} />
    </div>
  );
}

describe("NotificationsProvider with a backend source", () => {
  it("shows the real items with plain day names and saves the read state", async () => {
    const data = source();
    render(<NotificationsProvider area="customer" source={data}><Probe /></NotificationsProvider>);
    expect(screen.getByText("unread:1")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Today" })).toBeInTheDocument();
    await userEvent.click(screen.getByRole("button", { name: "read all" }));
    expect(screen.getByText("unread:0")).toBeInTheDocument();
    expect(data.actions.markAllRead).toHaveBeenCalledTimes(1);
  });

  it("uses the backend unread total even when unread notifications are on older pages", async () => {
    const data = { ...source(), unreadCount: 3 };
    render(<NotificationsProvider area="customer" source={data}><Probe /></NotificationsProvider>);
    expect(screen.getByText("unread:3")).toBeInTheDocument();
    await userEvent.click(screen.getByRole("button", { name: "read all" }));
    expect(screen.getByText("unread:0")).toBeInTheDocument();
  });

  it("goes back to unread when the backend refuses", async () => {
    const data = source({ markAllRead: vi.fn().mockResolvedValue({ ok: false, kind: "server", message: "x" }) });
    render(<NotificationsProvider area="customer" source={data}><Probe /></NotificationsProvider>);
    await userEvent.click(screen.getByRole("button", { name: "read all" }));
    expect(await screen.findByText("unread:1")).toBeInTheDocument();
  });

  it("loads the next page without repeating notifications and hides the button at the end", async () => {
    const data = source();
    render(<NotificationsProvider area="customer" source={data}><Probe /></NotificationsProvider>);
    await userEvent.click(screen.getByRole("button", { name: "older" }));
    expect(await screen.findByText("items:2")).toBeInTheDocument();
    expect(data.actions.loadPage).toHaveBeenCalledWith(2, "customer");
    expect(screen.queryByRole("button", { name: "older" })).not.toBeInTheDocument();
  });

  it("keeps the button when a page fails to load so the user can retry", async () => {
    const data = source({ loadPage: vi.fn().mockResolvedValue({ ok: false, kind: "network", message: "x" }) });
    render(<NotificationsProvider area="customer" source={data}><Probe /></NotificationsProvider>);
    await act(async () => userEvent.click(screen.getByRole("button", { name: "older" })));
    expect(screen.getByRole("button", { name: "older" })).toBeInTheDocument();
    expect(screen.getByText("items:1")).toBeInTheDocument();
  });
});

describe("NotificationsProvider without a source", () => {
  it("keeps showing the sample data of the area", () => {
    render(<NotificationsProvider area="customer"><Probe /></NotificationsProvider>);
    expect(screen.getByText("unread:3")).toBeInTheDocument();
  });
});
