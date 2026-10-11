import type { KeyboardEvent } from "react";

import { KEYS } from "@/lib/shared/keys.constants";

import { MASK_CONFIG } from "../MaskedInput.constants";
import type { UseMaskedHandlersParams } from "../MaskedInput.types";

/**
 * Event handlers of a `MaskedInput` that combine the value and the picker.
 *
 * @param params Options, see {@link UseMaskedHandlersParams}.
 * @param params.mask Mask of the field: `"date"` or `"time"`.
 * @param params.current Current formatted value.
 * @param params.commit Stores a new value.
 * @param params.picker State and controls of the picker popup.
 * @returns Object with the handlers `type`, `pick`, `toggle` and `handleEscape`.
 */
export function useMaskedHandlers({ mask, current, commit, picker }: UseMaskedHandlersParams) {
  return {
    /** Formats what the user typed and stores it; `deleting` is true when the text got shorter. */
    type: (raw: string) => commit(MASK_CONFIG[mask].format(raw, raw.length < current.length)),
    /** Stores a value chosen in the popup, closes it and returns focus to the input. */
    pick: (next: string) => {
      commit(next);
      picker.close(true);
    },
    /**
     * Closes the picker when it is open and opens it when it is closed.
     */
    toggle: () => (picker.open ? picker.close() : picker.openPicker()),
    /** Escape closes only the picker (not a modal around it) and returns focus to the input. */
    handleEscape: (event: KeyboardEvent) => {
      if (event.key !== KEYS.escape || !picker.open) return;
      event.stopPropagation();
      picker.close(true);
    },
  };
}
