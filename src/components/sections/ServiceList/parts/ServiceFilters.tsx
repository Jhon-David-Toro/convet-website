import { Chip } from "@/components/ui/Chip";
import { SERVICE_FILTERS } from "@/lib/catalog/services.constants";

import { FILTERS_LABEL } from "../ServiceList.constants";
import type { ServiceFiltersProps } from "../ServiceList.types";
import styles from "../ServiceList.module.scss";

/**
 * Species chips above the list; the selected one is pressed.
 *
 * @param props Props of the component, see {@link ServiceFiltersProps}.
 * @param props.filter Selected filter.
 * @param props.counts Number of services of every filter.
 * @param props.onChange Called with the filter the visitor picked.
 * @returns The rendered element.
 */
export function ServiceFilters({ filter, counts, onChange }: ServiceFiltersProps) {
  return (
    <div role="group" aria-label={FILTERS_LABEL} className={styles.filters}>
      {SERVICE_FILTERS.map(({ value, label }) => (
        <Chip key={value} selected={filter === value} count={counts[value]} onClick={() => onChange(value)}>
          {label}
        </Chip>
      ))}
    </div>
  );
}
