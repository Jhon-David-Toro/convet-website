import type { AppointmentDateProps } from "../AppointmentCard.types";
import styles from "../AppointmentCard.module.scss";

/**
 * Date block: month, day and weekday.
 *
 * @param props Props of the component, see {@link AppointmentDateProps}.
 * @param props.month Abbreviated month in uppercase, e.g. "OCT".
 * @param props.day Day of the month.
 * @param props.weekday Abbreviated weekday, e.g. "Wed".
 * @returns The rendered element.
 */
export function AppointmentDate({ month, day, weekday }: AppointmentDateProps) {
  return (
    <div className={styles.date}>
      <span className={styles.month}>{month}</span>
      <span className={styles.day}>{day}</span>
      <span className={styles.weekday}>{weekday}</span>
    </div>
  );
}
