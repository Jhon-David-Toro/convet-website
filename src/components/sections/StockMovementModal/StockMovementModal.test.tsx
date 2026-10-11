import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { ToastProvider } from "@/components/ui/Toast";
import { PRODUCT_DETAIL } from "@/lib/admin.constants";

import { StockMovementModal } from "./StockMovementModal";
import { initialMovement, lotOption, newBalance, quantityProblem, reasonProblem } from "./StockMovementModal.utils";

/**
 * Renders the open dialog with the toasts it needs.
 *
 * @param onClose Called when the dialog closes.
 * @returns The Testing Library render result.
 */
function renderModal(onClose = vi.fn()) {
  return render(
    <ToastProvider>
      <StockMovementModal open onClose={onClose} productName="Rabies vaccine, inactivated" lots={PRODUCT_DETAIL.lots} />
    </ToastProvider>,
  );
}

describe("StockMovementModal", () => {
  it("opens as an adjustment on the first lot and shows the new balance", () => {
    renderModal();
    expect(screen.getByRole("dialog", { name: "Record stock movement" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Adjustment" })).toHaveAttribute("aria-pressed", "true");
    expect(screen.getByText("New balance: 5")).toBeInTheDocument();
  });

  it("asks for a reason on adjustments and records the movement once it is given", async () => {
    const onClose = vi.fn();
    renderModal(onClose);
    expect(screen.getByRole("button", { name: "Record adjustment" })).toBeDisabled();
    await userEvent.type(screen.getByLabelText(/Reason/), "Physical count found 5 vials.");
    await userEvent.click(screen.getByRole("button", { name: "Record adjustment" }));
    expect(onClose).toHaveBeenCalled();
    expect(await screen.findByText("Stock movement recorded.")).toBeInTheDocument();
  });

  it("does not need a reason for clinical use and renames the button", async () => {
    renderModal();
    await userEvent.click(screen.getByRole("button", { name: "Clinical use" }));
    expect(screen.getByRole("button", { name: "Record use" })).toBeEnabled();
  });

  it("rejects a quantity bigger than what is on hand", async () => {
    renderModal();
    const quantity = screen.getByLabelText("Quantity");
    await userEvent.clear(quantity);
    await userEvent.type(quantity, "9");
    expect(screen.getByText("That is more than what is on hand.")).toBeInTheDocument();
  });
});

describe("stock movement utils", () => {
  it("starts on the first lot with one unit removed", () => {
    expect(initialMovement(PRODUCT_DETAIL.lots, "waste")).toEqual({ type: "waste", lot: "RB-24187", direction: "remove", quantity: "1", reason: "" });
  });

  it("describes a lot and computes the balance in both directions", () => {
    const values = initialMovement(PRODUCT_DETAIL.lots);
    expect(lotOption(PRODUCT_DETAIL.lots[0])).toBe("RB-24187 · exp Nov 30, 2026 · 6 on hand");
    expect(newBalance(values, PRODUCT_DETAIL.lots)).toBe(5);
    expect(newBalance({ ...values, direction: "add", quantity: "4" }, PRODUCT_DETAIL.lots)).toBe(10);
    expect(newBalance({ ...values, quantity: "abc" }, PRODUCT_DETAIL.lots)).toBe(6);
  });

  it("validates the quantity and the reason", () => {
    const values = initialMovement(PRODUCT_DETAIL.lots);
    expect(quantityProblem({ ...values, quantity: "0" }, 6)).toBe("Enter a whole number greater than 0.");
    expect(quantityProblem(values, -1)).toBe("That is more than what is on hand.");
    expect(quantityProblem(values, 5)).toBeUndefined();
    expect(reasonProblem(values)).toBe("Add a reason for the adjustment.");
    expect(reasonProblem({ ...values, type: "waste" })).toBeUndefined();
  });
});
