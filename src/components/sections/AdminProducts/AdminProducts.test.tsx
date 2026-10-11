import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { AdminProducts } from "./AdminProducts";

describe("AdminProducts", () => {
  it("lists the catalog with the prescription rule and the website state", () => {
    render(<AdminProducts />);
    expect(screen.getByRole("heading", { level: 1, name: "Products" })).toBeInTheDocument();
    expect(screen.getByText("Rabies vaccine, inactivated")).toBeInTheDocument();
    expect(screen.getAllByText("Rx only")).toHaveLength(2);
    expect(screen.getByText("Hidden")).toBeInTheDocument();
    expect(screen.getAllByText("Published")).toHaveLength(4);
  });
});
