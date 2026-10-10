import { NON_DIGITS } from "./CodeInput.constants";
import type { ReplaceDigitsParams } from "./CodeInput.types";

/**
 * Keeps only the digits of a text, up to the length of the code.
 *
 * @param text Text typed or pasted by the visitor.
 * @param length Number of digits of the code.
 * @returns The digits found, at most `length`.
 */
export function sanitizeDigits(text: string, length: number): string {
  return text.replace(NON_DIGITS, "").slice(0, length);
}

/**
 * Writes digits into the code starting at a box, replacing what was there from that box on.
 *
 * @param params Parameters, see {@link ReplaceDigitsParams}.
 * @param params.value Digits typed so far.
 * @param params.index Box where the digits start.
 * @param params.digits Digits to write.
 * @param params.length Number of digits of the code.
 * @returns The new code, at most `length` digits long.
 */
export function replaceDigits({ value, index, digits, length }: ReplaceDigitsParams): string {
  return `${value.slice(0, index)}${digits}`.slice(0, length);
}

/**
 * Removes the digit of a box and shifts nothing: only the last digits can be erased one by one.
 *
 * @param value Digits typed so far.
 * @param index Box whose digit is removed.
 * @returns The code without that digit and the ones after it.
 */
export function removeFrom(value: string, index: number): string {
  return value.slice(0, index);
}

/**
 * Digits that a change of a box added: when the box already held a digit and one more was typed, only the new one counts.
 *
 * @param text Text of the box after the change.
 * @param previous Digit the box held before the change, or an empty string.
 * @param length Number of digits of the code.
 * @returns The digits typed.
 */
export function typedDigits(text: string, previous: string, length: number): string {
  const digits = sanitizeDigits(text, length);
  return previous && digits.length === 2 ? digits.replace(previous, "") : digits;
}
