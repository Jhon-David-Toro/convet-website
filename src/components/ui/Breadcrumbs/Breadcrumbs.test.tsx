import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Breadcrumbs } from "./Breadcrumbs";

const items = [
  { label: "Inventory", href: "/inventory" },
  { label: "Vaccines", href: "/inventory/vaccines" },
  { label: "Rabies vaccine, inactivated" },
];

describe("Breadcrumbs", () => {
  it("is a labelled navigation with an ordered list", () => {
    render(<Breadcrumbs items={items} />);
    expect(screen.getByRole("navigation", { name: "Breadcrumb" })).toBeInTheDocument();
    expect(screen.getAllByRole("listitem")).toHaveLength(3);
  });

  it("links the ancestors and marks the last item as the current page", () => {
    render(<Breadcrumbs items={items} />);
    expect(screen.getByRole("link", { name: "Inventory" })).toHaveAttribute("href", "/inventory");
    expect(screen.queryByRole("link", { name: "Rabies vaccine, inactivated" })).not.toBeInTheDocument();
    expect(screen.getByText("Rabies vaccine, inactivated")).toHaveAttribute("aria-current", "page");
  });

  it("keeps the separators out of the accessibility tree", () => {
    const { container } = render(<Breadcrumbs items={items} />);
    container.querySelectorAll("svg").forEach((svg) => expect(svg).toHaveAttribute("aria-hidden", "true"));
  });
});

describe("Breadcrumbs without links", () => {
  it("shows an ancestor without a link as plain text, not as the current page", () => {
    render(<Breadcrumbs items={[{ label: "Stock" }, { label: "Receive stock" }]} />);
    expect(screen.getByText("Stock")).not.toHaveAttribute("aria-current");
    expect(screen.getByText("Receive stock")).toHaveAttribute("aria-current", "page");
  });
});
