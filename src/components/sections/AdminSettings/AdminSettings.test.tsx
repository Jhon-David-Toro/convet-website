import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import { ToastProvider } from "@/components/ui/Toast";

import { AdminSettings } from "./AdminSettings";

/**
 * Renders the settings page with the toasts it needs.
 *
 * @returns The Testing Library render result.
 */
function renderPage() {
  return render(
    <ToastProvider>
      <AdminSettings />
    </ToastProvider>,
  );
}

describe("AdminSettings", () => {
  it("shows the booking rules with their saved values", () => {
    renderPage();
    expect(screen.getByRole("heading", { level: 1, name: "Settings" })).toBeInTheDocument();
    expect(screen.getByRole("tab", { name: "Booking rules" })).toHaveAttribute("aria-selected", "true");
    expect(screen.getByRole("switch", { name: /Confirm online bookings automatically/ })).toBeChecked();
    expect(screen.getByRole("switch", { name: /choose a specific vet/ })).not.toBeChecked();
  });

  it("changes a switch, discards it and saves", async () => {
    renderPage();
    const toggle = screen.getByRole("switch", { name: /choose a specific vet/ });
    await userEvent.click(toggle);
    expect(toggle).toBeChecked();
    await userEvent.click(screen.getByRole("button", { name: "Discard" }));
    expect(toggle).not.toBeChecked();
    await userEvent.click(screen.getByRole("button", { name: "Save rules" }));
    expect(await screen.findByText("Booking rules saved.")).toBeInTheDocument();
  });

  it("switches to the other tabs", async () => {
    renderPage();
    await userEvent.click(screen.getByRole("tab", { name: "Audit log" }));
    expect(screen.getByRole("table", { name: "Audit log" })).toBeInTheDocument();
    await userEvent.click(screen.getByRole("tab", { name: "Business info" }));
    expect(screen.getByLabelText("Clinic email")).toHaveValue("info@convet.aw");
  });
});
