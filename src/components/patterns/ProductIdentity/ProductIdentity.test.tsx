import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { ProductIdentity } from "./ProductIdentity";

const props = {
  name: "Carprofen 50 mg",
  kind: "Medication",
  presentation: "Tablets · 50 mg · box of 14 · Pain & inflammation",
  sku: "MED-PAI-CAR-050",
  uuid: "2c8e…91fa",
  stock: "In stock · 42",
};

describe("ProductIdentity", () => {
  it("shows name, type, presentation, ids and stock", () => {
    render(<ProductIdentity {...props} />);
    expect(screen.getByText("Carprofen 50 mg")).toBeInTheDocument();
    expect(screen.getByText("Medication")).toBeInTheDocument();
    expect(screen.getByText("SKU MED-PAI-CAR-050")).toBeInTheDocument();
    expect(screen.getByText("UUID 2c8e…91fa")).toBeInTheDocument();
    expect(screen.getByText("In stock · 42")).toBeInTheDocument();
  });

  it("is a toggle button: aria-pressed follows selected and click is forwarded", async () => {
    const onClick = vi.fn();
    const { rerender } = render(<ProductIdentity {...props} onClick={onClick} />);
    expect(screen.getByRole("button")).toHaveAttribute("aria-pressed", "false");
    await userEvent.click(screen.getByRole("button"));
    expect(onClick).toHaveBeenCalledOnce();
    rerender(<ProductIdentity {...props} selected />);
    expect(screen.getByRole("button")).toHaveAttribute("aria-pressed", "true");
  });
});
