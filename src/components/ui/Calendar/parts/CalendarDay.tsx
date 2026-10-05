import { cx } from "@/lib/cx";

import styles from "../Calendar.module.scss";
import { DAY_FORMAT } from "../Calendar.constants";
import { dayKey } from "../Calendar.dates";
import type { CalendarDayProps } from "../Calendar.types";

/**
 * One day of the grid; days of adjacent months render an empty cell.
 *
 * @param props Props of the component, see {@link CalendarDayProps}.
 * @param props.date Date to show or move.
 * @param props.state Visual state.
 * @param props.onSelect Called with the chosen day.
 * @returns The rendered element.
 */
export function CalendarDay({ date, state, onSelect }: CalendarDayProps) {
  const { inMonth, isSelected, isToday, isFocusable, isDisabled } = state;

  return (
    <td role="gridcell" aria-selected={isSelected} className={styles.cell}>
      {inMonth && (
        <button
          type="button"
          data-day={dayKey(date)}
          tabIndex={isFocusable ? 0 : -1}
          disabled={isDisabled}
          aria-label={DAY_FORMAT.format(date)}
          aria-current={isToday ? "date" : undefined}
          className={cx(styles.day, isSelected && styles.selected, isToday && styles.today)}
          onClick={() => onSelect(date)}
        >
          {date.getDate()}
        </button>
      )}
    </td>
  );
}
