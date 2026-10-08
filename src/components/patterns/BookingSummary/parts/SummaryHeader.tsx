import styles from "../BookingSummary.module.scss";
import type { SummaryHeaderProps } from "../BookingSummary.types";

/**
 * Ticket header: eyebrow, date and time.
 *
 * @param props Props of the component, see {@link SummaryHeaderProps}.
 * @param props.eyebrow Small heading, e.g. "Your visit".
 * @param props.date Date, e.g. "Wed, Oct 7".
 * @param props.time Time and duration, e.g. "9:45 AM · 15 min".
 * @returns The rendered element.
 */
export function SummaryHeader({ eyebrow, date, time }: SummaryHeaderProps) {
  return (
    <header className={styles.header}>
      <p className={styles.eyebrow}>{eyebrow}</p>
      <p className={styles.date}>{date}</p>
      <p className={styles.time}>{time}</p>
    </header>
  );
}
