import { PASSWORD_MIN_LENGTH } from "./auth.constants";
import {
  EMAIL_ERROR,
  EMAIL_PATTERN,
  PASSWORD_ERROR,
  PHONE_ERROR,
  PHONE_PATTERN,
} from "./validation.constants";

/**
 * Error message of an email address.
 *
 * @param email Address typed by the visitor.
 * @returns The message, or `undefined` when the address looks valid.
 */
export function validateEmail(email: string): string | undefined {
  return EMAIL_PATTERN.test(email.trim()) ? undefined : EMAIL_ERROR;
}

/**
 * Error message of a field that only has to be filled in.
 *
 * @param value Text typed by the visitor.
 * @param message Message to show when it is empty.
 * @returns The message, or `undefined` when there is text.
 */
export function requireText(value: string, message: string): string | undefined {
  return value.trim() ? undefined : message;
}

/**
 * Keeps the messages of the fields that failed and drops the rest.
 *
 * @param messages Message of every field, `undefined` for the valid ones.
 * @returns Only the fields that have a message.
 */
export function onlyErrors<Field extends string>(messages: Record<Field, string | undefined>): Partial<Record<Field, string>> {
  return Object.fromEntries(Object.entries(messages).filter(([, message]) => message)) as Partial<Record<Field, string>>;
}

/**
 * Tells whether a set of errors has any message.
 *
 * @param errors Errors of a form, by field.
 * @returns `true` when at least one field failed.
 */
export function hasErrors(errors: object): boolean {
  return Object.keys(errors).length > 0;
}

/**
 * Error message of a phone number: it needs the country code.
 *
 * @param phone Number typed by the user.
 * @returns The message, or `undefined` when the number starts with a country code and has enough digits.
 */
export function validatePhone(phone: string): string | undefined {
  return PHONE_PATTERN.test(phone.trim()) ? undefined : PHONE_ERROR;
}

/**
 * Error message of a new password, using the same rules as the backend:
 * at least 6 characters, one uppercase letter, and one number or symbol.
 *
 * @param password Password typed by the user.
 * @returns The message, or `undefined` when the password meets every rule.
 */
export function validateNewPassword(password: string): string | undefined {
  const valid = password.length >= PASSWORD_MIN_LENGTH && /[A-Z]/.test(password) && /(?:\d|[^A-Za-z0-9\s])/.test(password);
  return valid ? undefined : PASSWORD_ERROR;
}