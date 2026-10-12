import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { CheckCircle } from "@/components/ui/Icon";

import { NotificationItem } from "./NotificationItem";

const BASE = { icon: CheckCircle, title: "Appointment confirmed", text: "Luna · Fri, Oct 9 · 9:30 AM", when: "Yesterday · 9:12 AM" };

describe("NotificationItem", () => {
  it("shows what happened, when and where it leads", () => {
    render(
      <ul>
        <NotificationItem {...BASE} href="/app/appointments" linkLabel="Opens appointment" />
      </ul>,
    );
    expect(screen.getByRole("link", { name: "Appointment confirmed" })).toHaveAttribute("href", "/app/appointments");
    expect(screen.getByText("Opens appointment")).toBeInTheDocument();
    expect(screen.getByText("Yesterday · 9:12 AM")).toBeInTheDocument();
  });

  it("is only informative without a destination", () => {
    render(
      <ul>
        <NotificationItem {...BASE} />
      </ul>,
    );
    expect(screen.queryByRole("link")).not.toBeInTheDocument();
  });

  it("marks an unread row with a dot and a button that marks it read", async () => {
    const onMarkRead = vi.fn();
    render(
      <ul>
        <NotificationItem {...BASE} unread onMarkRead={onMarkRead} />
      </ul>,
    );
    expect(screen.getByRole("img", { name: "Unread" })).toBeInTheDocument();
    await userEvent.click(screen.getByRole("button", { name: "Mark as read" }));
    expect(onMarkRead).toHaveBeenCalledTimes(1);
  });

  it("has no dot or button once it is read, and tells when it is opened", async () => {
    const onOpen = vi.fn();
    render(
      <ul>
        <NotificationItem {...BASE} href="/x" onOpen={onOpen} />
      </ul>,
    );
    expect(screen.queryByRole("img", { name: "Unread" })).not.toBeInTheDocument();
    expect(screen.queryByRole("button", { name: "Mark as read" })).not.toBeInTheDocument();
    await userEvent.click(screen.getByRole("link", { name: "Appointment confirmed" }));
    expect(onOpen).toHaveBeenCalledTimes(1);
  });
});
