import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { ScriptAccent } from "./ScriptAccent";

describe("ScriptAccent", () => {
  it("shows the phrase and keeps the heart decorative", () => {
    const { container } = render(<ScriptAccent>Always animals first.</ScriptAccent>);
    expect(screen.getByText("Always animals first.")).toBeInTheDocument();
    expect(container.querySelector("svg")).toHaveAttribute("aria-hidden", "true");
  });
});
