import styles from "../MonthCalendar.module.scss";
import { MONTH_CALENDAR_WEEKDAYS } from "../MonthCalendar.constants";

/**
 * Decorative weekday headers (each day already has an accessible name).
 *
 * @returns The rendered element.
 */
export function MonthWeekdays() {
  return (
    <div className={styles.weekdays} aria-hidden="true">
      {MONTH_CALENDAR_WEEKDAYS.map((weekday) => (
        <span key={weekday}>{weekday}</span>
      ))}
    </div>
  );
}
