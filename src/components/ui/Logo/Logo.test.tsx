import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Logo } from "./Logo";

describe("Logo", () => {
  it("shows the wordmark and keeps the seal decorative in the full version", () => {
    const { container } = render(<Logo />);
    expect(screen.getByText("CONVET")).toBeInTheDocument();
    expect(screen.getByText("Contreras Veterinary Services N.V.")).toBeInTheDocument();
    expect(container.querySelector("img")).toHaveAttribute("alt", "");
  });

  it("names the seal in the mark version", () => {
    render(<Logo variant="mark" />);
    expect(screen.getByRole("img", { name: "CONVET" })).toBeInTheDocument();
    expect(screen.queryByText("Contreras Veterinary Services N.V.")).not.toBeInTheDocument();
  });
});
