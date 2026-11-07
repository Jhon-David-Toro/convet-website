"use server";

import { runAction } from "@/lib/api/api.guard";
import type { ActionResult } from "@/lib/api/api.types";
import { createUser } from "@/lib/api/users.api";
import { hasErrors } from "@/lib/auth/validation.utils";
import { validateSignUp } from "@/components/sections/SignUpForm/SignUpForm.utils";
import type { SignUpValues } from "@/components/sections/SignUpForm/SignUpForm.types";

/**
 * Server Action of the sign-up form. The data is checked again on the server before the backend is called.
 *
 * @param values Values of the form.
 * @returns Success, or a safe error: `conflict` when the email is taken, `validation` for invalid data.
 */
export async function signUpAction(values: SignUpValues): Promise<ActionResult> {
  const errors = validateSignUp(values);
  if (hasErrors(errors)) return { ok: false, kind: "validation", message: "Please review the highlighted fields.", fieldErrors: errors };
  return runAction(() => createUser(values));
}
