import type { HoursListProps } from "../AdminLocations.types";
import styles from "../AdminLocations.module.scss";

/**
 * Opening hours by day: Monday to Friday, Saturday and Sunday.
 *
 * @param props Props of the component, see {@link HoursListProps}.
 * @param props.hours Opening hours to list.
 * @returns The rendered element.
 */
export function HoursList({ hours }: HoursListProps) {
  return (
    <ul className={styles.hours}>
      {hours.map((entry) => (
        <li key={entry.label}>
          {entry.label}
          <strong>{entry.hours}</strong>
        </li>
      ))}
    </ul>
  );
}
