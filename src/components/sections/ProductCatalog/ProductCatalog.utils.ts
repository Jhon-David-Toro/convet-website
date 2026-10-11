import type { RefObject } from "react";

import { PRODUCT_CATEGORY_LABELS, PRODUCT_KIND_LABELS } from "@/lib/catalog/products.constants";
import type { ProductItem } from "@/lib/catalog/products.types";

import { SEARCH_SHORTCUT_KEY } from "./ProductCatalog.constants";
import type { ProductFilterGroupName, ProductFilters, ProductKindCounts } from "./ProductCatalog.types";

/**
 * Adds a value to a list, or removes it when it is already there.
 *
 * @param values Current values.
 * @param value Value to toggle.
 * @returns A new list with the value added or removed.
 */
export function toggleValue<Value extends string>(values: Value[], value: Value): Value[] {
  return values.includes(value) ? values.filter((current) => current !== value) : [...values, value];
}

/**
 * Returns the filters with one value of a group toggled.
 *
 * @param filters Current filters.
 * @param group Group to change.
 * @param value Value to add or remove.
 * @returns New filters.
 */
export function toggleFilter(filters: ProductFilters, group: ProductFilterGroupName, value: string): ProductFilters {
  return { ...filters, [group]: toggleValue(filters[group] as string[], value) };
}

/**
 * Text a search looks into: name, summary, kind and category of the product, in lower case.
 *
 * @param product Product to describe.
 * @returns The searchable text.
 */
function searchableText(product: ProductItem): string {
  const { name, summary, kind, category } = product;
  return [name, summary, PRODUCT_KIND_LABELS[kind], PRODUCT_CATEGORY_LABELS[category]].join(" ").toLowerCase();
}

/**
 * Tells whether a value passes a group of filters: nothing selected accepts everything.
 *
 * @param selected Selected values of the group.
 * @param candidates Values of the product for that group.
 * @returns `true` when the group is empty or shares a value with the product.
 */
function passesGroup(selected: string[], candidates: string[]): boolean {
  return selected.length === 0 || candidates.some((candidate) => selected.includes(candidate));
}

/**
 * Products that match every filter.
 *
 * @param products Every product of the catalog.
 * @param filters Filters to apply.
 * @returns The matching products, in catalog order.
 */
export function filterProducts(products: ProductItem[], filters: ProductFilters): ProductItem[] {
  const query = filters.query.trim().toLowerCase();

  return products.filter(
    (product) =>
      searchableText(product).includes(query) &&
      passesGroup(filters.kinds, [product.kind]) &&
      passesGroup(filters.categories, [product.category]) &&
      passesGroup(filters.species, product.species),
  );
}

/**
 * Number of products of every kind.
 *
 * @param products Every product of the catalog.
 * @returns The count of every kind.
 */
export function countKinds(products: ProductItem[]): ProductKindCounts {
  const counts: ProductKindCounts = { medication: 0, supplement: 0, veterinary: 0 };
  for (const { kind } of products) counts[kind] += 1;
  return counts;
}

/**
 * Text of the result counter, e.g. "18 products" or "1 product".
 *
 * @param total Number of products that match the filters.
 * @returns The counter text.
 */
export function productCountLabel(total: number): string {
  return `${total} ${total === 1 ? "product" : "products"}`;
}

/**
 * Total number of products across every kind.
 *
 * @param counts Number of products of every kind.
 * @returns The sum of the counts.
 */
export function totalCount(counts: ProductKindCounts): number {
  return Object.values(counts).reduce((sum, count) => sum + count, 0);
}

/**
 * Products of one page.
 *
 * @param products Matching products.
 * @param page Page number, starting at 1.
 * @param pageSize Products per page.
 * @returns The products of that page.
 */
export function pageOf(products: ProductItem[], page: number, pageSize: number): ProductItem[] {
  return products.slice((page - 1) * pageSize, page * pageSize);
}

/**
 * Focuses the search field when Ctrl or Command plus the shortcut key is pressed.
 *
 * @param searchRef Ref of the search field.
 * @returns A function that removes the listener.
 */
export function listenSearchShortcut(searchRef: RefObject<HTMLInputElement | null>): () => void {
  /**
   * Focuses the search field on the shortcut.
   *
   * @param event Keyboard event of the page.
   */
  function handleKeyDown(event: KeyboardEvent) {
    if (!(event.ctrlKey || event.metaKey) || event.key.toLowerCase() !== SEARCH_SHORTCUT_KEY) return;
    event.preventDefault();
    searchRef.current?.focus();
  }

  window.addEventListener("keydown", handleKeyDown);
  return () => window.removeEventListener("keydown", handleKeyDown);
}
