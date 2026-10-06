import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { CarouselControls } from "./CarouselControls";

describe("CarouselControls", () => {
  it("announces the position and renders one indicator per slide", () => {
    const { container } = render(<CarouselControls count={5} index={0} onPrevious={() => {}} onNext={() => {}} />);
    expect(screen.getByRole("status")).toHaveTextContent("Slide 1 of 5");
    expect(container.querySelectorAll("li")).toHaveLength(5);
  });

  it("disables previous on the first slide and next on the last", () => {
    const { rerender } = render(<CarouselControls count={3} index={0} onPrevious={() => {}} onNext={() => {}} />);
    expect(screen.getByRole("button", { name: "Previous slide" })).toBeDisabled();
    expect(screen.getByRole("button", { name: "Next slide" })).toBeEnabled();
    rerender(<CarouselControls count={3} index={2} onPrevious={() => {}} onNext={() => {}} />);
    expect(screen.getByRole("button", { name: "Next slide" })).toBeDisabled();
  });

  it("calls the handlers", async () => {
    const onPrevious = vi.fn();
    const onNext = vi.fn();
    render(<CarouselControls count={3} index={1} onPrevious={onPrevious} onNext={onNext} />);
    await userEvent.click(screen.getByRole("button", { name: "Previous slide" }));
    await userEvent.click(screen.getByRole("button", { name: "Next slide" }));
    expect(onPrevious).toHaveBeenCalledTimes(1);
    expect(onNext).toHaveBeenCalledTimes(1);
  });
});
