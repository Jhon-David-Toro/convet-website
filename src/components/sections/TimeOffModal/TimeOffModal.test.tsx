import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { ToastProvider } from "@/components/ui/Toast";
import { pickOption } from "@/test/pickOption";

import { TimeOffModal } from "./TimeOffModal";
import { affectedAppointments, affectedTitle, validateTimeOff } from "./TimeOffModal.utils";

describe("TimeOffModal", () => {
  beforeEach(() => vi.useFakeTimers({ shouldAdvanceTime: true }));
  afterEach(() => vi.useRealTimers());

  it("lists the appointments the time off affects", () => {
    render(
      <ToastProvider>
        <TimeOffModal open onClose={() => {}} />
      </ToastProvider>,
    );
    expect(screen.getByText("Affects 3 appointments")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Review 3 appointments" })).toHaveAttribute("href", "/admin/appointments");
  });

  it("hides the warning for someone with nothing booked", async () => {
    render(
      <ToastProvider>
        <TimeOffModal open onClose={() => {}} />
      </ToastProvider>,
    );
    await pickOption("Team member", "Dr. Larry · VET-001");
    expect(screen.queryByText(/^Affects/)).not.toBeInTheDocument();
  });

  it("saves the time off and closes", async () => {
    const onClose = vi.fn();
    render(
      <ToastProvider>
        <TimeOffModal open onClose={onClose} />
      </ToastProvider>,
    );
    await userEvent.click(screen.getByRole("button", { name: "Save time off" }));
    act(() => void vi.advanceTimersByTime(900));
    expect(onClose).toHaveBeenCalledTimes(1);
    expect(screen.getByText("Time off saved. The vet’s slots are blocked.")).toBeInTheDocument();
  });
});

describe("time off utils", () => {
  it("checks the days and counts the appointments", () => {
    expect(validateTimeOff({ member: "susana", from: "10 / 20 / 2026", to: "10 / 24 / 2026", reason: "leave" })).toEqual({});
    expect(Object.keys(validateTimeOff({ member: "susana", from: "10 / 24 / 2026", to: "10 / 20 / 2026", reason: "leave" }))).toEqual(["to"]);
    expect(Object.keys(validateTimeOff({ member: "susana", from: "", to: "", reason: "leave" }))).toEqual(["from", "to"]);
    expect(affectedAppointments("nobody")).toEqual([]);
    expect(affectedTitle(1)).toBe("Affects 1 appointment");
  });
});
