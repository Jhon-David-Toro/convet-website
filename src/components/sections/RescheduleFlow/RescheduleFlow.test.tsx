import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { ToastProvider } from "@/components/ui/Toast";
import { CUSTOMER_APPOINTMENTS } from "@/lib/customer/customer.constants";

import { RescheduleFlow } from "./RescheduleFlow";

const push = vi.fn();

vi.mock("next/navigation", () => ({ useRouter: () => ({ push }) }));

describe("RescheduleFlow", () => {
  it("asks for a day and a time, then confirms the move", async () => {
    render(
      <ToastProvider>
        <RescheduleFlow appointment={CUSTOMER_APPOINTMENTS[0]} />
      </ToastProvider>,
    );
    expect(screen.getByRole("heading", { level: 1, name: "Pick a new day and time" })).toBeInTheDocument();
    expect(screen.getAllByRole("button", { name: "Continue" })[0]).toBeDisabled();
    await userEvent.click(screen.getByRole("button", { name: "Friday, October 16, 2026" }));
    await userEvent.click(await screen.findByRole("button", { name: /9:30 AM/ }, { timeout: 3000 }));
    await userEvent.click(screen.getAllByRole("button", { name: "Continue" })[0]);
    expect(screen.getByRole("heading", { level: 1, name: "Confirm the change" })).toBeInTheDocument();
    await userEvent.click(screen.getAllByRole("button", { name: /^Move to/ })[0]);
    expect(push).toHaveBeenCalledWith("/app/appointments");
    expect(await screen.findByText("Appointment moved. We emailed you the new time.")).toBeInTheDocument();
  });
});

describe("RescheduleFlow going back", () => {
  it("leaves to the appointments from the first step and goes back to the day from the second", async () => {
    push.mockClear();
    render(
      <ToastProvider>
        <RescheduleFlow appointment={CUSTOMER_APPOINTMENTS[0]} />
      </ToastProvider>,
    );
    await userEvent.click(screen.getAllByRole("button", { name: "Back" })[0]);
    expect(push).toHaveBeenCalledWith("/app/appointments");
    await userEvent.click(screen.getByRole("button", { name: "Friday, October 16, 2026" }));
    await userEvent.click(await screen.findByRole("button", { name: /9:30 AM/ }, { timeout: 3000 }));
    await userEvent.click(screen.getAllByRole("button", { name: "Continue" })[0]);
    await userEvent.click(screen.getAllByRole("button", { name: "Back" })[0]);
    expect(screen.getByRole("heading", { level: 1, name: "Pick a new day and time" })).toBeInTheDocument();
  });
});
