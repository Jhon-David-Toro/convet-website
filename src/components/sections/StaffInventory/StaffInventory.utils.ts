import type { ProductLot } from "@/lib/admin/admin.types";
import { STAFF_INVENTORY_ROWS } from "@/lib/staff/staff.inventory.constants";
import type { StaffInventoryRow } from "@/lib/staff/staff.types";

import { ALL_VALUE, ATTENTION_STATUSES, BLOCKED_VALUE } from "./StaffInventory.constants";
import type { InventoryFilters } from "./StaffInventory.types";

/**
 * Whether a product matches what was typed in the search: name, SKU or lot code.
 *
 * @param product Product to check.
 * @param query Text typed by the user.
 * @returns `true` when the query is empty or found in the name, the SKU or the lot.
 */
function matchesQuery(product: StaffInventoryRow, query: string): boolean {
  const text = query.trim().toLowerCase();
  return !text || `${product.name} ${product.sku} ${product.lotCode}`.toLowerCase().includes(text);
}

/**
 * Whether a product passes the availability list: in stock, low stock or out of stock.
 *
 * @param product Product to check.
 * @param availability Value of the list.
 * @returns `true` when the list is on "All" or the product has that availability.
 */
function matchesAvailability(product: StaffInventoryRow, availability: string): boolean {
  if (availability === ALL_VALUE) return true;
  if (availability === "in-stock") return product.status === "in-stock" || product.status === "expires";
  return product.status === availability;
}

/**
 * Whether a product passes the status list: every active product, or only the ones with expired, blocked lots.
 *
 * @param product Product to check.
 * @param lots Value of the list.
 * @returns `true` when the list is on active lots or the product is blocked.
 */
function matchesLots(product: StaffInventoryRow, lots: string): boolean {
  return lots === BLOCKED_VALUE ? product.status === "blocked" : true;
}

/**
 * Products that pass every filter of the page.
 *
 * @param filters Filters chosen by the user.
 * @returns The matching products, in the order of the list.
 */
export function filterInventory(filters: InventoryFilters): StaffInventoryRow[] {
  return STAFF_INVENTORY_ROWS.filter(
    (product) =>
      matchesQuery(product, filters.query) &&
      (filters.chip === ALL_VALUE || product.type === filters.chip) &&
      (filters.type === ALL_VALUE || product.type === filters.type) &&
      matchesAvailability(product, filters.availability) &&
      matchesLots(product, filters.lots),
  );
}

/**
 * Looks a product up by id.
 *
 * @param id Id of the product.
 * @returns The product, or `undefined` when there is none with that id.
 */
export function findInventoryProduct(id: string | undefined): StaffInventoryRow | undefined {
  return STAFF_INVENTORY_ROWS.find((product) => product.id === id);
}

/**
 * Whether a product needs the attention of the team: low, out of stock or blocked.
 *
 * @param product Product to check.
 * @returns `true` when its status is one of those.
 */
export function needsAttention(product: StaffInventoryRow): boolean {
  return ATTENTION_STATUSES.includes(product.status);
}

/**
 * Lots of a product in the shape the stock movement dialog expects.
 *
 * @param product Product whose lots are listed.
 * @returns The lots with what is on hand.
 */
export function movementLots(product: StaffInventoryRow): ProductLot[] {
  return product.lots.map((lot) => ({
    code: lot.code,
    expiry: lot.expiry,
    supplier: "—",
    received: "—",
    onHand: lot.quantity,
    status: lot.status === "use-first" ? "use-first" : "available",
  }));
}
