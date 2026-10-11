import { STOCK_PRODUCTS } from "@/lib/admin/admin.constants";
import type { StockProduct } from "@/lib/admin/admin.types";

import { ALL_FILTER } from "./AdminStock.constants";
import type { SortDirection } from "./AdminStock.types";

/**
 * Tells whether a product belongs to the selected chip.
 *
 * @param product Product to check.
 * @param filter Value of the selected chip.
 * @returns `true` when the product is in the group.
 */
function inFilter(product: StockProduct, filter: string): boolean {
  if (filter === ALL_FILTER) return true;
  if (filter === "medications") return product.type === "Medication";
  if (filter === "veterinary") return product.type !== "Medication";
  return product.status !== "in-stock";
}

/**
 * Products that match the selected chip and the search (name, SKU), sorted by what is on hand when asked.
 *
 * @param filter Value of the selected chip.
 * @param query Text typed by the user.
 * @param sort Direction of the sort by on hand.
 * @returns The products to list.
 */
export function stockRows(filter: string, query: string, sort: SortDirection): StockProduct[] {
  const text = query.trim().toLowerCase();
  const rows = STOCK_PRODUCTS.filter((product) => inFilter(product, filter) && (!text || `${product.name} ${product.sku}`.toLowerCase().includes(text)));
  if (sort === "none") return rows;
  return [...rows].sort((a, b) => (sort === "ascending" ? a.onHand - b.onHand : b.onHand - a.onHand));
}

/**
 * Text of the minimum column: the minimum, or a dash when the product has none.
 *
 * @param product Product of the row.
 * @returns The text to show.
 */
export function onHandLine(product: StockProduct): string {
  return `${product.onHand} on hand · min ${product.minimum}`;
}
