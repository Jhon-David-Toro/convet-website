import styles from "../MonthCalendar.module.scss";
import type { MonthWeekProps } from "../MonthCalendar.types";
import { MonthDay } from "./MonthDay";

/**
 * One row of seven days.
 *
 * @param props Props of the component, see {@link MonthWeekProps}.
 * @param props.week Days of the week, as ISO dates.
 * @param props.context Remaining properties, forwarded to the root element.
 * @returns The rendered element.
 */
export function MonthWeek({ week, ...context }: MonthWeekProps) {
  return (
    <div className={styles.week}>
      {week.map((iso) => (
        <MonthDay key={iso} iso={iso} {...context} />
      ))}
    </div>
  );
}
