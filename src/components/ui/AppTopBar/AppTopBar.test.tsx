import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { AppTopBar } from "./AppTopBar";

describe("AppTopBar", () => {
  it("renders both slots inside a banner", () => {
    render(<AppTopBar start={<p>Good morning, Anna</p>} end={<button type="button">Book a visit</button>} />);
    expect(screen.getByRole("banner")).toBeInTheDocument();
    expect(screen.getByText("Good morning, Anna")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Book a visit" })).toBeInTheDocument();
  });
});
