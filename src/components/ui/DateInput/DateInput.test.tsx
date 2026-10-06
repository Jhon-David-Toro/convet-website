import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { DateInput } from "./DateInput";

describe("DateInput", () => {
  it("renders the date mask as placeholder", () => {
    render(<DateInput label="Date of birth" />);
    expect(screen.getByRole("textbox", { name: "Date of birth" })).toHaveAttribute("placeholder", "MM / DD / YYYY");
  });
});
