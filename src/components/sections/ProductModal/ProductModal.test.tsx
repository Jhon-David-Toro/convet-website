import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { ToastProvider } from "@/components/ui/Toast";
import { pickOption } from "@/test/pickOption";

import { ProductModal } from "./ProductModal";
import { errorTitle, validateProduct } from "./ProductModal.utils";

describe("ProductModal", () => {
  beforeEach(() => vi.useFakeTimers({ shouldAdvanceTime: true }));
  afterEach(() => vi.useRealTimers());

  it("lists what is missing", async () => {
    render(
      <ToastProvider>
        <ProductModal open onClose={() => {}} />
      </ToastProvider>,
    );
    await userEvent.click(screen.getByRole("button", { name: "Create product" }));
    expect(screen.getByRole("alert")).toHaveTextContent("Fix 5 fields to create the product");
    expect(screen.getByText("Enter the product name.")).toBeInTheDocument();
    expect(screen.getByText(/Use capital letters/)).toBeInTheDocument();
  });

  it("creates a valid product and closes", async () => {
    const onClose = vi.fn();
    render(
      <ToastProvider>
        <ProductModal open onClose={onClose} />
      </ToastProvider>,
    );
    await userEvent.click(screen.getByRole("button", { name: "Supplement" }));
    await userEvent.type(screen.getByLabelText("Name"), "Probiotic paste");
    await pickOption("Category", "Digestive care");
    await pickOption("Unit", "Syringe");
    await userEvent.type(screen.getByLabelText("SKU"), "sup-dig-pro-015");
    await userEvent.type(screen.getByLabelText("Minimum stock"), "6");
    await userEvent.click(screen.getByRole("button", { name: "Create product" }));
    act(() => void vi.advanceTimersByTime(900));
    expect(onClose).toHaveBeenCalledTimes(1);
    expect(screen.getByText("Product created.")).toBeInTheDocument();
  });
});

describe("product utils", () => {
  it("validates the SKU and the minimum", () => {
    const valid = { kind: "Medication", name: "A", category: "vaccines", presentation: "", unit: "dose", sku: "MED-VAC-01", minimum: "6", tracksLots: "yes", prescription: false, published: true };
    expect(validateProduct(valid)).toEqual({});
    expect(Object.keys(validateProduct({ ...valid, sku: "med vac", minimum: "-1" }))).toEqual(["sku", "minimum"]);
    expect(errorTitle(1)).toBe("Fix 1 field to create the product");
  });
});
