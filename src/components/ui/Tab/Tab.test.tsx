import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Tab } from "./Tab";

describe("Tab", () => {
  it("is a tab that reports its selection and is the only tab stop when selected", () => {
    const { rerender } = render(<Tab>Vaccines</Tab>);
    expect(screen.getByRole("tab", { name: "Vaccines" })).toHaveAttribute("aria-selected", "false");
    expect(screen.getByRole("tab")).toHaveAttribute("tabindex", "-1");
    rerender(<Tab selected>Vaccines</Tab>);
    expect(screen.getByRole("tab")).toHaveAttribute("aria-selected", "true");
    expect(screen.getByRole("tab")).toHaveAttribute("tabindex", "0");
  });

  it("shows the optional count", () => {
    render(<Tab count={12}>Vaccines</Tab>);
    expect(screen.getByRole("tab")).toHaveTextContent("Vaccines12");
  });
});
