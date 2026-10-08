import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { BookingStep } from "./BookingStep";

const inList = (node: React.ReactNode) => <ol>{node}</ol>;

describe("BookingStep", () => {
  it("marks the current step with aria-current", () => {
    render(inList(<BookingStep state="current" number={3} label="Date & time" />));
    expect(screen.getByRole("listitem")).toHaveAttribute("aria-current", "step");
    expect(screen.getByText("3")).toBeInTheDocument();
  });

  it("done shows a check instead of the number and says it is completed", () => {
    const { container } = render(inList(<BookingStep state="done" number={1} label="Pet" />));
    expect(screen.queryByText("1")).not.toBeInTheDocument();
    expect(container.querySelector("svg")).toBeInTheDocument();
    expect(screen.getByText("(completed)")).toBeInTheDocument();
  });

  it("upcoming shows the number and no aria-current", () => {
    render(inList(<BookingStep state="upcoming" number={4} label="Confirm" />));
    expect(screen.getByRole("listitem")).not.toHaveAttribute("aria-current");
  });
});
