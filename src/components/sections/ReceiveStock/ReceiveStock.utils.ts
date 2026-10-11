import { parseDate } from "@/components/ui/MaskedInput";
import { CATALOG_PRODUCTS } from "@/lib/admin.constants";
import type { CatalogProduct, ReceiptLine } from "@/lib/admin.types";

import { EXPIRED_ERROR, LOW_STOCK_LABEL_PREFIX, NEW_LINE_QUANTITY, SAVE_LABEL, STOCK_LABEL_PREFIX } from "./ReceiveStock.constants";

/**
 * Product of the catalog by id.
 *
 * @param id Id of the product.
 * @returns The product; the first one when the id is unknown.
 */
export function findCatalogProduct(id: string): CatalogProduct {
  return CATALOG_PRODUCTS.find((product) => product.id === id) ?? CATALOG_PRODUCTS[0];
}

/**
 * Products that look like the chosen one (same family, e.g. every strength of a medication), so the user can check before choosing.
 *
 * @param productId Id of the chosen product.
 * @returns The chosen product and its similar ones, in catalog order.
 */
export function similarProducts(productId: string): CatalogProduct[] {
  const { family } = findCatalogProduct(productId);
  return CATALOG_PRODUCTS.filter((product) => product.family === family);
}

/**
 * Problem with the expiry of a line: stock that expired before the day it is received cannot be received.
 *
 * @param line Line of the receipt.
 * @param receivedOn Day of the delivery, as "MM / DD / YYYY".
 * @returns The message, or `undefined` when the date is missing or fine.
 */
export function expiryError(line: ReceiptLine, receivedOn: string): string | undefined {
  const expiry = parseDate(line.expiry);
  const received = parseDate(receivedOn);
  return expiry && received && expiry < received ? EXPIRED_ERROR : undefined;
}

/**
 * Text on the right of a product card: "In stock · 42" or "Low stock · 3".
 *
 * @param product Product of the catalog.
 * @returns The stock label.
 */
export function stockLabel(product: CatalogProduct): string {
  return `${product.low ? LOW_STOCK_LABEL_PREFIX : STOCK_LABEL_PREFIX} · ${product.stock}`;
}

/**
 * Text of the save button: it says how many errors are left to fix.
 *
 * @param errorCount Number of lines with a problem.
 * @returns For example "Save receipt (fix 1 error)".
 */
export function saveLabel(errorCount: number): string {
  if (errorCount === 0) return SAVE_LABEL;
  return `${SAVE_LABEL} (fix ${errorCount} ${errorCount === 1 ? "error" : "errors"})`;
}

/**
 * Quantity text with the unit of the product, e.g. "30 doses".
 *
 * @param product Product of the catalog.
 * @param amount Number of units.
 * @returns The quantity with its unit.
 */
export function quantityText(product: CatalogProduct, amount: number): string {
  return `${amount} ${product.unit}`;
}

/**
 * Update that changes some values of one line of the receipt.
 *
 * @param id Id of the line.
 * @param patch Values to change.
 * @returns A function that gives the new list of lines from the current one.
 */
export function patchLine(id: string, patch: Partial<ReceiptLine>): (lines: ReceiptLine[]) => ReceiptLine[] {
  return (lines) => lines.map((line) => (line.id === id ? { ...line, ...patch } : line));
}

/**
 * Update that adds an empty line at the end of the receipt.
 *
 * @returns A function that gives the new list of lines from the current one.
 */
export function appendLine(): (lines: ReceiptLine[]) => ReceiptLine[] {
  return (lines) => [...lines, { id: `line-${lines.length + 1}-${Date.now()}`, productId: "rabies", lot: "", expiry: "", quantity: NEW_LINE_QUANTITY }];
}

/**
 * Update that removes one line of the receipt.
 *
 * @param id Id of the line.
 * @returns A function that gives the new list of lines from the current one.
 */
export function dropLine(id: string): (lines: ReceiptLine[]) => ReceiptLine[] {
  return (lines) => lines.filter((line) => line.id !== id);
}
