import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Home } from "@/components/ui/Icon";

import { NavItem } from "./NavItem";

describe("NavItem", () => {
  it("is a link with its label and a hidden icon", () => {
    const { container } = render(<NavItem href="/" icon={Home} label="Overview" />);
    expect(screen.getByRole("link", { name: "Overview" })).toHaveAttribute("href", "/");
    expect(container.querySelector("svg")).toHaveAttribute("aria-hidden", "true");
  });

  it("marks the current page", () => {
    render(<NavItem href="/" icon={Home} label="Overview" active />);
    expect(screen.getByRole("link")).toHaveAttribute("aria-current", "page");
  });

  it("shows the optional count", () => {
    render(<NavItem href="/stock" icon={Home} label="Stock" count={2} />);
    expect(screen.getByRole("link")).toHaveTextContent("Stock2");
  });
});
