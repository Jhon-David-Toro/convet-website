import { BookingDay } from "@/components/patterns/BookingDay";

import { DAY_LABEL_FORMAT, MONTH_CALENDAR_WEEKDAYS } from "../MonthCalendar.constants";
import type { MonthDayProps } from "../MonthCalendar.types";
import { describeDay, resolveDayState, weekdayIndex } from "../MonthCalendar.utils";

/**
 * One day of the month, drawn as a compact `BookingDay`.
 *
 * @param props Props of the component, see {@link MonthDayProps}.
 * @param props.iso Day as ISO date (`YYYY-MM-DD`).
 * @param props.view How the status is presented.
 * @param props.today Today ("YYYY-MM-DD"): highlighted with a blue border; earlier days cannot be chosen.
 * @param props.current Currently selected value.
 * @param props.dayStates State of specific days: few slots left (orange dot) or closed (dashed border). Every other day is available.
 * @param props.onChoose Called with the day chosen by the user.
 * @returns The rendered element.
 */
export function MonthDay({ iso, view, today, current, dayStates = {}, onChoose }: MonthDayProps) {
  const date = new Date(`${iso}T00:00:00Z`);
  const explicit = dayStates[iso];
  const state = resolveDayState({ iso, inMonth: date.getUTCMonth() === view.month, today, current, explicit });

  return (
    <BookingDay
      compact
      state={state}
      weekday={MONTH_CALENDAR_WEEKDAYS[weekdayIndex(date)]}
      day={date.getUTCDate()}
      aria-label={describeDay(DAY_LABEL_FORMAT.format(date), explicit)}
      onClick={() => onChoose(iso)}
    />
  );
}
