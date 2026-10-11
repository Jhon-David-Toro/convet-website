"use client";

import { cx } from "@/lib/shared/cx";

import { DEFAULT_LEGEND, MONTH_TITLE_FORMAT } from "./MonthCalendar.constants";
import type { MonthCalendarProps } from "./MonthCalendar.types";
import { monthStart } from "./MonthCalendar.utils";
import { useMonthCalendar } from "./hooks/useMonthCalendar";
import { MonthDays } from "./parts/MonthDays";
import { MonthLegend } from "./parts/MonthLegend";
import { MonthNav } from "./parts/MonthNav";
import { MonthWeekdays } from "./parts/MonthWeekdays";
import styles from "./MonthCalendar.module.scss";

/**
 * Booking/Month Calendar: month with selectable, few-left and closed days, plus a legend.
 *
 * @param props Props of the component, see {@link MonthCalendarProps}.
 * @param props.defaultMonth Initial month, e.g. "2026-10".
 * @param props.today Today ("YYYY-MM-DD"): highlighted with a blue border; earlier days cannot be chosen.
 * @param props.selected Selected day ("YYYY-MM-DD"); when given, the calendar is controlled.
 * @param props.defaultSelected Initially selected day when uncontrolled.
 * @param props.onSelect Called with the chosen day.
 * @param props.dayStates State of specific days: few slots left (orange dot) or closed (dashed border). Every other day is available.
 * @param props.legend Legend entries shown under the grid.
 * @param props.className Extra class name for the root element.
 * @param props.rest Remaining properties, forwarded to the root element.
 * @returns The rendered element.
 */
export function MonthCalendar({
  defaultMonth,
  today,
  selected,
  defaultSelected,
  onSelect,
  dayStates,
  legend = DEFAULT_LEGEND,
  className,
  ...rest
}: MonthCalendarProps) {
  const { view, current, shift, choose } = useMonthCalendar({ defaultMonth, selected, defaultSelected, onSelect });

  return (
    <div {...rest} className={cx(styles.calendar, className)}>
      <MonthNav title={MONTH_TITLE_FORMAT.format(monthStart(view))} onPrevious={() => shift(-1)} onNext={() => shift(1)} />
      <MonthWeekdays />
      <MonthDays view={view} today={today} current={current} dayStates={dayStates} onChoose={choose} />
      <MonthLegend items={legend} />
    </div>
  );
}
