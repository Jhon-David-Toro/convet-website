import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Check } from "@/components/ui/Icon";

import { Badge } from "./Badge";

describe("Badge", () => {
  it("renders its text", () => {
    render(<Badge tone="success">Scheduled</Badge>);
    expect(screen.getByText("Scheduled")).toBeInTheDocument();
  });

  it("hides the optional icon from assistive tech", () => {
    const { container } = render(<Badge icon={Check}>Done</Badge>);
    expect(container.querySelector("svg")).toHaveAttribute("aria-hidden", "true");
  });
});
