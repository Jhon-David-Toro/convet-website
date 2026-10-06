import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { Chip } from "./Chip";

describe("Chip", () => {
  it("is a toggle button that reports its selection", () => {
    const { rerender } = render(<Chip>Vaccines</Chip>);
    expect(screen.getByRole("button", { name: "Vaccines" })).toHaveAttribute("aria-pressed", "false");
    rerender(<Chip selected>Vaccines</Chip>);
    expect(screen.getByRole("button", { name: "Vaccines" })).toHaveAttribute("aria-pressed", "true");
  });

  it("shows the optional count", () => {
    render(<Chip count={12}>Vaccines</Chip>);
    expect(screen.getByRole("button")).toHaveTextContent("Vaccines12");
  });

  it("does not fire onClick when disabled", async () => {
    const onClick = vi.fn();
    render(
      <Chip disabled onClick={onClick}>
        Vaccines
      </Chip>,
    );
    await userEvent.click(screen.getByRole("button"));
    expect(onClick).not.toHaveBeenCalled();
  });
});
