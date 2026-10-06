import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Edit } from "@/components/ui/Icon";

import { MenuItem } from "./MenuItem";

describe("MenuItem", () => {
  it("renders its label", () => {
    render(<MenuItem role="menuitem">Reschedule</MenuItem>);
    expect(screen.getByRole("menuitem", { name: "Reschedule" })).toBeInTheDocument();
  });

  it("hides the icon and the check from assistive tech", () => {
    const { container } = render(
      <MenuItem icon={Edit} selected role="option" aria-selected>
        Reschedule
      </MenuItem>,
    );
    const icons = container.querySelectorAll("svg");
    expect(icons).toHaveLength(2);
    icons.forEach((icon) => expect(icon).toHaveAttribute("aria-hidden", "true"));
  });
});
