import type { KeyboardEvent } from "react";

import type { UseSelectKeyboardParams } from "../Select.types";
import { resolveSelectKey, runSelectCommand } from "../Select.utils";

/**
 * Keydown handler of the trigger: runs the consumer's handler first, then the select's own key commands.
 *
 * @param params Options, see {@link UseSelectKeyboardParams}.
 * @param params.options Options of the list.
 * @param params.open Whether the popup or menu is open.
 * @param params.activeIndex Index of the highlighted option, or -1 when none.
 * @param params.onKeyDown Called when the user presses a key on the trigger, before the select handles it.
 * @param params.actions Operations the keyboard commands can trigger.
 * @returns The keydown handler for the trigger button.
 */
export function useSelectKeyboard({ options, open, activeIndex, onKeyDown, actions }: UseSelectKeyboardParams) {
  return (event: KeyboardEvent<HTMLButtonElement>) => {
    onKeyDown?.(event);
    if (event.defaultPrevented) return;

    const command = resolveSelectKey(event, { options, open, activeIndex });
    if (!command) return;
    if (command.preventDefault) event.preventDefault();
    runSelectCommand(command, actions, activeIndex);
  };
}
