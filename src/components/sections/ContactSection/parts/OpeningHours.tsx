import { cx } from "@/lib/cx";

import { HOURS_TITLE, OPENING_HOURS } from "../ContactSection.constants";
import styles from "../ContactSection.module.scss";

/**
 * Card with the opening hours; the main schedule is emphasized in the brand color.
 *
 * @returns The rendered element.
 */
export function OpeningHours() {
  return (
    <section className={styles.hours} aria-labelledby="contact-hours-title">
      <h2 id="contact-hours-title" className={styles.hoursTitle}>
        {HOURS_TITLE}
      </h2>
      <dl className={styles.hoursList}>
        {OPENING_HOURS.map(({ days, hours, highlight }) => (
          <div key={days} className={cx(styles.hoursRow, highlight && styles.highlight)}>
            <dt>{days}</dt>
            <dd>{hours}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
