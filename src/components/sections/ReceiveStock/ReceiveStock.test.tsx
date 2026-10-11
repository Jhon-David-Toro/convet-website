import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { ToastProvider } from "@/components/ui/Toast";
import { RECEIPT_LINES } from "@/lib/admin.constants";
import { pickOption } from "@/test/pickOption";

import { ReceiveStock } from "./ReceiveStock";
import { expiryError, quantityText, findCatalogProduct, saveLabel, similarProducts, stockLabel } from "./ReceiveStock.utils";

const push = vi.fn();

vi.mock("next/navigation", () => ({ useRouter: () => ({ push }) }));

/**
 * Renders the receive stock page with the toasts it needs.
 *
 * @returns The Testing Library render result.
 */
function renderPage() {
  return render(
    <ToastProvider>
      <ReceiveStock />
    </ToastProvider>,
  );
}

describe("ReceiveStock", () => {
  it("shows the delivery, the lines and blocks saving while a date has passed", () => {
    renderPage();
    expect(screen.getByRole("heading", { level: 1, name: "Receive stock" })).toBeInTheDocument();
    expect(screen.getByLabelText(/Invoice/)).toHaveValue("INV-4512");
    expect(screen.getByText("This date has already passed. Expired stock can't be received.")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Save receipt (fix 1 error)" })).toBeDisabled();
  });

  it("lists the similar products of a medication with a note", () => {
    renderPage();
    expect(screen.getByText("3 similar products — check strength and pack before choosing")).toBeInTheDocument();
    expect(screen.getByRole("radio", { name: /Carprofen 25 mg/ })).not.toBeChecked();
    expect(screen.getByRole("radio", { name: /Carprofen 50 mg/ })).toBeChecked();
  });

  it("lets the user pick another strength, remove the line with the error and save", async () => {
    renderPage();
    await userEvent.click(screen.getByRole("radio", { name: /Carprofen 100 mg/ }));
    expect(screen.getByRole("radio", { name: /Carprofen 100 mg/ })).toBeChecked();
    await userEvent.click(screen.getAllByRole("button", { name: "Remove product" })[1]);
    const save = screen.getByRole("button", { name: "Save receipt" });
    expect(save).toBeEnabled();
    await userEvent.click(save);
    expect(push).toHaveBeenCalledWith("/admin/inventory");
    expect(await screen.findByText("Receipt saved. Stock updated.")).toBeInTheDocument();
  });

  it("adds a new product line", async () => {
    renderPage();
    await userEvent.click(screen.getByRole("button", { name: "Add product" }));
    expect(screen.getAllByRole("button", { name: "Remove product" })).toHaveLength(3);
  });
});

describe("receive stock utils", () => {
  it("finds a product and its similar ones", () => {
    expect(findCatalogProduct("carprofen-50").name).toBe("Carprofen 50 mg");
    expect(findCatalogProduct("nope").id).toBe("rabies");
    expect(similarProducts("carprofen-25")).toHaveLength(3);
    expect(similarProducts("rabies")).toHaveLength(1);
  });

  it("flags an expiry earlier than the day of delivery", () => {
    expect(expiryError(RECEIPT_LINES[1], "10 / 01 / 2026")).toBeDefined();
    expect(expiryError(RECEIPT_LINES[0], "10 / 01 / 2026")).toBeUndefined();
    expect(expiryError({ ...RECEIPT_LINES[1], expiry: "" }, "10 / 01 / 2026")).toBeUndefined();
  });

  it("writes the labels of the stock, the quantity and the save button", () => {
    expect(stockLabel(findCatalogProduct("carprofen-100"))).toBe("Low stock · 3");
    expect(stockLabel(findCatalogProduct("rabies"))).toBe("In stock · 42");
    expect(quantityText(findCatalogProduct("rabies"), 30)).toBe("30 doses");
    expect(saveLabel(0)).toBe("Save receipt");
    expect(saveLabel(2)).toBe("Save receipt (fix 2 errors)");
  });
});

describe("ReceiveStock fields", () => {
  it("changes the supplier, the invoice and the day received", async () => {
    renderPage();
    await pickOption("Supplier", "Island Pharma");
    expect(screen.getByRole("combobox", { name: "Supplier" })).toHaveTextContent("Island Pharma");
    const invoice = screen.getByLabelText(/Invoice/);
    await userEvent.clear(invoice);
    await userEvent.type(invoice, "INV-9");
    expect(invoice).toHaveValue("INV-9");
    const received = screen.getByLabelText("Received on");
    await userEvent.clear(received);
    await userEvent.type(received, "10152026");
    expect(received).toHaveValue("10 / 15 / 2026");
  });

  it("edits the product, the lot, the expiry and the quantity of a line", async () => {
    renderPage();
    await pickOption("Product", "Carprofen 25 mg", 0);
    expect(screen.getAllByRole("combobox", { name: "Product" })[0]).toHaveTextContent("Carprofen 25 mg");
    const lot = screen.getAllByLabelText("Lot number")[0];
    await userEvent.clear(lot);
    await userEvent.type(lot, "RB-1");
    expect(lot).toHaveValue("RB-1");
    const expiry = screen.getAllByLabelText("Expiry")[0];
    await userEvent.clear(expiry);
    await userEvent.type(expiry, "12312027");
    expect(expiry).toHaveValue("12 / 31 / 2027");
    const quantity = screen.getAllByLabelText("Quantity")[0];
    await userEvent.clear(quantity);
    await userEvent.type(quantity, "12");
    expect(quantity).toHaveValue("12");
  });
});
