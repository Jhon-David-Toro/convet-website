import { useId, useRef, useState, type KeyboardEvent } from "react";

import { addMonths } from "../Calendar.dates";
import type { UseCalendarParams } from "../Calendar.types";
import { buildMonthWeeks, normalizeBounds, resolveCalendarKey } from "../Calendar.utils";
import { useGridFocus } from "./useGridFocus";

/**
 * State and behaviour of a `Calendar`: visible month, active day, keyboard navigation and focus.
 *
 * @param params Options, see {@link UseCalendarParams}.
 * @param params.autoFocus Moves focus to the active day on mount (when opening a popup picker).
 * @param params.bounds Remaining properties, forwarded to the root element.
 * @returns Object with `titleId`, `gridRef`, `today`, `selected`, `min`, `max`, `focused`, `weeks`, `goToMonth` and `handleKeyDown`.
 */
export function useCalendar({ autoFocus = false, ...bounds }: UseCalendarParams) {
  const { today, selected, min, max } = normalizeBounds(bounds);
  const [focused, setFocused] = useState(() => selected ?? today);
  const gridRef = useRef<HTMLTableElement>(null);
  const requestFocus = useGridFocus(gridRef, focused, autoFocus);

  // With the keyboard real focus follows the active day; with the month buttons it does not move
  /**
   * Makes `date` the active day and asks for real focus to follow it.
   *
   * @param date Day to activate.
   */
  const moveTo = (date: Date) => {
    requestFocus();
    setFocused(date);
  };

  /**
   * Navigates the grid with the keyboard.
   *
   * @param event Keyboard event of the grid.
   */
  const handleKeyDown = (event: KeyboardEvent) => {
    const target = resolveCalendarKey(event.key, event.shiftKey, focused);
    if (!target) return;
    event.preventDefault();
    moveTo(target);
  };

  return {
    titleId: useId(),
    gridRef,
    today,
    selected,
    min,
    max,
    focused,
    weeks: buildMonthWeeks(focused),
    /**
     * Moves the visible month without moving real focus.
     *
     * @param delta Months to move; negative goes back.
     */
    goToMonth: (delta: number) => setFocused(addMonths(focused, delta)),
    handleKeyDown,
  };
}
