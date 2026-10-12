import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { NotFoundSection } from "./NotFoundSection";

vi.mock("next/navigation", () => ({ useRouter: () => ({ back: vi.fn() }) }));

describe("NotFoundSection", () => {
  it("explains what happened and offers a way out", () => {
    render(<NotFoundSection />);
    expect(screen.getByRole("heading", { level: 1, name: "This page wandered off" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Back to home" })).toHaveAttribute("href", "/");
    expect(screen.getByRole("button", { name: "Go back" })).toBeInTheDocument();
  });

  it("lists the popular pages and the emergency number", () => {
    render(<NotFoundSection />);
    expect(screen.getByRole("link", { name: /Book a visit/ })).toHaveAttribute("href", "/book");
    expect(screen.getByRole("link", { name: /Contact & location/ })).toHaveAttribute("href", "/contact");
    expect(screen.getAllByText("593-0404").length).toBeGreaterThan(0);
  });
});
