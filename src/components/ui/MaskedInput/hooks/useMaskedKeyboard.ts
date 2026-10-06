import type { KeyboardEvent } from "react";

import type { UseMaskedKeyboardParams } from "../MaskedInput.types";
import { resolveMaskedKey, runMaskedCommand } from "../MaskedInput.utils";

/**
 * Keydown handler of the text input: runs the consumer's handler first, then the picker's key commands.
 *
 * @param params Options, see {@link UseMaskedKeyboardParams}.
 * @param params.mask Mask of the field: `"date"` or `"time"`.
 * @param params.onKeyDown Called on key down; the component's own key handling runs after it unless the event is default-prevented.
 * @param params.open Whether the popup or menu is open.
 * @param params.activeIndex Index of the highlighted option, or -1 when none.
 * @param params.slotCount Number of time slots in the list.
 * @param params.actions Operations the keyboard commands can trigger.
 * @returns The keydown handler for the text input.
 */
export function useMaskedKeyboard({ mask, onKeyDown, open, activeIndex, slotCount, actions }: UseMaskedKeyboardParams) {
  return (event: KeyboardEvent<HTMLInputElement>) => {
    onKeyDown?.(event);
    if (event.defaultPrevented) return;

    const command = resolveMaskedKey(mask, event, { open, activeIndex, slotCount });
    if (!command) return;
    if (command.preventDefault) event.preventDefault();
    runMaskedCommand(command, actions);
  };
}
