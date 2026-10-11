import { CALENDAR_WEEKDAYS } from "../Calendar.constants";
import styles from "../Calendar.module.scss";

/**
 * Column headers with the short weekday and the full name as abbreviation.
 *
 * @returns The rendered element.
 */
export function CalendarWeekdays() {
  return (
    <thead>
      <tr>
        {CALENDAR_WEEKDAYS.map(([short, long]) => (
          <th key={short} scope="col" abbr={long} className={styles.weekday}>
            {short}
          </th>
        ))}
      </tr>
    </thead>
  );
}
