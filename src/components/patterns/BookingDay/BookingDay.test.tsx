import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { BookingDay } from "./BookingDay";

describe("BookingDay", () => {
  it("is a button with weekday and day, not pressed by default", () => {
    render(<BookingDay weekday="Wed" day={7} />);
    const button = screen.getByRole("button", { name: "Wed 7" });
    expect(button).toHaveAttribute("aria-pressed", "false");
  });

  it("selected is pressed", () => {
    render(<BookingDay state="selected" weekday="Wed" day={7} />);
    expect(screen.getByRole("button")).toHaveAttribute("aria-pressed", "true");
  });

  it("few-left announces it without relying on the dot", () => {
    render(<BookingDay state="few-left" weekday="Thu" day={8} />);
    expect(screen.getByRole("button", { name: "Thu 8 few spots left" })).toBeInTheDocument();
  });

  it("unavailable is disabled and not clickable", async () => {
    const onClick = vi.fn();
    render(<BookingDay state="unavailable" weekday="Fri" day={9} onClick={onClick} />);
    expect(screen.getByRole("button")).toBeDisabled();
    await userEvent.click(screen.getByRole("button"));
    expect(onClick).not.toHaveBeenCalled();
  });
});
