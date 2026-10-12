import { requireText } from "@/lib/auth/validation.utils";
import type { FormErrors } from "@/lib/shared/useFormModal.types";

import { CURRENT_ERROR, LENGTH_ERROR, MIN_PASSWORD_LENGTH, REPEAT_ERROR, SAME_ERROR } from "./PasswordModal.constants";
import type { PasswordValues } from "./PasswordModal.types";

/**
 * Message of the new password: it needs enough characters and must not be the current one.
 *
 * @param values Values of the form.
 * @returns The message, or `undefined` when the new password is fine.
 */
function nextProblem(values: PasswordValues): string | undefined {
  if (values.next.length < MIN_PASSWORD_LENGTH) return LENGTH_ERROR;
  return values.next === values.current ? SAME_ERROR : undefined;
}

/**
 * Validates the form: the current password, a new one that is long enough and different, and the same new one typed again.
 *
 * @param values Values of the form.
 * @returns The message of every invalid field; empty when the form can be saved.
 */
export function validatePasswords(values: PasswordValues): FormErrors<PasswordValues> {
  const messages = {
    current: requireText(values.current, CURRENT_ERROR),
    next: nextProblem(values),
    repeat: values.repeat === values.next ? undefined : REPEAT_ERROR,
  };
  return Object.fromEntries(Object.entries(messages).filter(([, message]) => message));
}

/**
 * Title of the error banner: how many fields have to be fixed.
 *
 * @param count Number of invalid fields.
 * @returns For example "Fix 2 fields to update the password".
 */
export function errorTitle(count: number): string {
  return `Fix ${count} ${count === 1 ? "field" : "fields"} to update the password`;
}
