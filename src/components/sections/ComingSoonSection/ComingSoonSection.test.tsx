import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { ComingSoonSection } from "./ComingSoonSection";

describe("ComingSoonSection", () => {
  it("shows the title and the coming soon note", () => {
    render(<ComingSoonSection title="Privacy" />);
    expect(screen.getByRole("heading", { level: 1, name: "Privacy" })).toBeInTheDocument();
    expect(screen.getByText(/Coming soon/)).toBeInTheDocument();
  });
});
