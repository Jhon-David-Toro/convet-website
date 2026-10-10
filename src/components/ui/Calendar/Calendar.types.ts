import type { ComponentPropsWithRef, KeyboardEvent, RefObject } from "react";

export type CalendarProps = Omit<ComponentPropsWithRef<"div">, "onSelect" | "children"> & {
  value?: Date | null;
  onSelect: (date: Date) => void;
  minDate?: Date;
  maxDate?: Date;
  today?: Date;
  autoFocus?: boolean;
};

export type CalendarBounds = Pick<CalendarProps, "value" | "minDate" | "maxDate" | "today">;

export type CalendarDayStateParams = {
  date: Date;
  focused: Date;
  selected: Date | null;
  today: Date;
  min: Date | null;
  max: Date | null;
};

export type CalendarDayState = {
  inMonth: boolean;
  isSelected: boolean;
  isToday: boolean;
  isFocusable: boolean;
  isDisabled: boolean;
};

export type CalendarHeaderProps = {
  titleId: string;
  title: string;
  onPrevious: () => void;
  onNext: () => void;
};

export type CalendarGridProps = Pick<CalendarDayStateParams, "focused" | "selected" | "today" | "min" | "max"> & {
  titleId: string;
  gridRef: RefObject<HTMLTableElement | null>;
  weeks: Date[][];
  onSelect: (date: Date) => void;
  onKeyDown: (event: KeyboardEvent) => void;
};

export type CalendarWeekProps = Pick<CalendarGridProps, "focused" | "selected" | "today" | "min" | "max" | "onSelect"> & {
  week: Date[];
};

export type CalendarDayProps = {
  date: Date;
  state: CalendarDayState;
  onSelect: (date: Date) => void;
};

export type UseCalendarParams = CalendarBounds & Pick<CalendarProps, "autoFocus">;
