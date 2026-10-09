import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { QuickAccessSection } from "./QuickAccessSection";

describe("QuickAccessSection", () => {
  it("lists the four shortcuts as links", () => {
    render(<QuickAccessSection />);
    const nav = screen.getByRole("navigation", { name: "Quick access" });
    expect(within(nav).getAllByRole("link")).toHaveLength(4);
    expect(within(nav).getByRole("link", { name: /services/i })).toHaveAttribute("href", "/services");
    expect(within(nav).getByRole("link", { name: /find the clinic/i })).toHaveAttribute("href", "#location");
  });
});
