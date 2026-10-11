import { Chip } from "@/components/ui/Chip";

import { RANGES, RANGES_LABEL } from "../StaffAppointments.constants";
import styles from "../StaffAppointments.module.scss";
import type { RangeChipsProps } from "../StaffAppointments.types";

/**
 * Chips that pick the day range: today, tomorrow or this week.
 *
 * @param props Props of the component, see {@link RangeChipsProps}.
 * @param props.filters Current filters.
 * @param props.setFilter Changes one filter.
 * @returns The rendered element.
 */
export function RangeChips({ filters, setFilter }: RangeChipsProps) {
  return (
    <div role="group" aria-label={RANGES_LABEL} className={styles.ranges}>
      {RANGES.map(({ value, label }) => (
        <Chip key={value} selected={filters.range === value} onClick={() => setFilter("range", value)}>
          {label}
        </Chip>
      ))}
    </div>
  );
}
