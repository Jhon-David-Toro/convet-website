import { onlyErrors, requireText, validateEmail } from "@/lib/validation.utils";

import { ERROR_MESSAGES } from "./ContactSection.constants";
import type { ContactErrors, ContactValues } from "./ContactSection.types";

/**
 * Validates the whole form.
 *
 * @param values Values of the form.
 * @returns The error message of every invalid field; empty when the form is valid.
 */
export function validateContact(values: ContactValues): ContactErrors {
  return onlyErrors({
    name: requireText(values.name, ERROR_MESSAGES.name),
    email: validateEmail(values.email),
    topic: requireText(values.topic, ERROR_MESSAGES.topic),
    message: requireText(values.message, ERROR_MESSAGES.message),
    consent: values.consent ? undefined : ERROR_MESSAGES.consent,
  });
}
