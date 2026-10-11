import { useState } from "react";
import type { SubmitEvent } from "react";

import { hasErrors } from "@/lib/auth/validation.utils";

import { CREDENTIAL_ERRORS } from "../SignInForm.constants";
import type { SignInFormState, SignInStatus, UseSignInFormParams } from "../SignInForm.types";
import { validateSignIn } from "../SignInForm.utils";
import { useSignInFields } from "./useSignInFields";

/**
 * State of the sign-in form: values, field errors and the status (idle, submitting or credentials rejected).
 *
 * @param params Parameters of the hook, see {@link UseSignInFormParams}.
 * @param params.onSubmit Checks the credentials; without it a valid form is accepted.
 * @returns The state and the handlers that change it.
 */
export function useSignInForm({ onSubmit }: UseSignInFormParams): SignInFormState {
  const { setErrors, ...fields } = useSignInFields();
  const [status, setStatus] = useState<SignInStatus>("idle");

  /**
   * Validates the form and asks for the credentials to be checked; a rejection shows the credential errors.
   *
   * @param event Submit event of the form.
   */
  async function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    const found = validateSignIn(fields.values);
    setErrors(found);
    if (hasErrors(found)) return;
    setStatus("submitting");
    const result = onSubmit ? await onSubmit(fields.values) : { ok: true };
    setStatus(result.ok ? "idle" : "error");
    if (!result.ok) setErrors(CREDENTIAL_ERRORS);
  }

  return { ...fields, status, handleSubmit };
}
