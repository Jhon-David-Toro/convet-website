import { dayKey } from "../Calendar.dates";
import type { CalendarGridProps } from "../Calendar.types";
import { CalendarWeek } from "./CalendarWeek";
import { CalendarWeekdays } from "./CalendarWeekdays";
import styles from "../Calendar.module.scss";

/**
 * Table of days (ARIA grid) with a single day in the tab order.
 *
 * @param props Props of the component, see {@link CalendarGridProps}.
 * @param props.titleId Id of the title element, referenced by `aria-labelledby`.
 * @param props.gridRef Ref of the table that holds the day buttons.
 * @param props.weeks Weeks to draw, each an array of seven dates.
 * @param props.onKeyDown Called on key down; the component's own key handling runs after it unless the event is default-prevented.
 * @param props.context Remaining properties, forwarded to the root element.
 * @returns The rendered element.
 */
export function CalendarGrid({ titleId, gridRef, weeks, onKeyDown, ...context }: CalendarGridProps) {
  return (
    <table ref={gridRef} role="grid" aria-labelledby={titleId} className={styles.grid} onKeyDown={onKeyDown}>
      <CalendarWeekdays />
      <tbody>
        {weeks.map((week) => (
          <CalendarWeek key={dayKey(week[0])} week={week} {...context} />
        ))}
      </tbody>
    </table>
  );
}
