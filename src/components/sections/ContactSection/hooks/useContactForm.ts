import { useState } from "react";
import type { SubmitEvent } from "react";

import type { ContactFormState, UseContactFormParams } from "../ContactSection.types";
import { hasErrors, validateContact } from "../ContactSection.utils";
import { useContactFields } from "./useContactFields";

/**
 * State of the contact form: fields, validation and the confirmation after a valid submit.
 *
 * @param params Parameters of the hook, see {@link UseContactFormParams}.
 * @param params.onSubmit Called with the values of a valid form.
 * @returns The state and the handlers that change it.
 */
export function useContactForm({ onSubmit }: UseContactFormParams): ContactFormState {
  const { resetFields, setErrors, ...fields } = useContactFields();
  const [sent, setSent] = useState(false);

  /**
   * Validates the form and, when it is valid, hands the values over and shows the confirmation.
   *
   * @param event Submit event of the form.
   */
  function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    const found = validateContact(fields.values);
    setErrors(found);
    if (hasErrors(found)) return;
    onSubmit?.(fields.values);
    setSent(true);
  }

  /** Goes back to an empty form. */
  function reset() {
    resetFields();
    setSent(false);
  }

  return { ...fields, sent, handleSubmit, reset };
}
