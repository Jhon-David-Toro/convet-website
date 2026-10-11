import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { Select } from "./Select";

const options = [
  { value: "dog", label: "Dog" },
  { value: "cat", label: "Cat" },
  { value: "bird", label: "Bird", disabled: true },
  { value: "rabbit", label: "Rabbit" },
];

describe("Select", () => {
  it("is a combobox named by its label, closed by default", () => {
    render(<Select label="Species" options={options} placeholder="Choose" />);
    const combobox = screen.getByRole("combobox", { name: "Species" });
    expect(combobox).toHaveAttribute("aria-expanded", "false");
    expect(combobox).toHaveTextContent("Choose");
    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
  });

  it("opens with a click and picks an option", async () => {
    const onValueChange = vi.fn();
    render(<Select label="Species" options={options} onValueChange={onValueChange} />);
    await userEvent.click(screen.getByRole("combobox"));
    expect(screen.getByRole("listbox")).toBeInTheDocument();
    await userEvent.click(screen.getByRole("option", { name: "Cat" }));
    expect(onValueChange).toHaveBeenCalledWith("cat");
    expect(screen.getByRole("combobox")).toHaveTextContent("Cat");
    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
  });

  it("works with the keyboard and skips disabled options", async () => {
    render(<Select label="Species" options={options} defaultValue="cat" />);
    const combobox = screen.getByRole("combobox");
    combobox.focus();
    await userEvent.keyboard("{ArrowDown}");
    expect(combobox).toHaveAttribute("aria-expanded", "true");
    await userEvent.keyboard("{ArrowDown}{Enter}");
    expect(combobox).toHaveTextContent("Rabbit");
    await userEvent.keyboard("{ArrowDown}{Escape}");
    expect(combobox).toHaveAttribute("aria-expanded", "false");
  });

  it("selects by typing the first letter", async () => {
    render(<Select label="Species" options={options} />);
    screen.getByRole("combobox").focus();
    await userEvent.keyboard("r{Enter}");
    expect(screen.getByRole("combobox")).toHaveTextContent("Rabbit");
  });

  it("exposes the value to native forms", () => {
    const { container } = render(<Select label="Species" options={options} name="species" defaultValue="dog" />);
    expect(container.querySelector("input[name='species']")).toHaveValue("dog");
  });

  it("is invalid and described by the error", () => {
    render(<Select label="Species" options={options} error="Select a species." />);
    expect(screen.getByRole("combobox")).toBeInvalid();
    expect(screen.getByRole("combobox")).toHaveAccessibleDescription("Select a species.");
  });

  it("does not open when disabled", async () => {
    render(<Select label="Species" options={options} disabled />);
    await userEvent.click(screen.getByRole("combobox"));
    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
  });
});

describe("Select keyboard and edge cases", () => {
  it("goes to the first and last enabled options with Home and End, and up with ArrowUp", async () => {
    const onValueChange = vi.fn();
    render(<Select label="Species" options={options} onValueChange={onValueChange} />);
    const combobox = screen.getByRole("combobox");
    combobox.focus();
    await userEvent.keyboard("{ArrowDown}{End}");
    expect(screen.getByRole("option", { name: "Rabbit" })).toHaveAttribute("data-active", "true");
    await userEvent.keyboard("{ArrowUp}{Home}{Enter}");
    expect(onValueChange).toHaveBeenCalledWith("dog");
  });

  it("opens and chooses with the space bar", async () => {
    const onValueChange = vi.fn();
    render(<Select label="Species" options={options} onValueChange={onValueChange} />);
    screen.getByRole("combobox").focus();
    await userEvent.keyboard(" ");
    expect(screen.getByRole("listbox")).toBeInTheDocument();
    await userEvent.keyboard(" ");
    expect(onValueChange).toHaveBeenCalledWith("dog");
  });

  it("jumps to the option that starts with the typed letter while open and ignores unknown letters", async () => {
    const onValueChange = vi.fn();
    render(<Select label="Species" options={options} onValueChange={onValueChange} />);
    const combobox = screen.getByRole("combobox");
    await userEvent.click(combobox);
    await userEvent.keyboard("z");
    await userEvent.keyboard("r");
    await userEvent.keyboard("{Enter}");
    expect(onValueChange).toHaveBeenCalledWith("rabbit");
  });

  it("opens when a letter is typed on the closed list", async () => {
    render(<Select label="Species" options={options} />);
    screen.getByRole("combobox").focus();
    await userEvent.keyboard("c");
    expect(screen.getByRole("listbox")).toBeInTheDocument();
  });

  it("closes with a second click on the trigger and ignores Escape when it is already closed", async () => {
    render(<Select label="Species" options={options} />);
    const combobox = screen.getByRole("combobox");
    await userEvent.keyboard("{Escape}");
    await userEvent.click(combobox);
    await userEvent.click(combobox);
    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
  });

  it("does not pick a disabled option", async () => {
    const onValueChange = vi.fn();
    render(<Select label="Species" options={options} onValueChange={onValueChange} />);
    await userEvent.click(screen.getByRole("combobox"));
    await userEvent.click(screen.getByRole("option", { name: "Bird" }));
    expect(onValueChange).not.toHaveBeenCalled();
  });

  it("leaves the keys to a handler that already handled them", async () => {
    render(<Select label="Species" options={options} onKeyDown={(event) => event.preventDefault()} />);
    screen.getByRole("combobox").focus();
    await userEvent.keyboard("{ArrowDown}");
    expect(screen.getByRole("combobox")).toHaveAttribute("aria-expanded", "false");
  });
});

describe("Select unhandled keys", () => {
  it("ignores Escape, Home, other arrows and shortcuts while it is closed", async () => {
    render(<Select label="Species" options={options} />);
    const combobox = screen.getByRole("combobox");
    combobox.focus();
    await userEvent.keyboard("{Escape}{Home}{ArrowLeft}{Control>}c{/Control}");
    expect(combobox).toHaveAttribute("aria-expanded", "false");
  });
});
