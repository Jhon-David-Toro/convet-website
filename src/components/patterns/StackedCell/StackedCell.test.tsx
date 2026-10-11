import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { StackedCell } from "./StackedCell";

describe("StackedCell", () => {
  it("shows both lines", () => {
    render(<StackedCell primary="Dr. Shirley" secondary="User ID USR-1a7f" />);
    expect(screen.getByText("Dr. Shirley")).toBeInTheDocument();
    expect(screen.getByText("User ID USR-1a7f")).toBeInTheDocument();
  });

  it("forwards native attributes", () => {
    render(<StackedCell primary="VET-002" secondary="Vet number" mono data-testid="cell" />);
    expect(screen.getByTestId("cell")).toBeInTheDocument();
  });
});
