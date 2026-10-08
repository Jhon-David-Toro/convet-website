import type { ComponentPropsWithRef } from "react";

import type { BookingDayState } from "@/components/patterns/BookingDay";

/** Month day state: `few-left`, `unavailable`. */
export type MonthDayState = "few-left" | "unavailable";

/** Props of the `MonthCalendar` component. */
export type MonthCalendarProps = Omit<ComponentPropsWithRef<"div">, "onSelect" | "children"> & {
  /** Initial month, e.g. "2026-10". */
  defaultMonth: string;
  /** Today ("YYYY-MM-DD"): highlighted with a blue border; earlier days cannot be chosen. */
  today: string;
  /** Selected day ("YYYY-MM-DD"); when given, the calendar is controlled. */
  selected?: string;
  /** Initially selected day when uncontrolled. */
  defaultSelected?: string;
  /** Called with the chosen day. */
  onSelect?: (date: string) => void;
  /** State of specific days: few slots left (orange dot) or closed (dashed border). Every other day is available. */
  dayStates?: Record<string, MonthDayState>;
  /** Legend entries shown under the grid. */
  legend?: string[];
};

/** Month shown by the calendar. */
export type MonthView = {
  /** Full year, e.g. 2026. */
  year: number;
  /** Month index, 0-11. */
  month: number;
};

/** Inputs of the `useMonthCalendar` hook. */
export type UseMonthCalendarParams = Pick<MonthCalendarProps, "defaultMonth" | "selected" | "defaultSelected" | "onSelect">;

/** Everything needed to decide the state of one day. */
export type DayStateParams = {
  /** ISO date of the day. */
  iso: string;
  /** Whether the day belongs to the visible month. */
  inMonth: boolean;
  /** Today, as ISO date (`YYYY-MM-DD`) or `Date`, so the calendar never depends on the clock. */
  today: string;
  /** Selected ISO date, if any. */
  current?: string;
  /** State given explicitly for this day. */
  explicit?: MonthDayState;
};

/** Context shared by the days of the visible month. */
export type MonthContext = Pick<MonthCalendarProps, "today" | "dayStates"> & {
  /** How the status is presented. */
  view: MonthView;
  /** Currently selected value. */
  current?: string;
  /** Called with the day chosen by the user. */
  onChoose: (iso: string) => void;
};

/** Props of the month navigation header. */
export type MonthNavProps = {
  /** Title text. */
  title: string;
  /** Called when the user goes to the previous item. */
  onPrevious: () => void;
  /** Called when the user goes to the next item. */
  onNext: () => void;
};

/** Props of the list of weeks. */
export type MonthDaysProps = MonthContext;

/** Props of one week. */
export type MonthWeekProps = MonthContext & {
  /** Days of the week, as ISO dates. */
  week: string[];
};

/** Props of one day. */
export type MonthDayProps = MonthContext & {
  /** Day as ISO date (`YYYY-MM-DD`). */
  iso: string;
};

/** State a day can be drawn with. */
export type MonthDayPresentation = BookingDayState;

/** Props of the legend. */
export type MonthLegendProps = {
  /** Items to render. */
  items: string[];
};
