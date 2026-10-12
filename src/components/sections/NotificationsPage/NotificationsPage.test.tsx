import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import { NotificationsProvider } from "@/components/sections/NotificationCenter";

import { NotificationsPage } from "./NotificationsPage";

/**
 * Renders the page inside the provider of an area.
 *
 * @returns The Testing Library render result.
 */
function setup() {
  return render(
    <NotificationsProvider area="customer">
      <NotificationsPage />
    </NotificationsProvider>,
  );
}

describe("NotificationsPage", () => {
  it("lists the notifications with filters and the retention note", () => {
    setup();
    expect(screen.getByRole("heading", { name: "Notifications" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /^Unread/ })).toBeInTheDocument();
    expect(screen.getByText(/Kept for 90 days/)).toBeInTheDocument();
  });

  it("marks everything read", async () => {
    setup();
    await userEvent.click(screen.getByRole("button", { name: "Mark all read" }));
    expect(screen.getByRole("button", { name: "Mark all read" })).toBeDisabled();
  });

  it("links to the notification settings of the area", () => {
    setup();
    expect(screen.getByRole("link", { name: "Notification settings" })).toHaveAttribute("href", "/app/settings");
  });
});
