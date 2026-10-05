import { useEffect, useRef, type RefObject } from "react";

import { focusDayIfRequested } from "../Calendar.utils";

/**
 * Moves real focus to the active day after keyboard navigation (and on mount when `autoFocus` is set).
 *
 * @param gridRef Table that holds the day buttons.
 * @param focused Active day.
 * @param autoFocus Focus the active day on mount.
 * @returns A function that requests focus for the next change of the active day.
 */
export function useGridFocus(gridRef: RefObject<HTMLTableElement | null>, focused: Date, autoFocus: boolean) {
  const shouldFocus = useRef(autoFocus);

  useEffect(() => focusDayIfRequested(shouldFocus, gridRef.current, focused), [gridRef, focused]);

  return () => {
    shouldFocus.current = true;
  };
}
