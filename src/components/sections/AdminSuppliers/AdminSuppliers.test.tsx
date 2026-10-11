import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { AdminSuppliers } from "./AdminSuppliers";

describe("AdminSuppliers", () => {
  it("lists the suppliers and the note about purchase orders", () => {
    render(<AdminSuppliers />);
    expect(screen.getByRole("heading", { level: 1, name: "Suppliers" })).toBeInTheDocument();
    expect(screen.getByRole("cell", { name: "Caribbean Vet Supply" })).toBeInTheDocument();
    expect(screen.getAllByRole("row")).toHaveLength(5);
    expect(screen.getByText("Purchase orders come later")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Add supplier" })).toBeInTheDocument();
  });
});
