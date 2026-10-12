import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import { ToastProvider } from "@/components/ui/Toast";
import { pickOption } from "@/test/pickOption";

import { StaffInventory } from "./StaffInventory";
import { INITIAL_FILTERS } from "./StaffInventory.constants";
import { filterInventory, findInventoryProduct, movementLots, needsAttention } from "./StaffInventory.utils";

describe("StaffInventory", () => {
  it("shows the figures, the role note and the first page of the table", () => {
    render(<StaffInventory />);
    expect(screen.getByRole("heading", { level: 1, name: "Inventory" })).toBeInTheDocument();
    expect(screen.getByText(/Editing product details is admin-only/)).toBeInTheDocument();
    expect(screen.getByText("Cannot be dispensed")).toBeInTheDocument();
    expect(screen.getAllByRole("row")).toHaveLength(8);
    expect(screen.getByText("Showing 1–7 of 48")).toBeInTheDocument();
  });

  it("lists the same products as cards for mobile", () => {
    render(<StaffInventory />);
    const cards = within(screen.getByRole("list", { name: "Inventory" })).getAllByRole("listitem");
    expect(cards).toHaveLength(7);
    expect(within(cards[1]).getByText("Expires in 53 days")).toBeInTheDocument();
  });

  it("filters by search, by chip and by the availability list", async () => {
    render(<StaffInventory />);
    await userEvent.type(screen.getByRole("searchbox", { name: "Search product, SKU or lot" }), "carprofen");
    expect(screen.getAllByRole("row")).toHaveLength(3);
    await userEvent.clear(screen.getByRole("searchbox", { name: "Search product, SKU or lot" }));
    await userEvent.click(screen.getByRole("button", { name: /Supplements/ }));
    expect(screen.getAllByRole("row")).toHaveLength(3);
    await pickOption("Availability", "Out of stock");
    expect(screen.getAllByRole("row")).toHaveLength(2);
  });

  it("offers to clear the filters when nothing matches", async () => {
    render(<StaffInventory />);
    await userEvent.type(screen.getByRole("searchbox", { name: "Search product, SKU or lot" }), "zzz");
    expect(screen.getByText("No products match these filters")).toBeInTheDocument();
    await userEvent.click(screen.getByRole("button", { name: "Clear filters" }));
    expect(screen.getAllByRole("row")).toHaveLength(8);
  });

  it("opens the detail of a product in the side panel with its lots and movements", async () => {
    render(<StaffInventory />);
    await userEvent.click(screen.getAllByRole("button", { name: "Open Carprofen 50 mg" })[0]);
    expect(screen.getByText("Lots on hand · used first-expiring first (FEFO)")).toBeInTheDocument();
    expect(screen.getByText("Use first")).toBeInTheDocument();
    expect(screen.getByText(/dispensed to Luna/)).toBeInTheDocument();
    expect(screen.getByText("Edit product · admin only")).toBeInTheDocument();
  });

  it("opens the stock dialog from the page and from the panel", async () => {
    render(
      <ToastProvider>
        <StaffInventory />
      </ToastProvider>,
    );
    await userEvent.click(screen.getByRole("button", { name: "Adjust stock" }));
    expect(screen.getByRole("heading", { name: /Record stock movement|Adjust/i })).toBeInTheDocument();
  });
});

describe("inventory utils", () => {
  it("filters by lots, finds a product and knows what needs attention", () => {
    expect(filterInventory({ ...INITIAL_FILTERS, lots: "blocked" }).map((product) => product.id)).toEqual(["lepto"]);
    expect(filterInventory(INITIAL_FILTERS)).toHaveLength(7);
    expect(findInventoryProduct("omega")?.status).toBe("out");
    expect(findInventoryProduct("nope")).toBeUndefined();
    expect(needsAttention(findInventoryProduct("joint")!)).toBe(false);
    expect(needsAttention(findInventoryProduct("lepto")!)).toBe(true);
  });

  it("turns the lots of a product into the lots of the movement dialog", () => {
    expect(movementLots(findInventoryProduct("carprofen-50")!).map((lot) => [lot.code, lot.onHand, lot.status])).toEqual([
      ["CP-7802", 28, "use-first"],
      ["CP-8044", 14, "available"],
    ]);
  });
});
