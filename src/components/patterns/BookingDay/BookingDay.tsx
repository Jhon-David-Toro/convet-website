import { cx } from "@/lib/cx";

import styles from "./BookingDay.module.scss";
import { BOOKING_DAY_STATE_CLASS, FEW_LEFT_DAY_STATE, SELECTED_DAY_STATE, UNAVAILABLE_DAY_STATE } from "./BookingDay.constants";
import type { BookingDayProps } from "./BookingDay.types";
import { FewLeftMarker } from "./parts/FewLeftMarker";

/**
 * Booking/Day: selectable day of the date picker. `selected` uses `aria-pressed`; `unavailable` is disabled.
 *
 * @param props Props of the component, see {@link BookingDayProps}.
 * @param props.state Visual state.
 * @param props.weekday Abbreviated weekday, e.g. "Wed". With `compact` it is only used as the accessible name.
 * @param props.day Day of the month.
 * @param props.compact Month calendar variant: no weekday, fills its cell width and is 44px tall.
 * @param props.className Extra class name for the root element.
 * @param props.rest Remaining properties, forwarded to the root element.
 * @returns The rendered element.
 */
export function BookingDay({ state = "available", weekday, day, compact = false, className, ...rest }: BookingDayProps) {
  return (
    <button
      type="button"
      aria-pressed={state === SELECTED_DAY_STATE}
      disabled={state === UNAVAILABLE_DAY_STATE}
      {...rest}
      className={cx(styles.day, styles[BOOKING_DAY_STATE_CLASS[state]], compact && styles.compact, className)}
    >
      <span className={compact ? styles.hidden : styles.weekday}>{weekday}</span>{" "}
      <span className={styles.number}>{day}</span>
      {state === FEW_LEFT_DAY_STATE && <FewLeftMarker />}
    </button>
  );
}
