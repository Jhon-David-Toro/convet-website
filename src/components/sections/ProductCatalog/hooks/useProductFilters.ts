import { useState } from "react";

import type { ProductKind } from "@/lib/catalog/products.types";

import { EMPTY_FILTERS } from "../ProductCatalog.constants";
import type { ProductFilterGroupName, ProductFilters, ProductFiltersState, UseProductFiltersParams } from "../ProductCatalog.types";
import { toggleFilter } from "../ProductCatalog.utils";

/**
 * State of the catalog filters: search text, kinds, categories and species.
 *
 * @param params Parameters of the hook, see {@link UseProductFiltersParams}.
 * @param params.onChange Called after every change of the filters.
 * @returns The filters and the functions that change them.
 */
export function useProductFilters({ onChange }: UseProductFiltersParams): ProductFiltersState {
  const [filters, setFilters] = useState<ProductFilters>(EMPTY_FILTERS);

  /**
   * Stores new filters and notifies the change.
   *
   * @param next Filters to store.
   */
  function update(next: ProductFilters) {
    setFilters(next);
    onChange();
  }

  /**
   * Replaces the search text.
   *
   * @param query New search text.
   */
  function setQuery(query: string) {
    update({ ...filters, query });
  }

  /**
   * Adds or removes a value of a filter group.
   *
   * @param group Group to change.
   * @param value Value to add or remove.
   */
  function toggle(group: ProductFilterGroupName, value: string) {
    update(toggleFilter(filters, group, value));
  }

  /**
   * Selects a single kind, or every kind with `undefined`.
   *
   * @param kind Kind to select.
   */
  function selectKind(kind?: ProductKind) {
    update({ ...filters, kinds: kind ? [kind] : [] });
  }

  return { filters, setQuery, toggle, selectKind };
}
