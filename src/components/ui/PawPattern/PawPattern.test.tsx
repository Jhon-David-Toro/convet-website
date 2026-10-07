import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { PawPattern } from "./PawPattern";

describe("PawPattern", () => {
  it("is decorative and draws the six paws of Figma", () => {
    const { container } = render(<PawPattern />);
    expect(container.firstElementChild).toHaveAttribute("aria-hidden", "true");
    expect(container.querySelectorAll("svg")).toHaveLength(6);
  });
});
