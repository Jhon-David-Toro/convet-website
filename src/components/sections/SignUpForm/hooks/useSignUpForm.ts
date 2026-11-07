import { useRouter } from "next/navigation";
import { useState } from "react";
import type { SubmitEvent } from "react";

import { SIGN_IN_HREF } from "@/lib/auth/auth.constants";
import { hasErrors } from "@/lib/auth/validation.utils";

import { EMAIL_TAKEN_ERROR, EMPTY_SIGN_UP } from "../SignUpForm.constants";
import type { SignUpErrors, SignUpFormState, SignUpValues, UseSignUpFormParams } from "../SignUpForm.types";
import { validateSignUp } from "../SignUpForm.utils";

/**
 * State of the sign-up form: values, field errors, the submitting flag and the error of the last attempt. A created account goes on to sign in.
 *
 * @param params Parameters of the hook, see {@link UseSignUpFormParams}.
 * @param params.onSubmit Creates the account before moving on; without it a valid form just moves on.
 * @returns The state and the handlers that change it.
 */
export function useSignUpForm({ onSubmit }: UseSignUpFormParams): SignUpFormState {
  const router = useRouter();
  const [values, setValues] = useState<SignUpValues>(EMPTY_SIGN_UP);
  const [errors, setErrors] = useState<SignUpErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string>();

  /**
   * Changes one value and clears the error of that field.
   *
   * @param field Field to change.
   * @param value New value of the field.
   */
  function setValue<Field extends keyof SignUpValues>(field: Field, value: SignUpValues[Field]) {
    setValues((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
  }

  /**
   * Validates the form and creates the account. On success the customer goes to sign in; a taken email is shown on its field,
   * any other failure in a banner, and what was typed is kept.
   *
   * @param event Submit event of the form.
   */
  async function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting) return;
    const found = validateSignUp(values);
    setErrors(found);
    setSubmitError(undefined);
    if (hasErrors(found)) return;
    setSubmitting(true);
    const result = (await onSubmit?.(values)) ?? { ok: true as const, data: undefined };
    if (result.ok) {
      router.push(SIGN_IN_HREF);
      return;
    }
    setSubmitting(false);
    if (result.kind === "conflict") setErrors({ email: EMAIL_TAKEN_ERROR });
    else if (result.fieldErrors && hasErrors(result.fieldErrors)) setErrors(result.fieldErrors);
    else setSubmitError(result.message);
  }

  return { values, errors, submitting, submitError, setValue, handleSubmit };
}
