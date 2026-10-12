import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { ToastProvider } from "@/components/ui/Toast";

import { AppointmentModal } from "./AppointmentModal";
import { slotsOn, submitLabel, toIso, validateAppointment } from "./AppointmentModal.utils";

describe("AppointmentModal", () => {
  beforeEach(() => vi.useFakeTimers({ shouldAdvanceTime: true }));
  afterEach(() => vi.useRealTimers());

  it("asks for the patient and a time before booking", async () => {
    render(
      <ToastProvider>
        <AppointmentModal open onClose={() => {}} />
      </ToastProvider>,
    );
    await userEvent.click(screen.getByRole("button", { name: "Book" }));
    expect(screen.getByText("Search for the patient and owner.")).toBeInTheDocument();
    expect(screen.getByText("Pick a time.")).toBeInTheDocument();
  });

  it("books the picked time and closes", async () => {
    const onClose = vi.fn();
    render(
      <ToastProvider>
        <AppointmentModal open onClose={onClose} />
      </ToastProvider>,
    );
    await userEvent.type(screen.getByLabelText("Patient & owner"), "Rocky");
    await userEvent.click(screen.getByRole("button", { name: /^10:20 AM/ }));
    await userEvent.click(screen.getByRole("button", { name: "Book Wed, Oct 14 · 10:20 AM" }));
    act(() => void vi.advanceTimersByTime(900));
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});

describe("appointment utils", () => {
  it("works out the day, the times and the button label", () => {
    expect(toIso("10 / 14 / 2026")).toBe("2026-10-14");
    expect(toIso("")).toBe("");
    expect(slotsOn("larry", "")).toEqual([]);
    expect(slotsOn("larry", "10 / 14 / 2026").length).toBeGreaterThan(0);
    expect(submitLabel({ patient: "", service: "", vet: "larry", date: "10 / 14 / 2026", time: "", notes: "", notify: true })).toBe("Book");
    expect(Object.keys(validateAppointment({ patient: "", service: "", vet: "larry", date: "", time: "", notes: "", notify: true }))).toEqual(["patient", "date", "time"]);
  });
});
