import { FilterChips } from "@/components/patterns/FilterChips";
import { SearchInput } from "@/components/ui/SearchInput";
import { Select } from "@/components/ui/Select";

import {
  AVAILABILITY_LABEL,
  AVAILABILITY_OPTIONS,
  CHIP_OPTIONS,
  CHIPS_LABEL,
  LOTS_LABEL,
  LOTS_OPTIONS,
  SEARCH_LABEL,
  SEARCH_SHORTCUT,
  TYPE_LABEL,
  TYPE_OPTIONS,
} from "../StaffInventory.constants";
import type { InventoryFiltersProps } from "../StaffInventory.types";
import styles from "../StaffInventory.module.scss";

/**
 * Filters of the page: search, the type, availability and status lists (desktop only) and the chips.
 *
 * @param props Props of the component, see {@link InventoryFiltersProps}.
 * @param props.filters Current filters.
 * @param props.setFilter Changes one filter.
 * @returns The rendered element.
 */
export function InventoryFilters({ filters, setFilter }: InventoryFiltersProps) {
  return (
    <div className={styles.filters}>
      <SearchInput
        label={SEARCH_LABEL}
        showLabel={false}
        placeholder={SEARCH_LABEL}
        shortcut={SEARCH_SHORTCUT}
        value={filters.query}
        onChange={(event) => setFilter("query", event.target.value)}
        className={styles.search}
      />
      <div className={styles.selects}>
        <Select label={TYPE_LABEL} options={TYPE_OPTIONS} value={filters.type} onValueChange={(value) => setFilter("type", value)} />
        <Select label={AVAILABILITY_LABEL} options={AVAILABILITY_OPTIONS} value={filters.availability} onValueChange={(value) => setFilter("availability", value)} />
        <Select label={LOTS_LABEL} options={LOTS_OPTIONS} value={filters.lots} onValueChange={(value) => setFilter("lots", value)} />
      </div>
      <FilterChips label={CHIPS_LABEL} options={CHIP_OPTIONS} value={filters.chip} onChange={(value) => setFilter("chip", value)} className={styles.chips} />
    </div>
  );
}
