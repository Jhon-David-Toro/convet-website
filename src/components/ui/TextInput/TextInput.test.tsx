import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import { TextInput } from "./TextInput";

describe("TextInput", () => {
  it("is labelled and accepts typing", async () => {
    render(<TextInput label="Pet name" />);
    const input = screen.getByRole("textbox", { name: "Pet name" });
    await userEvent.type(input, "Luna");
    expect(input).toHaveValue("Luna");
  });

  it("describes itself with the helper", () => {
    render(<TextInput label="Pet name" helper="As it appears on the vaccination card." />);
    expect(screen.getByRole("textbox")).toHaveAccessibleDescription("As it appears on the vaccination card.");
  });

  it("is invalid and described by the error", () => {
    render(<TextInput label="Pet name" helper="Helper" error="Enter your pet's name." />);
    const input = screen.getByRole("textbox");
    expect(input).toBeInvalid();
    expect(input).toHaveAccessibleDescription("Enter your pet's name.");
  });

  it("can be disabled", () => {
    render(<TextInput label="Pet name" disabled />);
    expect(screen.getByRole("textbox")).toBeDisabled();
  });
});
