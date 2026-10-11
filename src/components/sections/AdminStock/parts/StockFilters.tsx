import { FilterChips } from "@/components/patterns/FilterChips";
import { SearchInput } from "@/components/ui/SearchInput";

import styles from "../AdminStock.module.scss";
import { FILTER_OPTIONS, FILTERS_LABEL, SEARCH_LABEL, SEARCH_SHORTCUT } from "../AdminStock.constants";
import type { StockFiltersProps } from "../AdminStock.types";

/**
 * Search (desktop only) and chips that filter the stock by kind of product or by what needs attention.
 *
 * @param props Props of the component, see {@link StockFiltersProps}.
 * @param props.table State of the stock table.
 * @returns The rendered element.
 */
export function StockFilters({ table }: StockFiltersProps) {
  return (
    <div className={styles.filters}>
      <SearchInput
        label={SEARCH_LABEL}
        placeholder={SEARCH_LABEL}
        shortcut={SEARCH_SHORTCUT}
        value={table.query}
        onChange={(event) => table.setQuery(event.target.value)}
        className={styles.search}
      />
      <FilterChips label={FILTERS_LABEL} options={FILTER_OPTIONS} value={table.filter} onChange={table.setFilter} />
    </div>
  );
}
