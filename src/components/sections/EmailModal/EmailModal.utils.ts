import { validateEmail } from "@/lib/auth/validation.utils";
import type { FormErrors } from "@/lib/shared/useFormModal.types";

import { CODE_ERROR, CODE_LENGTH } from "./EmailModal.constants";
import type { EmailValues } from "./EmailModal.types";

/**
 * Keeps only the digits of the code and groups them in threes, e.g. "482 910".
 *
 * @param raw Text typed by the user.
 * @returns At most six digits, with a space after the third.
 */
export function formatCode(raw: string): string {
  const digits = raw.replace(/\D/g, "").slice(0, CODE_LENGTH);
  return digits.length > 3 ? `${digits.slice(0, 3)} ${digits.slice(3)}` : digits;
}

/**
 * Validates the form: a new email that looks valid and the 6-digit code.
 *
 * @param values Values of the form.
 * @returns The message of every invalid field; empty when the form can be saved.
 */
export function validateEmailChange(values: EmailValues): FormErrors<EmailValues> {
  const messages = {
    email: validateEmail(values.email),
    code: values.code.replace(/\D/g, "").length === CODE_LENGTH ? undefined : CODE_ERROR,
  };
  return Object.fromEntries(Object.entries(messages).filter(([, message]) => message));
}

/**
 * Title of the error banner: how many fields have to be fixed.
 *
 * @param count Number of invalid fields.
 * @returns For example "Fix 2 fields to change the email".
 */
export function errorTitle(count: number): string {
  return `Fix ${count} ${count === 1 ? "field" : "fields"} to change the email`;
}
