import type { ComponentPropsWithRef } from "react";

import type { BookingDayState } from "@/components/patterns/BookingDay";

export type MonthDayState = "few-left" | "unavailable";

export type MonthCalendarProps = Omit<ComponentPropsWithRef<"div">, "onSelect" | "children"> & {
  defaultMonth: string;
  today: string;
  selected?: string;
  defaultSelected?: string;
  onSelect?: (date: string) => void;
  dayStates?: Record<string, MonthDayState>;
  legend?: string[];
};

export type MonthView = {
  year: number;
  month: number;
};

export type UseMonthCalendarParams = Pick<MonthCalendarProps, "defaultMonth" | "selected" | "defaultSelected" | "onSelect">;

export type DayStateParams = {
  iso: string;
  inMonth: boolean;
  today: string;
  current?: string;
  explicit?: MonthDayState;
};

export type MonthContext = Pick<MonthCalendarProps, "today" | "dayStates"> & {
  view: MonthView;
  current?: string;
  onChoose: (iso: string) => void;
};

export type MonthNavProps = {
  title: string;
  onPrevious: () => void;
  onNext: () => void;
};

export type MonthDaysProps = MonthContext;

export type MonthWeekProps = MonthContext & {
  week: string[];
};

export type MonthDayProps = MonthContext & {
  iso: string;
};

export type MonthDayPresentation = BookingDayState;

export type MonthLegendProps = {
  items: string[];
};
