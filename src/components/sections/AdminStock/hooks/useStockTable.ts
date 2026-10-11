import { useState } from "react";

import { ALL_FILTER, NEXT_SORT } from "../AdminStock.constants";
import type { SortDirection, StockTableState } from "../AdminStock.types";
import { stockRows } from "../AdminStock.utils";

/**
 * Filters, search, sort and page of the stock table. Changing the filter or the search goes back to the first page.
 *
 * @returns The state of the table and the functions that change it.
 */
export function useStockTable(): StockTableState {
  const [filter, setFilterState] = useState(ALL_FILTER);
  const [query, setQueryState] = useState("");
  const [sort, setSort] = useState<SortDirection>("none");
  const [page, setPage] = useState(1);

  return {
    filter,
    query,
    sort,
    page,
    rows: stockRows(filter, query, sort),
    setFilter: (value) => {
      setFilterState(value);
      setPage(1);
    },
    setQuery: (value) => {
      setQueryState(value);
      setPage(1);
    },
    setPage,
    toggleSort: () => setSort((current) => NEXT_SORT[current]),
  };
}
