import { gridTimes } from "../StaffToday.utils";
import styles from "../StaffToday.module.scss";

/**
 * Hours on the left of the schedule grid, one per half hour.
 *
 * @returns The rendered element.
 */
export function TimeLabels() {
  return (
    <ol className={styles.times} aria-hidden="true">
      {gridTimes().map((time) => (
        <li key={time}>{time}</li>
      ))}
    </ol>
  );
}
