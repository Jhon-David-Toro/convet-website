import { cx } from "@/lib/cx";

import styles from "./TimeSlot.module.scss";
import type { TimeSlotProps } from "./TimeSlot.types";

/**
 * Booking/Time Slot: time with its remaining capacity. `selected` uses `aria-pressed`; `full` and `disabled` cannot be chosen.
 *
 * @param props Props of the component, see {@link TimeSlotProps}.
 * @param props.time Time, e.g. "9:45 AM".
 * @param props.capacity Capacity, e.g. "3 of 5 left".
 * @param props.selected Whether the item is selected.
 * @param props.full Fully booked time: cannot be chosen and is tinted soft red.
 * @param props.disabled Whether the control is disabled.
 * @param props.className Extra class name for the root element.
 * @param props.rest Remaining properties, forwarded to the root element.
 * @returns The rendered element.
 */
export function TimeSlot({ time, capacity, selected = false, full = false, disabled, className, ...rest }: TimeSlotProps) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      disabled={disabled || full}
      {...rest}
      className={cx(styles.slot, selected && styles.selected, full && styles.full, className)}
    >
      <span className={styles.time}>{time}</span>{" "}
      {capacity && <span className={styles.capacity}>{capacity}</span>}
    </button>
  );
}
