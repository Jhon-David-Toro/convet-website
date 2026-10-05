import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { Plus } from "@/components/ui/Icon";

import { Button } from "./Button";

describe("Button", () => {
  it("renders a button that does not submit by default", () => {
    render(<Button>Book a visit</Button>);
    expect(screen.getByRole("button", { name: "Book a visit" })).toHaveAttribute("type", "button");
  });

  it("renders a link when href is provided", () => {
    render(<Button href="/book">Book a visit</Button>);
    expect(screen.getByRole("link", { name: "Book a visit" })).toHaveAttribute("href", "/book");
  });

  it("hides decorative icons from assistive tech", () => {
    const { container } = render(<Button leadingIcon={Plus}>Add pet</Button>);
    expect(container.querySelector("svg")).toHaveAttribute("aria-hidden", "true");
  });

  it("calls onClick when enabled", async () => {
    const onClick = vi.fn();
    render(<Button onClick={onClick}>Save</Button>);
    await userEvent.click(screen.getByRole("button"));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("ignores clicks and reports busy while loading", async () => {
    const onClick = vi.fn();
    render(
      <Button loading onClick={onClick}>
        Save
      </Button>,
    );
    const button = screen.getByRole("button");
    expect(button).toHaveAttribute("aria-busy", "true");
    expect(button).toBeDisabled();
    await userEvent.click(button);
    expect(onClick).not.toHaveBeenCalled();
  });

  it("does not fire onClick when disabled", async () => {
    const onClick = vi.fn();
    render(
      <Button disabled onClick={onClick}>
        Save
      </Button>,
    );
    await userEvent.click(screen.getByRole("button"));
    expect(onClick).not.toHaveBeenCalled();
  });
});
