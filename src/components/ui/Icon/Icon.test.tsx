import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Icon } from "./Icon";
import { Paw } from "./icons";

describe("Icon", () => {
  it("is hidden from assistive tech when decorative", () => {
    const { container } = render(<Icon icon={Paw} />);
    expect(container.querySelector("svg")).toHaveAttribute("aria-hidden", "true");
    expect(screen.queryByRole("img")).not.toBeInTheDocument();
  });

  it("exposes an accessible name when labelled", () => {
    render(<Icon icon={Paw} label="Paw" />);
    expect(screen.getByRole("img", { name: "Paw" })).toBeInTheDocument();
  });

  it("keeps a 1.75px stroke at every size", () => {
    const { container, rerender } = render(<Icon icon={Paw} size="large" />);
    expect(container.querySelector("svg")).toHaveAttribute("stroke-width", "1.75");
    // 20px: the stroke is compensated (1.75 × 24 / 20) so it renders at 1.75px
    rerender(<Icon icon={Paw} size="medium" />);
    expect(container.querySelector("svg")).toHaveAttribute("stroke-width", "2.1");
  });
});
