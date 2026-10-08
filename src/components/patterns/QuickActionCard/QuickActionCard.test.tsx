import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Calendar } from "@/components/ui/Icon";

import { QuickActionCard } from "./QuickActionCard";

describe("QuickActionCard", () => {
  it("is a link named by its title and description", () => {
    render(<QuickActionCard href="/book" icon={Calendar} title="Book a visit" description="Pick a vet, day and time" />);
    const link = screen.getByRole("link", { name: /Book a visit/ });
    expect(link).toHaveAttribute("href", "/book");
    expect(link).toHaveTextContent("Pick a vet, day and time");
  });

  it.each(["default", "primary", "whatsapp", "emergency"] as const)("renders the %s tone", (tone) => {
    render(<QuickActionCard href="/x" icon={Calendar} title="T" description="D" tone={tone} />);
    expect(screen.getByRole("link")).toBeInTheDocument();
  });
});
