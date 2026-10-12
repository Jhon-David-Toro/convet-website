import { requireText } from "@/lib/auth/validation.utils";
import type { FormErrors } from "@/lib/shared/useFormModal.types";

import { CONFIRMATION_ERROR, CONFIRMATION_WORD, PASSWORD_ERROR } from "./DeleteAccountModal.constants";
import type { DeletionValues } from "./DeleteAccountModal.types";

/**
 * Validates the form: the confirmation word typed exactly and the password.
 *
 * @param values Values of the form.
 * @returns The message of every invalid field; empty when the request can be sent.
 */
export function validateDeletion(values: DeletionValues): FormErrors<DeletionValues> {
  const messages = {
    confirmation: values.confirmation === CONFIRMATION_WORD ? undefined : CONFIRMATION_ERROR,
    password: requireText(values.password, PASSWORD_ERROR),
  };
  return Object.fromEntries(Object.entries(messages).filter(([, message]) => message));
}

/**
 * Title of the error banner: how many fields have to be fixed.
 *
 * @param count Number of invalid fields.
 * @returns For example "Fix 2 fields to delete the account".
 */
export function errorTitle(count: number): string {
  return `Fix ${count} ${count === 1 ? "field" : "fields"} to delete the account`;
}
