import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { MobileQuickActions } from "./MobileQuickActions";

describe("MobileQuickActions", () => {
  it("has book, chat and emergency actions", () => {
    render(<MobileQuickActions />);
    expect(screen.getByRole("link", { name: "Book" })).toHaveAttribute("href", "/book");
    expect(screen.getByRole("link", { name: "Chat" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "SOS 24/7" })).toHaveAttribute("href", "tel:+2975930404");
  });
});
