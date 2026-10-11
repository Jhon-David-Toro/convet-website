import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import { ToastProvider } from "@/components/ui/Toast";
import { PRODUCT_DETAIL } from "@/lib/admin.constants";

import { ProductLots } from "./ProductLots";
import { productCrumbs, productStats, signedQuantity } from "./ProductLots.utils";

/**
 * Renders the product page with the toasts it needs.
 *
 * @returns The Testing Library render result.
 */
function renderPage() {
  return render(
    <ToastProvider>
      <ProductLots product={PRODUCT_DETAIL} />
    </ToastProvider>,
  );
}

describe("ProductLots", () => {
  it("shows the product, its figures, its lots and the note about movements", () => {
    renderPage();
    expect(screen.getByRole("heading", { level: 1, name: "Rabies vaccine, inactivated" })).toBeInTheDocument();
    expect(screen.getByText("60 days")).toBeInTheDocument();
    expect(screen.getByRole("table", { name: "Lots" })).toBeInTheDocument();
    expect(screen.getByText("Expired · blocked")).toBeInTheDocument();
    expect(screen.getByText("Stock can't be edited directly")).toBeInTheDocument();
    expect(screen.getByRole("tab", { name: /Lots/ })).toHaveTextContent("3");
  });

  it("lists the recent movements with their signed quantity", () => {
    renderPage();
    expect(screen.getByText("Receipt")).toBeInTheDocument();
    expect(screen.getByText("+20")).toBeInTheDocument();
    expect(screen.getAllByText("−1")).toHaveLength(2);
  });

  it("switches tabs and opens the movement dialog", async () => {
    renderPage();
    await userEvent.click(screen.getByRole("tab", { name: "Settings" }));
    expect(screen.getByLabelText("Minimum stock")).toBeInTheDocument();
    await userEvent.click(screen.getByRole("button", { name: "Dispense" }));
    expect(screen.getByRole("dialog", { name: "Record stock movement" })).toBeInTheDocument();
  });
});

describe("product lots utils", () => {
  it("builds the path and the figures", () => {
    expect(productCrumbs(PRODUCT_DETAIL).map((crumb) => crumb.label)).toEqual(["Stock", "Vaccines", "Rabies vaccine, inactivated"]);
    expect(productStats(PRODUCT_DETAIL).map((stat) => stat.value)).toEqual([26, "60 days", 2]);
  });

  it("signs the quantity of a movement", () => {
    expect(signedQuantity(20)).toBe("+20");
    expect(signedQuantity(-1)).toBe("−1");
  });
});
