"use client";

import { cx } from "@/lib/shared/cx";

import { MONTH_FORMAT } from "./Calendar.constants";
import type { CalendarProps } from "./Calendar.types";
import { useCalendar } from "./hooks/useCalendar";
import { CalendarGrid } from "./parts/CalendarGrid";
import { CalendarHeader } from "./parts/CalendarHeader";
import styles from "./Calendar.module.scss";

/**
 * Accessible month calendar ("date picker grid" pattern): a table with a single day in the tab order
 * and navigation with arrows, Home/End and PageUp/PageDown. Client Component because of the visible month and focus.
 * Figma does not define a date picker: the style comes from the Select and the system tokens.
 *
 * @param props Props of the component, see {@link CalendarProps}.
 * @param props.value Selected day.
 * @param props.onSelect Called with the chosen day.
 * @param props.minDate Days before this date are disabled.
 * @param props.maxDate Days after this date are disabled.
 * @param props.today "Today" (defaults to the current date). Can be fixed for tests and screenshots.
 * @param props.autoFocus Moves focus to the active day on mount (when opening a popup picker).
 * @param props.className Extra class name for the root element.
 * @param props.rest Remaining properties, forwarded to the root element.
 * @returns The rendered element.
 */
export function Calendar({ value, onSelect, minDate, maxDate, today, autoFocus, className, ...rest }: CalendarProps) {
  const { titleId, goToMonth, focused, handleKeyDown, ...grid } = useCalendar({ value, minDate, maxDate, today, autoFocus });

  return (
    <div {...rest} className={cx(styles.calendar, className)}>
      <CalendarHeader titleId={titleId} title={MONTH_FORMAT.format(focused)} onPrevious={() => goToMonth(-1)} onNext={() => goToMonth(1)} />
      <CalendarGrid titleId={titleId} focused={focused} onKeyDown={handleKeyDown} onSelect={onSelect} {...grid} />
    </div>
  );
}
