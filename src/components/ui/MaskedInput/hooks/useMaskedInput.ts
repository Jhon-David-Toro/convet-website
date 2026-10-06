import { TIME_MASK } from "../MaskedInput.constants";
import type { UseMaskedInputParams } from "../MaskedInput.types";
import { timeSlots } from "../masks";
import { useMaskedHandlers } from "./useMaskedHandlers";
import { useMaskedKeyboard } from "./useMaskedKeyboard";
import { useMaskedValue } from "./useMaskedValue";
import { usePicker } from "./usePicker";

/**
 * State and behaviour of a `MaskedInput`: value, picker popup, highlighted time slot and keyboard handling.
 *
 * @param params Options, see {@link UseMaskedInputParams}.
 * @param params.mask Mask of the field: `"date"` or `"time"`.
 * @param params.from First time in the list, defaults to "7:00 AM".
 * @param params.to Last time in the list, defaults to "7:00 PM".
 * @param params.stepMinutes Minutes between times, defaults to 15.
 * @param params.onKeyDown Called on key down; the component's own key handling runs after it unless the event is default-prevented.
 * @param params.popupId Id of the picker popup, used to reference its options.
 * @param params.inputRef Text input, to move focus back to it when the picker closes.
 * @param params.valueParams Remaining properties, forwarded to the root element.
 * @returns Object with `current`, `slots`, `open`, `activeIndex`, `setActiveIndex`, `close`, `handleKeyDown` and the handlers of `useMaskedHandlers`.
 */
export function useMaskedInput({ mask, from, to, stepMinutes, onKeyDown, popupId, inputRef, ...valueParams }: UseMaskedInputParams) {
  const { current, commit } = useMaskedValue(valueParams);
  const slots = mask === TIME_MASK ? timeSlots(from, to, stepMinutes) : [];
  /** Moves focus back to the text input. */
  const focusInput = () => inputRef.current?.focus();
  const picker = usePicker({ mask, selectedIndex: slots.indexOf(current), popupId, focusInput });

  /**
   * Commits the highlighted time slot and closes the picker.
   */
  const commitActive = () => {
    commit(slots[picker.activeIndex]);
    picker.close();
  };
  const handleKeyDown = useMaskedKeyboard({
    mask,
    onKeyDown,
    open: picker.open,
    activeIndex: picker.activeIndex,
    slotCount: slots.length,
    actions: { openPicker: picker.openPicker, close: picker.close, setActiveIndex: picker.setActiveIndex, commitActive },
  });

  const handlers = useMaskedHandlers({ mask, current, commit, picker });

  return {
    current,
    slots,
    open: picker.open,
    activeIndex: picker.activeIndex,
    setActiveIndex: picker.setActiveIndex,
    close: picker.close,
    handleKeyDown,
    ...handlers,
  };
}
