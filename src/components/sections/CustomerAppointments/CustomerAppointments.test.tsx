import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { ToastProvider } from "@/components/ui/Toast";

import { CustomerAppointments } from "./CustomerAppointments";

const replace = vi.fn();
let query = "";

vi.mock("next/navigation", () => ({
  useRouter: () => ({ replace }),
  useSearchParams: () => new URLSearchParams(query),
}));

/**
 * Renders the appointments page with the toasts it needs.
 *
 * @returns The Testing Library render result.
 */
function renderPage() {
  return render(
    <ToastProvider>
      <CustomerAppointments />
    </ToastProvider>,
  );
}

describe("CustomerAppointments", () => {
  beforeEach(() => {
    query = "";
    replace.mockClear();
  });

  it("shows the upcoming appointments with their count and the notice", () => {
    renderPage();
    expect(screen.getByRole("heading", { level: 1, name: "Appointments" })).toBeInTheDocument();
    expect(screen.getByRole("tab", { name: /Upcoming/ })).toHaveTextContent("2");
    expect(screen.getByText("Rabies booster")).toBeInTheDocument();
    expect(screen.getByText("Annual check-up")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Chat on WhatsApp" })).toBeInTheDocument();
  });

  it("shows an empty state in the tabs without appointments", async () => {
    renderPage();
    await userEvent.click(screen.getByRole("tab", { name: "Past" }));
    expect(screen.getByText("No past appointments")).toBeInTheDocument();
    expect(screen.queryByText("Rabies booster")).not.toBeInTheDocument();
  });

  it("links each card to the reschedule page and to the cancel dialog", () => {
    renderPage();
    expect(screen.getAllByRole("link", { name: /Reschedule/ })[0]).toHaveAttribute("href", "/app/reschedule/rabies-booster");
    expect(screen.getAllByRole("link", { name: /Cancel/ })[0]).toHaveAttribute("href", "/app/appointments?cancel=rabies-booster");
  });

  it("offers to reschedule before cancelling, then cancels with an undo", async () => {
    query = "cancel=rabies-booster";
    renderPage();
    expect(screen.getByRole("dialog", { name: "Can't make it? Reschedule instead" })).toBeInTheDocument();
    await userEvent.click(screen.getByRole("button", { name: "Cancel appointment" }));
    expect(replace).toHaveBeenCalledWith("/app/appointments");
    expect(screen.getByText("Appointment cancelled. We emailed you a confirmation.")).toBeInTheDocument();
    await userEvent.click(screen.getByRole("tab", { name: /Cancelled/ }));
    expect(screen.getByText("Rabies booster")).toBeInTheDocument();
    await userEvent.click(screen.getByRole("tab", { name: /Upcoming/ }));
    expect(screen.queryByText("Rabies booster")).not.toBeInTheDocument();
    await userEvent.click(screen.getByRole("button", { name: "Undo" }));
    expect(screen.getByRole("tab", { name: /Upcoming/ })).toHaveTextContent("2");
  });
});
