import { FilterChips } from "@/components/patterns/FilterChips";
import { SearchInput } from "@/components/ui/SearchInput";
import { Select } from "@/components/ui/Select";

import {
  CHIP_OPTIONS,
  CHIPS_LABEL,
  SEARCH_LABEL,
  SEARCH_SHORTCUT,
  SPECIES_LABEL,
  SPECIES_OPTIONS,
  VACCINE_LABEL,
  VACCINE_OPTIONS,
  VET_LABEL,
  VET_OPTIONS,
} from "../StaffPatients.constants";
import type { PatientFiltersProps } from "../StaffPatients.types";
import styles from "../StaffPatients.module.scss";

/**
 * Filters of the page: search, the species, vet and vaccine lists (desktop only) and the chips.
 *
 * @param props Props of the component, see {@link PatientFiltersProps}.
 * @param props.filters Current filters.
 * @param props.setFilter Changes one filter.
 * @returns The rendered element.
 */
export function PatientsFilters({ filters, setFilter }: PatientFiltersProps) {
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
        <Select label={SPECIES_LABEL} options={SPECIES_OPTIONS} value={filters.species} onValueChange={(value) => setFilter("species", value)} />
        <Select label={VET_LABEL} options={VET_OPTIONS} value={filters.vet} onValueChange={(value) => setFilter("vet", value)} />
        <Select label={VACCINE_LABEL} options={VACCINE_OPTIONS} value={filters.vaccine} onValueChange={(value) => setFilter("vaccine", value)} />
      </div>
      <FilterChips label={CHIPS_LABEL} options={CHIP_OPTIONS} value={filters.chip} onChange={(value) => setFilter("chip", value)} className={styles.chips} />
    </div>
  );
}
