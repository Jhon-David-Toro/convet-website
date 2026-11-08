"use server";

import { runAction } from "@/lib/api/api.guard";
import type { ActionResult } from "@/lib/api/api.types";
import { createUser } from "@/lib/api/users.api";
import { toSignUpErrors } from "@/lib/api/users.mappers";
import { hasErrors } from "@/lib/auth/validation.utils";
import { FIELD_ERROR_MESSAGES, REVIEW_FIELDS_MESSAGE } from "@/components/sections/SignUpForm/SignUpForm.constants";
import { validateSignUp } from "@/components/sections/SignUpForm/SignUpForm.utils";
import type { SignUpValues } from "@/components/sections/SignUpForm/SignUpForm.types";

/**
 * Server Action of the sign-up form. It validates the data again on the server, creates the customer account in the backend, and
 * puts the backend's validation errors on the fields of the form.
 *
 * @param values Values of the form.
 * @returns Success, or a safe error with the errors of each field.
 */
export async function signUpAction(values: SignUpValues): Promise<ActionResult> {
  const errors = validateSignUp(values);
  if (hasErrors(errors)) return { ok: false, kind: "validation", message: REVIEW_FIELDS_MESSAGE, fieldErrors: errors };

  const result = await runAction(() => createUser(values));
  if (result.ok || result.kind !== "validation") return result;
  const fieldErrors = toSignUpErrors(result.fieldErrors, FIELD_ERROR_MESSAGES);
  return { ...result, message: hasErrors(fieldErrors) ? REVIEW_FIELDS_MESSAGE : result.message, fieldErrors };
}
