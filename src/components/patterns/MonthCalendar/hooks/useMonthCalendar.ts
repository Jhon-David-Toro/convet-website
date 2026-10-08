import { useState } from "react";

import type { UseMonthCalendarParams } from "../MonthCalendar.types";
import { parseMonth, shiftMonth } from "../MonthCalendar.utils";

/**
 * State of a `MonthCalendar`: visible month and the (un)controlled selected day.
 *
 * @param params Options, see {@link UseMonthCalendarParams}.
 * @param params.defaultMonth Initial month, e.g. "2026-10".
 * @param params.selected Selected day ("YYYY-MM-DD"); when given, the calendar is controlled.
 * @param params.defaultSelected Initially selected day when uncontrolled.
 * @param params.onSelect Called with the chosen day.
 * @returns Object with `view`, `current`, `shift`, `choose`.
 */
export function useMonthCalendar({ defaultMonth, selected, defaultSelected, onSelect }: UseMonthCalendarParams) {
  const [view, setView] = useState(() => parseMonth(defaultMonth));
  const [internalSelected, setInternalSelected] = useState(defaultSelected);

  return {
    view,
    current: selected ?? internalSelected,
    /**
     * Moves the visible month.
     *
     * @param delta Months to move; negative goes back.
     */
    shift: (delta: number) => setView((previous) => shiftMonth(previous, delta)),
    /**
     * Selects a day and notifies the consumer.
     *
     * @param iso Day as ISO date (`YYYY-MM-DD`).
     */
    choose: (iso: string) => {
      setInternalSelected(iso);
      onSelect?.(iso);
    },
  };
}
