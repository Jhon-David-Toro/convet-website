import { dayKey } from "../Calendar.dates";
import type { CalendarWeekProps } from "../Calendar.types";
import { getDayState } from "../Calendar.utils";
import { CalendarDay } from "./CalendarDay";

/**
 * One row of seven days.
 *
 * @param props Props of the component, see {@link CalendarWeekProps}.
 * @param props.week Days of the week, as ISO dates.
 * @param props.onSelect Called with the chosen day.
 * @param props.context Remaining properties, forwarded to the root element.
 * @returns The rendered element.
 */
export function CalendarWeek({ week, onSelect, ...context }: CalendarWeekProps) {
  return (
    <tr>
      {week.map((date) => (
        <CalendarDay key={dayKey(date)} date={date} state={getDayState({ date, ...context })} onSelect={onSelect} />
      ))}
    </tr>
  );
}
