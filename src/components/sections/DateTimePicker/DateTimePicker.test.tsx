import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { BOOKING_VETS } from "@/lib/booking/booking.constants";

import { DateTimePicker } from "./DateTimePicker";

const shirley = BOOKING_VETS[1];

const props = { vet: shirley, date: "", time: "", loading: false, onDateChange: vi.fn(), onTimeChange: vi.fn() };

describe("DateTimePicker", () => {
  it("shows the vet, the calendar and the note about Aruba time", () => {
    render(<DateTimePicker {...props} />);
    expect(screen.getByText("Dr. Shirley · Veterinarian")).toBeInTheDocument();
    expect(screen.getByText("October 2026")).toBeInTheDocument();
    expect(screen.getByText(/Times in Aruba time/)).toBeInTheDocument();
  });

  it("reports the day that is picked", async () => {
    const onDateChange = vi.fn();
    render(<DateTimePicker {...props} onDateChange={onDateChange} />);
    await userEvent.click(screen.getByRole("button", { name: "Friday, October 9, 2026" }));
    expect(onDateChange).toHaveBeenCalledWith("2026-10-09");
  });

  it("lists the times of the selected day and reports the one that is picked", async () => {
    const onTimeChange = vi.fn();
    render(<DateTimePicker {...props} date="2026-10-09" time="9:30 AM" onTimeChange={onTimeChange} />);
    expect(screen.getByRole("heading", { name: "Friday, October 9" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /9:30 AM/ })).toHaveAttribute("aria-pressed", "true");
    expect(screen.getByRole("button", { name: /9:00 AM/ })).toBeDisabled();
    await userEvent.click(screen.getByRole("button", { name: /10:00 AM/ }));
    expect(onTimeChange).toHaveBeenCalledWith("10:00 AM");
  });

  it("shows a loading state while the times are looked up", () => {
    render(<DateTimePicker {...props} date="2026-10-09" loading />);
    expect(screen.getByRole("status")).toHaveTextContent("Finding available times for Fri, Oct 9...");
  });

  it("explains a full day and offers the next open day or any vet", async () => {
    const onDateChange = vi.fn();
    const onAnyVet = vi.fn();
    render(<DateTimePicker {...props} date="2026-10-13" onDateChange={onDateChange} onAnyVet={onAnyVet} />);
    expect(screen.getByText("Tue, Oct 13 is full with Dr. Shirley")).toBeInTheDocument();
    await userEvent.click(screen.getByRole("button", { name: "See Thu, Oct 15" }));
    expect(onDateChange).toHaveBeenCalledWith("2026-10-15");
    await userEvent.click(screen.getByRole("button", { name: "Any available vet" }));
    expect(onAnyVet).toHaveBeenCalled();
  });

  it("only shows the change vet button when it can be used", () => {
    const { rerender } = render(<DateTimePicker {...props} />);
    expect(screen.queryByRole("button", { name: "Change vet" })).not.toBeInTheDocument();
    rerender(<DateTimePicker {...props} onChangeVet={vi.fn()} />);
    expect(screen.getByRole("button", { name: "Change vet" })).toBeInTheDocument();
  });
});
