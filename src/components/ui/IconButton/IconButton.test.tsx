import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { More } from "@/components/ui/Icon";

import { IconButton } from "./IconButton";

describe("IconButton", () => {
  it("exposes its label as the accessible name", () => {
    render(<IconButton icon={More} label="More options" />);
    expect(screen.getByRole("button", { name: "More options" })).toHaveAttribute("type", "button");
  });

  it("renders a link when href is provided", () => {
    render(<IconButton icon={More} label="Next page" href="/page/2" variant="outline" />);
    expect(screen.getByRole("link", { name: "Next page" })).toHaveAttribute("href", "/page/2");
  });

  it("supports disabled", () => {
    render(<IconButton icon={More} label="More options" disabled />);
    expect(screen.getByRole("button")).toBeDisabled();
  });
});
