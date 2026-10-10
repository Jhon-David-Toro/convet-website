import { EMAIL_PATTERN, ERROR_MESSAGES } from "./ContactSection.constants";
import type { ContactErrors, ContactValues } from "./ContactSection.types";

/**
 * Error message of an email address.
 *
 * @param email Address typed by the visitor.
 * @returns The message, or `undefined` when the address looks valid.
 */
export function validateEmail(email: string): string | undefined {
  return EMAIL_PATTERN.test(email.trim()) ? undefined : ERROR_MESSAGES.email;
}

/**
 * Error message of a field that only has to be filled in.
 *
 * @param value Text typed by the visitor.
 * @param message Message to show when it is empty.
 * @returns The message, or `undefined` when there is text.
 */
function requireText(value: string, message: string): string | undefined {
  return value.trim() ? undefined : message;
}

/**
 * Validates the whole form.
 *
 * @param values Values of the form.
 * @returns The error message of every invalid field; empty when the form is valid.
 */
export function validateContact(values: ContactValues): ContactErrors {
  const errors: ContactErrors = {
    name: requireText(values.name, ERROR_MESSAGES.name),
    email: validateEmail(values.email),
    topic: requireText(values.topic, ERROR_MESSAGES.topic),
    message: requireText(values.message, ERROR_MESSAGES.message),
    consent: values.consent ? undefined : ERROR_MESSAGES.consent,
  };
  return Object.fromEntries(Object.entries(errors).filter(([, message]) => message)) as ContactErrors;
}

/**
 * Tells whether a set of errors has any message.
 *
 * @param errors Errors of the form.
 * @returns `true` when at least one field failed.
 */
export function hasErrors(errors: ContactErrors): boolean {
  return Object.keys(errors).length > 0;
}
