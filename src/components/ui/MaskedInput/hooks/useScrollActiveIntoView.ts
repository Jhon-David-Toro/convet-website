import { useEffect } from "react";

import { scrollSlotIntoView } from "../MaskedInput.utils";

/**
 * Keeps the highlighted time slot visible while the list is open.
 *
 * @param enabled Whether the behavior is active.
 * @param popupId Id of the popup; the id of each option is derived from it.
 * @param activeIndex Index of the highlighted option, or -1 when none.
 */
export function useScrollActiveIntoView(enabled: boolean, popupId: string, activeIndex: number) {
  useEffect(() => scrollSlotIntoView(enabled, popupId, activeIndex), [enabled, popupId, activeIndex]);
}
