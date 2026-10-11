import { useMemo, useState } from "react";

import { PRODUCTS_PAGE_SIZE } from "@/lib/catalog/products.constants";

import { FIRST_PAGE } from "../ProductCatalog.constants";
import type { ProductCatalogState, UseProductCatalogParams } from "../ProductCatalog.types";
import { countKinds, filterProducts, pageOf } from "../ProductCatalog.utils";
import { useProductFilters } from "./useProductFilters";

/**
 * State of the catalog: filters, the matching products, the current page and the count of every kind.
 *
 * @param params Parameters of the hook, see {@link UseProductCatalogParams}.
 * @param params.products Every product of the catalog.
 * @returns Filter functions plus the visible products, pagination and counts.
 */
export function useProductCatalog({ products }: UseProductCatalogParams): ProductCatalogState {
  const [page, setPage] = useState(FIRST_PAGE);
  const filterState = useProductFilters({ onChange: () => setPage(FIRST_PAGE) });
  const matches = useMemo(() => filterProducts(products, filterState.filters), [products, filterState.filters]);
  const kindCounts = useMemo(() => countKinds(products), [products]);
  const pageCount = Math.max(FIRST_PAGE, Math.ceil(matches.length / PRODUCTS_PAGE_SIZE));

  return {
    ...filterState,
    visible: pageOf(matches, page, PRODUCTS_PAGE_SIZE),
    total: matches.length,
    page,
    pageCount,
    setPage,
    kindCounts,
  };
}
