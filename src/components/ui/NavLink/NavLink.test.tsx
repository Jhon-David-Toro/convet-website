import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { NavLink } from "./NavLink";

describe("NavLink", () => {
  it("is a link to its href", () => {
    render(<NavLink href="/services">Services</NavLink>);
    expect(screen.getByRole("link", { name: "Services" })).toHaveAttribute("href", "/services");
  });

  it("marks the current page", () => {
    const { rerender } = render(<NavLink href="/services">Services</NavLink>);
    expect(screen.getByRole("link")).not.toHaveAttribute("aria-current");
    rerender(
      <NavLink href="/services" active>
        Services
      </NavLink>,
    );
    expect(screen.getByRole("link")).toHaveAttribute("aria-current", "page");
  });
});
