import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { PageIntro } from "./PageIntro";

describe("PageIntro", () => {
  it("shows the breadcrumbs and the page title as the main heading", () => {
    render(
      <PageIntro
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Services" }]}
        eyebrow="Services"
        title="Care for every stage"
        description="Book online."
      />,
    );
    expect(screen.getByRole("heading", { level: 1, name: "Care for every stage" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Home" })).toHaveAttribute("href", "/");
    expect(screen.getByText("Book online.")).toBeInTheDocument();
  });
});
