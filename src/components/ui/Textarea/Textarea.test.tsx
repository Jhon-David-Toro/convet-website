import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import { Textarea } from "./Textarea";

describe("Textarea", () => {
  it("is labelled and accepts typing", async () => {
    render(<Textarea label="Reason for visit" />);
    const textarea = screen.getByRole("textbox", { name: "Reason for visit" });
    await userEvent.type(textarea, "Limping");
    expect(textarea).toHaveValue("Limping");
  });

  it("is invalid and described by the error", () => {
    render(<Textarea label="Reason for visit" error="Keep it under 500 characters." />);
    const textarea = screen.getByRole("textbox");
    expect(textarea).toBeInvalid();
    expect(textarea).toHaveAccessibleDescription("Keep it under 500 characters.");
  });
});
