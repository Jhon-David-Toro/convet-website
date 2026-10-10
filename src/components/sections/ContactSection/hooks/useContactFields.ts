import { useState } from "react";

import { EMPTY_VALUES } from "../ContactSection.constants";
import type { ContactErrors, ContactFieldsState, ContactValues } from "../ContactSection.types";
import { validateEmail } from "../ContactSection.utils";

/**
 * Values and error messages of the contact form fields.
 *
 * @returns The state, the setters of one value or of the errors, the email check and the reset.
 */
export function useContactFields(): ContactFieldsState {
  const [values, setValues] = useState<ContactValues>(EMPTY_VALUES);
  const [errors, setErrors] = useState<ContactErrors>({});

  /**
   * Changes one value and clears the error of that field.
   *
   * @param field Field to change.
   * @param value New value of the field.
   */
  function setValue<Field extends keyof ContactValues>(field: Field, value: ContactValues[Field]) {
    setValues((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
  }

  /** Validates the email when the field loses focus, but only once something was typed. */
  function handleEmailBlur() {
    if (values.email) setErrors((current) => ({ ...current, email: validateEmail(values.email) }));
  }

  /** Goes back to empty fields without errors. */
  function resetFields() {
    setValues(EMPTY_VALUES);
    setErrors({});
  }

  return { values, errors, setErrors, setValue, handleEmailBlur, resetFields };
}
