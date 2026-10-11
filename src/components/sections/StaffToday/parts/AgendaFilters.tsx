import { Chip } from "@/components/ui/Chip";

import { AGENDA_FILTER_LABEL, AGENDA_FILTERS } from "../StaffToday.constants";
import type { AgendaHeaderProps } from "../StaffToday.types";
import styles from "../StaffToday.module.scss";

/**
 * Chips that switch the agenda between the signed-in vet's patients and every vet.
 *
 * @param props Props of the component, see {@link AgendaHeaderProps}.
 * @param props.filter Selected filter.
 * @param props.onFilter Called with the filter the user picked.
 * @returns The rendered element.
 */
export function AgendaFilters({ filter, onFilter }: AgendaHeaderProps) {
  return (
    <div role="group" aria-label={AGENDA_FILTER_LABEL} className={styles.filters}>
      {AGENDA_FILTERS.map(({ value, label }) => (
        <Chip key={value} selected={filter === value} onClick={() => onFilter(value)}>
          {label}
        </Chip>
      ))}
    </div>
  );
}
