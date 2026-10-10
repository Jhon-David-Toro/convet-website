import { CODE_LENGTH } from "@/lib/auth.constants";

import { GROUP_SIZE, INCOMPLETE_ERROR } from "./TwoStepForm.constants";

/**
 * Keeps the digits of the typed text.
 *
 * @param text Text typed or pasted by the visitor.
 * @returns At most six digits.
 */
export function codeDigits(text: string): string {
  return text.replace(/\D/g, "").slice(0, CODE_LENGTH);
}

/**
 * Shows the code in two groups of three digits, e.g. `482 913`.
 *
 * @param text Text typed or pasted by the visitor.
 * @returns The digits with a space after the third one.
 */
export function formatCode(text: string): string {
  const digits = codeDigits(text);
  return digits.length > GROUP_SIZE ? `${digits.slice(0, GROUP_SIZE)} ${digits.slice(GROUP_SIZE)}` : digits;
}

/**
 * Error message of the typed code.
 *
 * @param text Text of the field.
 * @returns The message, or `undefined` when the code has all its digits.
 */
export function validateCode(text: string): string | undefined {
  return codeDigits(text).length === CODE_LENGTH ? undefined : INCOMPLETE_ERROR;
}
