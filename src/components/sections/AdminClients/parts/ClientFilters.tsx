import { FilterChips } from "@/components/patterns/FilterChips";
import { SearchInput } from "@/components/ui/SearchInput";

import { SEARCH_LABEL, SEARCH_SHORTCUT } from "../AdminClients.constants";
import type { ClientFiltersProps } from "../AdminClients.types";
import styles from "../AdminClients.module.scss";

/**
 * Search by name, phone or email and the chips that filter by kind of account.
 *
 * @param props Props of the component, see {@link ClientFiltersProps}.
 * @param props.query Text typed in the search.
 * @param props.onQuery Called when the text changes.
 * @param props.label Accessible name of the chips.
 * @param props.options Chips to show.
 * @param props.value Value of the selected chip.
 * @param props.onChange Called with the chip the user picked.
 * @returns The rendered element.
 */
export function ClientFilters({ query, onQuery, label, options, value, onChange }: ClientFiltersProps) {
  return (
    <div className={styles.filters}>
      <SearchInput label={SEARCH_LABEL} placeholder={SEARCH_LABEL} shortcut={SEARCH_SHORTCUT} value={query} onChange={(event) => onQuery(event.target.value)} className={styles.search} />
      <FilterChips label={label} options={options} value={value} onChange={onChange} />
    </div>
  );
}
