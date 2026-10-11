import { cx } from "@/lib/shared/cx";

import { SUMMARY_ROW_ICONS } from "./BookingSummary.constants";
import type { BookingSummaryProps } from "./BookingSummary.types";
import { SummaryHeader } from "./parts/SummaryHeader";
import { SummaryRowItem } from "./parts/SummaryRowItem";
import styles from "./BookingSummary.module.scss";

/**
 * Booking/Summary: appointment summary styled as a ticket (header, perforation, details).
 *
 * @param props Props of the component, see {@link BookingSummaryProps}.
 * @param props.eyebrow Small heading, e.g. "Your visit".
 * @param props.date Date, e.g. "Wed, Oct 7".
 * @param props.time Time and duration, e.g. "9:45 AM · 15 min".
 * @param props.className Extra class name for the root element.
 * @param props.rest Remaining properties, forwarded to the root element.
 * @returns The rendered element.
 */
export function BookingSummary({ eyebrow, date, time, className, ...rest }: BookingSummaryProps) {
  const { service, pet, vet, location, ...section } = rest;
  const rows = { service, pet, vet, location };

  return (
    <section {...section} className={cx(styles.summary, className)}>
      <SummaryHeader eyebrow={eyebrow} date={date} time={time} />
      <hr className={styles.perforation} />
      <ul className={styles.details}>
        {SUMMARY_ROW_ICONS.map(([key, icon]) => (
          <SummaryRowItem key={key} icon={icon} {...rows[key]} />
        ))}
      </ul>
    </section>
  );
}
