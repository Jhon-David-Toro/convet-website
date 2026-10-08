import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { MonthCalendar } from "./MonthCalendar";

const props = { defaultMonth: "2026-10", today: "2026-10-08" };

describe("MonthCalendar", () => {
  it("shows the month, the weekday row and the legend", () => {
    render(<MonthCalendar {...props} />);
    expect(screen.getByText("October 2026")).toBeInTheDocument();
    expect(screen.getByText("Dot = few slots left")).toBeInTheDocument();
    expect(screen.getByText("Dashed = vet off / closed")).toBeInTheDocument();
  });

  it("disables past days and the days of other months", () => {
    render(<MonthCalendar {...props} />);
    expect(screen.getByRole("button", { name: "Wednesday, October 7, 2026" })).toBeDisabled();
    expect(screen.getByRole("button", { name: "Thursday, October 8, 2026" })).toBeEnabled();
    expect(screen.getByRole("button", { name: "Monday, September 28, 2026" })).toBeDisabled();
  });

  it("selects a day and reports it", async () => {
    const onSelect = vi.fn();
    render(<MonthCalendar {...props} onSelect={onSelect} />);
    await userEvent.click(screen.getByRole("button", { name: "Friday, October 9, 2026" }));
    expect(onSelect).toHaveBeenCalledWith("2026-10-09");
    expect(screen.getByRole("button", { name: "Friday, October 9, 2026" })).toHaveAttribute("aria-pressed", "true");
  });

  it("marks few-left days in their name and closed days as disabled", () => {
    render(<MonthCalendar {...props} dayStates={{ "2026-10-13": "few-left", "2026-10-14": "unavailable" }} />);
    expect(screen.getByRole("button", { name: "Tuesday, October 13, 2026, few slots left" })).toBeEnabled();
    expect(screen.getByRole("button", { name: "Wednesday, October 14, 2026" })).toBeDisabled();
  });

  it("navigates between months", async () => {
    render(<MonthCalendar {...props} />);
    await userEvent.click(screen.getByRole("button", { name: "Next month" }));
    expect(screen.getByText("November 2026")).toBeInTheDocument();
    await userEvent.click(screen.getByRole("button", { name: "Previous month" }));
    await userEvent.click(screen.getByRole("button", { name: "Previous month" }));
    expect(screen.getByText("September 2026")).toBeInTheDocument();
  });
});
