import { requireText, validateEmail } from "@/lib/auth/validation.utils";
import type { FormErrors } from "@/lib/shared/useFormModal.types";

import { NAME_ERROR, NUMBER_ERROR, ROLE_OPTIONS, TAKEN_EMAILS, TAKEN_ERROR } from "./InviteModal.constants";
import type { InviteRole, InviteValues, RoleOption } from "./InviteModal.types";

/**
 * Finds the option of a role.
 *
 * @param role Role chosen in the form.
 * @returns The option with its title, requirements and suggested number.
 */
export function roleOption(role: InviteRole): RoleOption {
  return ROLE_OPTIONS.find((option) => option.value === role) ?? ROLE_OPTIONS[0];
}

/**
 * Message of the work email: it has to look valid and must not belong to an account already.
 *
 * @param email Address typed by the user.
 * @returns The message, or `undefined` when the address can be invited.
 */
function emailProblem(email: string): string | undefined {
  if (TAKEN_EMAILS.includes(email.trim().toLowerCase())) return TAKEN_ERROR;
  return validateEmail(email);
}

/**
 * Validates the invitation: the name, a free work email and, for roles that need one, their clinical number.
 *
 * @param values Values of the form.
 * @returns The message of every invalid field; empty when the invitation can be sent.
 */
export function validateInvite(values: InviteValues): FormErrors<InviteValues> {
  const needsNumber = Boolean(roleOption(values.role).numberLabel);
  const messages = {
    name: requireText(values.name, NAME_ERROR),
    email: emailProblem(values.email),
    number: needsNumber ? requireText(values.number, NUMBER_ERROR) : undefined,
  };
  return Object.fromEntries(Object.entries(messages).filter(([, message]) => message));
}

/**
 * Whether the work email is the one that failed because it belongs to an account.
 *
 * @param errors Errors of the form.
 * @returns `true` when the only problem with the email is that it is taken.
 */
export function emailIsTaken(errors: FormErrors<InviteValues>): boolean {
  return errors.email === TAKEN_ERROR;
}

/**
 * Title of the error banner.
 *
 * @param count Number of invalid fields.
 * @param taken Whether the email belongs to an account already.
 * @returns A sentence about the email when it is taken, or how many fields have to be fixed.
 */
export function errorTitle(count: number, taken: boolean): string {
  return taken ? "This email already has an account" : `Fix ${count} ${count === 1 ? "field" : "fields"} to send the invitation`;
}
