import type { ChangeEvent, ClipboardEvent, KeyboardEvent } from "react";

import { ARROW_STEPS, CODE_KEYS } from "../CodeInput.constants";
import type { CodeInputHandlers, UseCodeInputParams } from "../CodeInput.types";
import { removeFrom, replaceDigits, sanitizeDigits, typedDigits } from "../CodeInput.utils";
import { useCodeFocus } from "./useCodeFocus";

/**
 * Behavior of a code made of one box per digit: typing, deleting, arrow keys, pasting and focus that follows the code.
 *
 * @param params Parameters of the hook, see {@link UseCodeInputParams}.
 * @param params.value Digits typed so far.
 * @param params.onValueChange Called with the new code.
 * @param params.length Number of digits of the code.
 * @returns The refs of the boxes and the handlers to wire to them.
 */
export function useCodeInput({ value, onValueChange, length }: UseCodeInputParams): CodeInputHandlers {
  const { inputRefs, focusBox } = useCodeFocus(length);

  /**
   * Writes the digits typed in a box (several when the browser autofills) and moves focus after them.
   *
   * @param index Box that changed.
   * @param event Change event of the box.
   */
  function handleChange(index: number, event: ChangeEvent<HTMLInputElement>) {
    const digits = typedDigits(event.target.value, value[index] ?? "", length);
    onValueChange(replaceDigits({ value, index, digits, length }));
    focusBox(index + digits.length);
  }

  /**
   * Moves between boxes with the arrow keys and deletes backwards from an empty box.
   *
   * @param index Box that received the key.
   * @param event Keyboard event of the box.
   */
  function handleKeyDown(index: number, event: KeyboardEvent<HTMLInputElement>) {
    focusBox(index + (ARROW_STEPS[event.key] ?? 0));
    if (event.key !== CODE_KEYS.backspace || value[index]) return;
    onValueChange(removeFrom(value, index - 1));
    focusBox(index - 1);
  }

  /**
   * Fills the whole code from the pasted text.
   *
   * @param event Paste event of a box.
   */
  function handlePaste(event: ClipboardEvent<HTMLInputElement>) {
    event.preventDefault();
    const digits = sanitizeDigits(event.clipboardData.getData("text"), length);
    onValueChange(digits);
    focusBox(digits.length);
  }

  return { inputRefs, handleChange, handleKeyDown, handlePaste };
}
