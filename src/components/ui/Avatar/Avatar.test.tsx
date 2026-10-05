import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Avatar } from "./Avatar";

describe("Avatar", () => {
  it("is decorative without a label", () => {
    const { container } = render(<Avatar subject="dog" />);
    expect(container.firstElementChild).toHaveAttribute("aria-hidden", "true");
  });

  it("exposes an accessible name when labelled", () => {
    render(<Avatar subject="cat" label="Luna" />);
    expect(screen.getByRole("img", { name: "Luna" })).toBeInTheDocument();
  });

  it("sizes the glyph from the Figma scale", () => {
    const { container } = render(<Avatar subject="person" size="large" />);
    expect(container.querySelector("svg")).toHaveAttribute("width", "44");
  });
});
