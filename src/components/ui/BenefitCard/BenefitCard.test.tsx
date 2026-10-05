import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Heart } from "@/components/ui/Icon";

import { BenefitCard } from "./BenefitCard";

describe("BenefitCard", () => {
  it("shows the title as a heading and the description", () => {
    const { container } = render(<BenefitCard icon={Heart} title="Time to explain" description="30-minute consultations." />);
    expect(screen.getByRole("heading", { level: 3, name: "Time to explain" })).toBeInTheDocument();
    expect(screen.getByText("30-minute consultations.")).toBeInTheDocument();
    expect(container.querySelector("svg")).toHaveAttribute("aria-hidden", "true");
  });
});
