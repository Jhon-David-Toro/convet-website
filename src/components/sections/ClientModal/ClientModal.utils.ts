import { requireText, validateEmail, validatePhone } from "@/lib/auth/validation.utils";
import type { FormErrors } from "@/lib/shared/useFormModal.types";

import { FIRST_NAME_ERROR, LAST_NAME_ERROR } from "./ClientModal.constants";
import type { ClientValues } from "./ClientModal.types";

/**
 * Validates the client form: both names, an email that looks valid and a mobile number with its country code.
 *
 * @param values Values of the form.
 * @returns The message of every invalid field; empty when the form can be saved.
 */
export function validateClient(values: ClientValues): FormErrors<ClientValues> {
  const messages = {
    firstName: requireText(values.firstName, FIRST_NAME_ERROR),
    lastName: requireText(values.lastName, LAST_NAME_ERROR),
    email: validateEmail(values.email),
    phone: validatePhone(values.phone),
  };
  return Object.fromEntries(Object.entries(messages).filter(([, message]) => message));
}

/**
 * Full name of the client being created or edited.
 *
 * @param values Values of the form.
 * @returns The first and last name, trimmed.
 */
export function clientName(values: ClientValues): string {
  return `${values.firstName} ${values.lastName}`.trim();
}

/**
 * Title of the error banner: how many fields have to be fixed.
 *
 * @param count Number of invalid fields.
 * @param mode Whether a client is being created or edited.
 * @returns For example "Fix 2 fields to create the client".
 */
export function errorTitle(count: number, mode: "new" | "edit"): string {
  return `Fix ${count} ${count === 1 ? "field" : "fields"} to ${mode === "new" ? "create" : "save"} the client`;
}
