import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { SectionHeader } from "./SectionHeader";

describe("SectionHeader", () => {
  it("renders the title as the requested heading level", () => {
    render(<SectionHeader title="How we care for your pet" titleAs="h1" />);
    expect(screen.getByRole("heading", { level: 1, name: "How we care for your pet" })).toBeInTheDocument();
  });

  it("renders the optional eyebrow and description", () => {
    render(<SectionHeader eyebrow="Services" title="Care" description="A team that explains every step." />);
    expect(screen.getByText("Services")).toBeInTheDocument();
    expect(screen.getByText("A team that explains every step.")).toBeInTheDocument();
  });

  it("keeps the decorative underline out of the accessibility tree", () => {
    const { container } = render(<SectionHeader title="Care" />);
    expect(container.querySelector("svg")).toHaveAttribute("aria-hidden", "true");
  });
});
