import type { ComponentPropsWithRef, KeyboardEvent, RefObject } from "react";

/** Props of the `Calendar` component. */
export type CalendarProps = Omit<ComponentPropsWithRef<"div">, "onSelect" | "children"> & {
  /** Selected day. */
  value?: Date | null;
  /** Called with the chosen day. */
  onSelect: (date: Date) => void;
  /** Days before this date are disabled. */
  minDate?: Date;
  /** Days after this date are disabled. */
  maxDate?: Date;
  /** "Today" (defaults to the current date). Can be fixed for tests and screenshots. */
  today?: Date;
  /** Moves focus to the active day on mount (when opening a popup picker). */
  autoFocus?: boolean;
};

/** Dates the calendar normalizes before using them. */
export type CalendarBounds = Pick<CalendarProps, "value" | "minDate" | "maxDate" | "today">;

/** Everything needed to decide how one day is presented. */
export type CalendarDayStateParams = {
  /** Date to show or move. */
  date: Date;
  /** Day that owns the roving tab stop. */
  focused: Date;
  /** Whether the item is selected. */
  selected: Date | null;
  /** Today, as ISO date (`YYYY-MM-DD`) or `Date`, so the calendar never depends on the clock. */
  today: Date;
  /** Earliest allowed date, or `null` for no limit. */
  min: Date | null;
  /** Latest allowed date, or `null` for no limit. */
  max: Date | null;
};

/** How one day of the grid is presented. */
export type CalendarDayState = {
  /** Day belongs to the visible month (days of adjacent months are blank). */
  inMonth: boolean;
  /** Whether selected. */
  isSelected: boolean;
  /** Whether today. */
  isToday: boolean;
  /** Day is the single tab stop of the grid. */
  isFocusable: boolean;
  /** Day is outside `minDate` / `maxDate`. */
  isDisabled: boolean;
};

/** Props of the month navigation header. */
export type CalendarHeaderProps = {
  /** Id of the title element; the grid references it as its label. */
  titleId: string;
  /** Visible month, e.g. "October 2026". */
  title: string;
  /** Called when the user goes to the previous item. */
  onPrevious: () => void;
  /** Called when the user goes to the next item. */
  onNext: () => void;
};

/** Props of the grid of days. */
export type CalendarGridProps = Pick<CalendarDayStateParams, "focused" | "selected" | "today" | "min" | "max"> & {
  /** Id of the title element, referenced by `aria-labelledby`. */
  titleId: string;
  /** Ref of the table that holds the day buttons. */
  gridRef: RefObject<HTMLTableElement | null>;
  /** Weeks to draw, each an array of seven dates. */
  weeks: Date[][];
  /** Called with the chosen day. */
  onSelect: (date: Date) => void;
  /** Called on key down; the component's own key handling runs after it unless the event is default-prevented. */
  onKeyDown: (event: KeyboardEvent) => void;
};

/** Props of one row of the grid. */
export type CalendarWeekProps = Pick<CalendarGridProps, "focused" | "selected" | "today" | "min" | "max" | "onSelect"> & {
  /** Days of the week, as ISO dates. */
  week: Date[];
};

/** Props of one day cell. */
export type CalendarDayProps = {
  /** Date to show or move. */
  date: Date;
  /** Visual state. */
  state: CalendarDayState;
  /** Called with the chosen day. */
  onSelect: (date: Date) => void;
};

/** Inputs of the `useCalendar` hook. */
export type UseCalendarParams = CalendarBounds & Pick<CalendarProps, "autoFocus">;
