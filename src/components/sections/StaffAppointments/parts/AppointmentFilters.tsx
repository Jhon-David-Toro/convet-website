import { SearchInput } from "@/components/ui/SearchInput";

import { SEARCH_LABEL, SEARCH_SHORTCUT } from "../StaffAppointments.constants";
import styles from "../StaffAppointments.module.scss";
import type { AppointmentFiltersProps } from "../StaffAppointments.types";
import { RangeChips } from "./RangeChips";
import { VetStatusSelects } from "./VetStatusSelects";

/**
 * Filters of the table: search by pet or owner, the day range, the vet and the status.
 *
 * @param props Props of the component, see {@link AppointmentFiltersProps}.
 * @param props.filters Current filters.
 * @param props.setFilter Changes one filter.
 * @returns The rendered element.
 */
export function AppointmentFilters({ filters, setFilter }: AppointmentFiltersProps) {
  return (
    <div className={styles.filters}>
      <SearchInput
        label={SEARCH_LABEL}
        placeholder={SEARCH_LABEL}
        shortcut={SEARCH_SHORTCUT}
        value={filters.query}
        onChange={(event) => setFilter("query", event.target.value)}
        className={styles.search}
      />
      <RangeChips filters={filters} setFilter={setFilter} />
      <VetStatusSelects filters={filters} setFilter={setFilter} />
    </div>
  );
}
