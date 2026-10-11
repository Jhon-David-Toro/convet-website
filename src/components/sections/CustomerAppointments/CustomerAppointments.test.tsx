import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { ToastProvider } from "@/components/ui/Toast";

import { CustomerAppointments } from "./CustomerAppointments";
import { defaultGroups, moveAppointment } from "./CustomerAppointments.utils";

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

describe("CustomerAppointments edge cases", () => {
  it("offers to book when every upcoming appointment was cancelled", async () => {
    query = "cancel=rabies-booster";
    const { rerender } = renderPage();
    await userEvent.click(screen.getByRole("button", { name: "Cancel appointment" }));
    query = "cancel=annual-checkup";
    rerender(
      <ToastProvider>
        <CustomerAppointments />
      </ToastProvider>,
    );
    await userEvent.click(screen.getByRole("button", { name: "Cancel appointment" }));
    expect(screen.getByText("No upcoming appointments")).toBeInTheDocument();
    expect(screen.getAllByRole("link", { name: "Book a visit" }).length).toBeGreaterThan(0);
  });
});

describe("customer appointments utils", () => {
  it("leaves the groups as they are when the appointment is not there", () => {
    const groups = defaultGroups();
    expect(moveAppointment(groups, "nobody", "upcoming", "cancelled")).toBe(groups);
  });

  it("moves an appointment and changes its status", () => {
    const moved = moveAppointment(defaultGroups(), "rabies-booster", "upcoming", "cancelled");
    expect(moved.cancelled[0].status).toBe("cancelled");
    expect(moved.upcoming.map((appointment) => appointment.id)).not.toContain("rabies-booster");
  });
});
