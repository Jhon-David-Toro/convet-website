import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Field } from "./Field";

describe("Field", () => {
  it("points its label at the control", () => {
    render(
      <Field id="pet" label="Pet name">
        <input id="pet" />
      </Field>,
    );
    expect(screen.getByLabelText("Pet name")).toBe(screen.getByRole("textbox"));
  });

  it("marks optional fields", () => {
    render(
      <Field id="pet" label="Pet name" optional>
        <input id="pet" />
      </Field>,
    );
    expect(screen.getByLabelText(/optional/)).toBeInTheDocument();
  });

  it("shows the helper, and the error replaces it", () => {
    const { rerender } = render(
      <Field id="pet" label="Pet name" helper="As it appears on the card.">
        <input id="pet" />
      </Field>,
    );
    expect(screen.getByText("As it appears on the card.").closest("p")).toHaveAttribute("id", "pet-message");
    rerender(
      <Field id="pet" label="Pet name" helper="As it appears on the card." error="Enter your pet's name.">
        <input id="pet" />
      </Field>,
    );
    expect(screen.queryByText("As it appears on the card.")).not.toBeInTheDocument();
    expect(screen.getByText("Enter your pet's name.")).toBeInTheDocument();
  });
});
