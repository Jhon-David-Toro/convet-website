import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { Checkbox } from "./Checkbox";

describe("Checkbox", () => {
  it("is labelled by its text and toggles uncontrolled", async () => {
    render(<Checkbox label="Send me vaccine reminders" />);
    const checkbox = screen.getByRole("checkbox", { name: "Send me vaccine reminders" });
    expect(checkbox).not.toBeChecked();
    await userEvent.click(checkbox);
    expect(checkbox).toBeChecked();
  });

  it("reports changes when controlled", async () => {
    const onChange = vi.fn();
    render(<Checkbox label="Reminders" checked={false} onChange={onChange} />);
    await userEvent.click(screen.getByRole("checkbox"));
    expect(onChange).toHaveBeenCalledTimes(1);
  });

  it('renders "mixed" as a real indeterminate state', () => {
    render(<Checkbox label="All pets" checked="mixed" onChange={() => {}} />);
    const checkbox = screen.getByRole("checkbox") as HTMLInputElement;
    expect(checkbox.indeterminate).toBe(true);
    expect(checkbox).not.toBeChecked();
  });

  it("links the description for assistive tech", () => {
    render(<Checkbox label="Reminders" description="We email you 14 days before." />);
    expect(screen.getByRole("checkbox")).toHaveAccessibleDescription("We email you 14 days before.");
  });

  it("can be disabled", async () => {
    const onChange = vi.fn();
    render(<Checkbox label="Reminders" disabled onChange={onChange} />);
    await userEvent.click(screen.getByRole("checkbox"));
    expect(onChange).not.toHaveBeenCalled();
  });
});
