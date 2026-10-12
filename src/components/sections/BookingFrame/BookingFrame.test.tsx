import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { BookingFrame } from "./BookingFrame";
import { progressLabel, progressPercent, stepState } from "./BookingFrame.utils";

const steps = ["Pet", "Service", "Vet", "Date & time", "Review"];

describe("BookingFrame", () => {
  it("shows the steps with the current one marked", () => {
    render(
      <BookingFrame steps={steps} current={1} mobileTitle="Book a visit" exitHref="/app">
        <h1>Step content</h1>
      </BookingFrame>,
    );
    const stepper = screen.getByRole("list", { name: "Booking steps" });
    expect(stepper.querySelectorAll("li")).toHaveLength(5);
    expect(stepper.querySelector("[aria-current='step']")).toHaveTextContent("Service");
    expect(screen.getByRole("main")).toHaveTextContent("Step content");
  });

  it("offers a way out in the header and on mobile", () => {
    render(
      <BookingFrame steps={steps} current={0} mobileTitle="Book a visit" exitHref="/app">
        <p>Content</p>
      </BookingFrame>,
    );
    expect(screen.getByRole("link", { name: "Exit" })).toHaveAttribute("href", "/app");
    expect(screen.getByRole("link", { name: "Close" })).toHaveAttribute("href", "/app");
  });

  it("renders the side card and the bottom bar only when they are given", () => {
    const { rerender } = render(
      <BookingFrame steps={steps} current={0} mobileTitle="Book a visit" exitHref="/app">
        <p>Content</p>
      </BookingFrame>,
    );
    expect(screen.queryByRole("complementary")).not.toBeInTheDocument();
    rerender(
      <BookingFrame steps={steps} current={0} mobileTitle="Book a visit" exitHref="/app" side={<p>Summary</p>} bar={<p>Bar</p>}>
        <p>Content</p>
      </BookingFrame>,
    );
    expect(screen.getByRole("complementary")).toHaveTextContent("Summary");
    expect(screen.getByText("Bar")).toBeInTheDocument();
  });
});

describe("booking frame utils", () => {
  it("tells the state of a step and writes the progress", () => {
    expect(stepState(0, 2)).toBe("done");
    expect(stepState(2, 2)).toBe("current");
    expect(stepState(3, 2)).toBe("upcoming");
    expect(progressLabel(steps, 3)).toBe("Step 4 of 5 · Date & time");
    expect(progressPercent(steps, 3)).toBe(80);
  });

  it("keeps the last step and a full bar once everything is done", () => {
    expect(progressLabel(steps, steps.length)).toBe(`Step ${steps.length} of ${steps.length} · ${steps[steps.length - 1]}`);
    expect(progressPercent(steps, steps.length)).toBe(100);
  });
});
