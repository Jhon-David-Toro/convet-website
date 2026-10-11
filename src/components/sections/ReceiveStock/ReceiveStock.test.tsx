import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { ToastProvider } from "@/components/ui/Toast";
import { RECEIPT_LINES } from "@/lib/admin.constants";

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
