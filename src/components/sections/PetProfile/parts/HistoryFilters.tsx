import { Chip } from "@/components/ui/Chip";

import { HISTORY_FILTERS, HISTORY_FILTERS_LABEL } from "../PetProfile.constants";
import styles from "../PetProfile.module.scss";
import type { HistoryFiltersProps } from "../PetProfile.types";
import { filterEvents } from "../PetProfile.utils";

/**
 * Chips that filter the history by kind of event, each with the number of events it would show.
 *
 * @param props Props of the component, see {@link HistoryFiltersProps}.
 * @param props.events Every event of the pet.
 * @param props.filter Selected filter.
 * @param props.onChange Called with the filter the customer picked.
 * @returns The rendered element.
 */
export function HistoryFilters({ events, filter, onChange }: HistoryFiltersProps) {
  return (
    <div role="group" aria-label={HISTORY_FILTERS_LABEL} className={styles.filters}>
      {HISTORY_FILTERS.map(({ value, label }) => (
        <Chip key={value} selected={filter === value} count={filterEvents(events, value).length} onClick={() => onChange(value)}>
          {label}
        </Chip>
      ))}
    </div>
  );
}
