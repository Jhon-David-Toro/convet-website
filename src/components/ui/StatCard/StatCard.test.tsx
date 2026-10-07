import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Calendar } from "@/components/ui/Icon";

import { StatCard } from "./StatCard";

describe("StatCard", () => {
  it("shows the label, value and caption", () => {
    render(<StatCard label="Appointments today" value={14} caption="3 booked online" icon={Calendar} />);
    expect(screen.getByText("Appointments today")).toBeInTheDocument();
    expect(screen.getByText("14")).toBeInTheDocument();
    expect(screen.getByText("3 booked online")).toBeInTheDocument();
  });

  it("keeps the icon decorative and the caption optional", () => {
    const { container } = render(<StatCard label="Stock" value="2" icon={Calendar} tone="warning" />);
    expect(container.querySelector("svg")).toHaveAttribute("aria-hidden", "true");
    expect(screen.queryByText("3 booked online")).not.toBeInTheDocument();
  });
});
