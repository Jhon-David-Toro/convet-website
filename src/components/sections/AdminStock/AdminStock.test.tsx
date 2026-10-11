import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import { ToastProvider } from "@/components/ui/Toast";

import { AdminStock } from "./AdminStock";
import { onHandLine, stockRows } from "./AdminStock.utils";

/**
 * Renders the stock page with the toasts it needs.
 *
 * @returns The Testing Library render result.
 */
function renderPage() {
  return render(
    <ToastProvider>
      <AdminStock />
    </ToastProvider>,
  );
}

describe("AdminStock", () => {
  it("shows the figures, the filters and the products", () => {
    renderPage();
    expect(screen.getByRole("heading", { level: 1, name: "Stock" })).toBeInTheDocument();
    expect(screen.getByText("Products in stock")).toBeInTheDocument();
    expect(screen.getByRole("table", { name: "Stock by product" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Needs attention/ })).toHaveTextContent("8");
    expect(screen.getByText("Showing 1–7 of 148")).toBeInTheDocument();
  });

  it("filters by what needs attention and by search", async () => {
    renderPage();
    await userEvent.click(screen.getByRole("button", { name: /Needs attention/ }));
    expect(screen.getAllByRole("row", { name: /Carprofen/ }).length).toBeGreaterThan(0);
    expect(screen.queryByRole("cell", { name: "DHPP vaccine" })).not.toBeInTheDocument();
    await userEvent.click(screen.getByRole("button", { name: /^All/ }));
    await userEvent.type(screen.getByRole("searchbox"), "lepto");
    expect(screen.getByRole("table", { name: "Stock by product" })).toHaveTextContent("Leptospirosis vaccine");
  });

  it("sorts by what is on hand", async () => {
    renderPage();
    await userEvent.click(screen.getByRole("button", { name: "On hand" }));
    const names = screen.getAllByRole("row").slice(1, 2);
    expect(names[0]).toHaveTextContent("DHPP vaccine");
  });

  it("opens the movement dialog from Adjust and from Dispense", async () => {
    renderPage();
    await userEvent.click(screen.getAllByRole("button", { name: "Adjust" })[0]);
    expect(screen.getByRole("dialog", { name: "Record stock movement" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Adjustment" })).toHaveAttribute("aria-pressed", "true");
    await userEvent.click(screen.getByRole("button", { name: "Cancel" }));
    await userEvent.click(screen.getAllByRole("button", { name: "Dispense" })[0]);
    expect(screen.getByRole("button", { name: "Clinical use" })).toHaveAttribute("aria-pressed", "true");
  });
});

describe("admin stock utils", () => {
  it("filters the products", () => {
    expect(stockRows("all", "", "none")).toHaveLength(7);
    expect(stockRows("medications", "", "none")).toHaveLength(5);
    expect(stockRows("attention", "", "none").map((product) => product.id)).toEqual(["rabies", "carprofen", "flea", "joint"]);
  });

  it("sorts by on hand in both directions", () => {
    expect(stockRows("all", "", "descending")[0].onHand).toBe(34);
    expect(stockRows("all", "", "ascending")[0].onHand).toBe(0);
  });

  it("describes what is on hand against the minimum", () => {
    expect(onHandLine(stockRows("all", "dhpp", "none")[0])).toBe("34 on hand · min 12");
  });
});
