import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { TimeInput } from "./TimeInput";

describe("TimeInput", () => {
  it("renders the time mask as placeholder", () => {
    render(<TimeInput label="Time" />);
    expect(screen.getByRole("combobox", { name: "Time" })).toHaveAttribute("placeholder", "h:mm AM");
  });
});
