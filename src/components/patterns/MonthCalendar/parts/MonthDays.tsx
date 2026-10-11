import { MONTH_TITLE_FORMAT } from "../MonthCalendar.constants";
import type { MonthDaysProps } from "../MonthCalendar.types";
import { buildWeeks, monthStart } from "../MonthCalendar.utils";
import { MonthWeek } from "./MonthWeek";
import styles from "../MonthCalendar.module.scss";

/**
 * Group of weeks of the visible month.
 *
 * @param context Month, today, selected day and day states shared by every day of the month.
 * @returns The rendered element.
 */
export function MonthDays(context: MonthDaysProps) {
  const { view } = context;

  return (
    <div className={styles.days} role="group" aria-label={MONTH_TITLE_FORMAT.format(monthStart(view))}>
      {buildWeeks(view.year, view.month).map((week) => (
        <MonthWeek key={week[0]} week={week} {...context} />
      ))}
    </div>
  );
}
