import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { Calendar } from "./Calendar";

const today = new Date(2026, 9, 7); // Oct 7, 2026 (Wednesday)

describe("Calendar", () => {
  it("shows the month of the selected day and marks today", () => {
    render(<Calendar today={today} onSelect={() => {}} />);
    expect(screen.getByText("October 2026")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Wednesday, October 7, 2026" })).toHaveAttribute("aria-current", "date");
    expect(screen.getAllByRole("columnheader")).toHaveLength(7);
  });

  it("selects a day with the mouse", async () => {
    const onSelect = vi.fn();
    render(<Calendar today={today} onSelect={onSelect} />);
    await userEvent.click(screen.getByRole("button", { name: "Thursday, October 15, 2026" }));
    expect(onSelect).toHaveBeenCalledWith(new Date(2026, 9, 15));
  });

  it("marks the selected day", () => {
    render(<Calendar today={today} value={new Date(2026, 9, 20)} onSelect={() => {}} />);
    const cell = screen.getByRole("button", { name: "Tuesday, October 20, 2026" }).closest("td");
    expect(cell).toHaveAttribute("aria-selected", "true");
  });

  it("changes month with the arrows", async () => {
    render(<Calendar today={today} onSelect={() => {}} />);
    await userEvent.click(screen.getByRole("button", { name: "Next month" }));
    expect(screen.getByText("November 2026")).toBeInTheDocument();
    await userEvent.click(screen.getByRole("button", { name: "Previous month" }));
    await userEvent.click(screen.getByRole("button", { name: "Previous month" }));
    expect(screen.getByText("September 2026")).toBeInTheDocument();
  });

  it("has a single tab stop and moves with the keyboard", async () => {
    const onSelect = vi.fn();
    render(<Calendar today={today} onSelect={onSelect} autoFocus />);
    const grid = screen.getByRole("grid");
    expect(grid.querySelectorAll("button[tabindex='0']")).toHaveLength(1);
    expect(screen.getByRole("button", { name: "Wednesday, October 7, 2026" })).toHaveFocus();
    await userEvent.keyboard("{ArrowRight}{ArrowDown}");
    expect(screen.getByRole("button", { name: "Thursday, October 15, 2026" })).toHaveFocus();
    await userEvent.keyboard("{PageDown}");
    expect(screen.getByText("November 2026")).toBeInTheDocument();
    await userEvent.keyboard("{Enter}");
    expect(onSelect).toHaveBeenCalledWith(new Date(2026, 10, 15));
  });

  it("disables days outside the allowed range", () => {
    render(<Calendar today={today} minDate={today} maxDate={new Date(2026, 9, 20)} onSelect={() => {}} />);
    expect(screen.getByRole("button", { name: "Tuesday, October 6, 2026" })).toBeDisabled();
    expect(screen.getByRole("button", { name: "Wednesday, October 7, 2026" })).toBeEnabled();
    expect(screen.getByRole("button", { name: "Wednesday, October 21, 2026" })).toBeDisabled();
  });
});
