import { requireText, validateEmail, validatePhone } from "@/lib/auth/validation.utils";
import type { FormErrors } from "@/lib/shared/useFormModal.types";

import { COMPANY_ERROR } from "./SupplierModal.constants";
import type { SupplierValues } from "./SupplierModal.types";

/**
 * Validates the supplier form: the company name, a contact email that looks valid and a phone with its country code.
 *
 * @param values Values of the form.
 * @returns The message of every invalid field; empty when the form can be saved.
 */
export function validateSupplier(values: SupplierValues): FormErrors<SupplierValues> {
  const messages = {
    company: requireText(values.company, COMPANY_ERROR),
    email: validateEmail(values.email),
    phone: validatePhone(values.phone),
  };
  return Object.fromEntries(Object.entries(messages).filter(([, message]) => message));
}

/**
 * Title of the error banner: how many fields have to be fixed.
 *
 * @param count Number of invalid fields.
 * @returns For example "Fix 2 fields to save the supplier".
 */
export function errorTitle(count: number): string {
  return `Fix ${count} ${count === 1 ? "field" : "fields"} to save the supplier`;
}
