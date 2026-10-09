import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { TimeSlot } from "./TimeSlot";

describe("TimeSlot", () => {
  it("is a button showing the time and the capacity, and calls onClick", async () => {
    const onClick = vi.fn();
    render(<TimeSlot time="9:45 AM" capacity="3 of 5 left" onClick={onClick} />);
    await userEvent.click(screen.getByRole("button", { name: "9:45 AM 3 of 5 left" }));
    expect(onClick).toHaveBeenCalledOnce();
  });

  it("reflects selection with aria-pressed", () => {
    render(<TimeSlot time="9:45 AM" selected />);
    expect(screen.getByRole("button")).toHaveAttribute("aria-pressed", "true");
  });

  it("disabled and full cannot be clicked", async () => {
    const onClick = vi.fn();
    const { rerender } = render(<TimeSlot time="9:45 AM" disabled onClick={onClick} />);
    await userEvent.click(screen.getByRole("button"));
    rerender(<TimeSlot time="9:45 AM" capacity="Full" full onClick={onClick} />);
    expect(screen.getByRole("button")).toBeDisabled();
    await userEvent.click(screen.getByRole("button"));
    expect(onClick).not.toHaveBeenCalled();
  });
});
