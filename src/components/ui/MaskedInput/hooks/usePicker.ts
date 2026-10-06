import { useState } from "react";

import { NO_ACTIVE_SLOT, TIME_MASK } from "../MaskedInput.constants";
import type { UsePickerParams } from "../MaskedInput.types";
import { initialSlotIndex } from "../MaskedInput.utils";
import { useScrollActiveIntoView } from "./useScrollActiveIntoView";

/**
 * Open state of the picker popup and the highlighted time slot.
 *
 * @param params Options, see {@link UsePickerParams}.
 * @param params.mask Mask of the field: `"date"` or `"time"`.
 * @param params.selectedIndex Index of the selected time slot, or -1.
 * @param params.popupId Id of the picker popup, used to reference its options.
 * @param params.focusInput Moves focus back to the text input.
 * @returns Object with `open`, `activeIndex`, `setActiveIndex`, `openPicker`, `close`.
 */
export function usePicker({ mask, selectedIndex, popupId, focusInput }: UsePickerParams) {
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(NO_ACTIVE_SLOT);
  useScrollActiveIntoView(open && mask === TIME_MASK, popupId, activeIndex);

  return {
    open,
    activeIndex,
    setActiveIndex,
    /**
     * Opens the popup, highlighting the selected time slot when the mask is `time`.
     */
    openPicker: () => {
      setActiveIndex(initialSlotIndex(mask, selectedIndex));
      setOpen(true);
    },
    /**
     * Closes the popup, optionally returning focus to the input.
     *
     * @param returnFocus Whether to focus the input after closing.
     */
    close: (returnFocus = false) => {
      setOpen(false);
      if (returnFocus) focusInput();
    },
  };
}
