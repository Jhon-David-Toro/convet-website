import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { MaskedInput } from "./MaskedInput";

const today = new Date(2026, 9, 7);

describe("MaskedInput", () => {
  it("formats a date while typing", async () => {
    const onValueChange = vi.fn();
    render(<MaskedInput mask="date" label="Date of birth" onValueChange={onValueChange} />);
    const input = screen.getByRole("textbox", { name: "Date of birth" });
    await userEvent.type(input, "07152023");
    expect(input).toHaveValue("07 / 15 / 2023");
    expect(onValueChange).toHaveBeenLastCalledWith("07 / 15 / 2023");
  });

  it("formats a time while typing and lets the meridiem be deleted", async () => {
    render(<MaskedInput mask="time" label="Time" />);
    const input = screen.getByRole("combobox", { name: "Time" });
    await userEvent.type(input, "945a");
    expect(input).toHaveValue("9:45 AM");
    await userEvent.type(input, "{Backspace}");
    expect(input).toHaveValue("9:45");
  });

  it("starts from defaultValue", () => {
    render(<MaskedInput mask="date" label="Date of birth" defaultValue="07 / 15 / 2023" />);
    expect(screen.getByRole("textbox")).toHaveValue("07 / 15 / 2023");
  });

  it("supports a controlled value", () => {
    render(<MaskedInput mask="time" label="Time" value="9:45 AM" onValueChange={() => {}} />);
    expect(screen.getByRole("combobox")).toHaveValue("9:45 AM");
  });

  it("is invalid and described by the error", () => {
    render(<MaskedInput mask="date" label="Date of birth" error="Enter a date before today." />);
    expect(screen.getByRole("textbox")).toBeInvalid();
    expect(screen.getByRole("textbox")).toHaveAccessibleDescription("Enter a date before today.");
  });
});

describe("MaskedInput date picker", () => {
  it("opens a calendar from the icon and fills the field with the chosen day", async () => {
    render(<MaskedInput mask="date" label="Date of birth" today={today} />);
    await userEvent.click(screen.getByRole("button", { name: "Choose date" }));
    expect(screen.getByRole("dialog", { name: "Choose date" })).toBeInTheDocument();
    await userEvent.click(screen.getByRole("button", { name: "Thursday, October 15, 2026" }));
    expect(screen.getByRole("textbox")).toHaveValue("10 / 15 / 2026");
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    expect(screen.getByRole("textbox")).toHaveFocus();
  });

  it("opens on the month of the typed date and marks it selected", async () => {
    render(<MaskedInput mask="date" label="Date of birth" today={today} defaultValue="03 / 09 / 2025" />);
    await userEvent.click(screen.getByRole("button", { name: "Choose date" }));
    expect(screen.getByText("March 2025")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Sunday, March 9, 2025" }).closest("td")).toHaveAttribute("aria-selected", "true");
  });

  it("opens with Alt+ArrowDown and closes with Escape returning the focus", async () => {
    render(<MaskedInput mask="date" label="Date of birth" today={today} />);
    screen.getByRole("textbox").focus();
    await userEvent.keyboard("{Alt>}{ArrowDown}{/Alt}");
    expect(screen.getByRole("dialog")).toBeInTheDocument();
    await userEvent.keyboard("{Escape}");
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    expect(screen.getByRole("textbox")).toHaveFocus();
  });

  it("disables days outside the allowed range", async () => {
    render(<MaskedInput mask="date" label="Date" today={today} minDate={today} />);
    await userEvent.click(screen.getByRole("button", { name: "Choose date" }));
    expect(screen.getByRole("button", { name: "Tuesday, October 6, 2026" })).toBeDisabled();
  });

  it("cannot be opened when disabled", () => {
    render(<MaskedInput mask="date" label="Date" disabled />);
    expect(screen.getByRole("button", { name: "Choose date" })).toBeDisabled();
  });
});

describe("MaskedInput time picker", () => {
  it("lists the clinic hours and fills the field with the chosen one", async () => {
    render(<MaskedInput mask="time" label="Time" />);
    await userEvent.click(screen.getByRole("button", { name: "Choose time" }));
    const options = screen.getAllByRole("option");
    expect(options[0]).toHaveTextContent("7:00 AM");
    expect(options.at(-1)).toHaveTextContent("7:00 PM");
    await userEvent.click(screen.getByRole("option", { name: "9:45 AM" }));
    expect(screen.getByRole("combobox")).toHaveValue("9:45 AM");
    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
  });

  it("marks the current value and honours a custom range and step", async () => {
    render(<MaskedInput mask="time" label="Time" defaultValue="9:30 AM" from="9:00 AM" to="10:00 AM" stepMinutes={30} />);
    await userEvent.click(screen.getByRole("button", { name: "Choose time" }));
    expect(screen.getAllByRole("option")).toHaveLength(3);
    expect(screen.getByRole("option", { name: "9:30 AM" })).toHaveAttribute("aria-selected", "true");
  });

  it("works with the keyboard from the field", async () => {
    render(<MaskedInput mask="time" label="Time" from="9:00 AM" to="10:00 AM" stepMinutes={30} />);
    const input = screen.getByRole("combobox");
    input.focus();
    await userEvent.keyboard("{ArrowDown}");
    expect(input).toHaveAttribute("aria-expanded", "true");
    await userEvent.keyboard("{ArrowDown}{Enter}");
    expect(input).toHaveValue("9:30 AM");
    expect(input).toHaveAttribute("aria-expanded", "false");
  });

  it("closes with Escape", async () => {
    render(<MaskedInput mask="time" label="Time" />);
    await userEvent.click(screen.getByRole("button", { name: "Choose time" }));
    await userEvent.keyboard("{Escape}");
    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
  });
});
