import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import { Toggle } from "./Toggle";

describe("Toggle", () => {
  it("is a switch labelled by its text", async () => {
    render(<Toggle label="Appointment reminders by email" />);
    const toggle = screen.getByRole("switch", { name: "Appointment reminders by email" });
    expect(toggle).not.toBeChecked();
    await userEvent.click(toggle);
    expect(toggle).toBeChecked();
  });

  it("can be disabled", () => {
    render(<Toggle label="Reminders" disabled />);
    expect(screen.getByRole("switch")).toBeDisabled();
  });
});
