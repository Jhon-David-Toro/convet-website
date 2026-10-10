import { useRouter } from "next/navigation";
import { useState } from "react";
import type { SubmitEvent } from "react";

import { VERIFY_EMAIL_HREF } from "@/lib/auth.constants";
import { savePendingEmail } from "@/lib/pendingEmail";
import { hasErrors } from "@/lib/validation.utils";

import { EMPTY_SIGN_UP } from "../SignUpForm.constants";
import type { SignUpErrors, SignUpFormState, SignUpValues, UseSignUpFormParams } from "../SignUpForm.types";
import { validateSignUp } from "../SignUpForm.utils";

/**
 * State of the sign-up form: values, field errors and the submitting flag. A valid form goes on to the email verification page.
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
   * Validates the form, creates the account and opens the page that asks for the emailed code.
   *
   * @param event Submit event of the form.
   */
  async function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    const found = validateSignUp(values);
    setErrors(found);
    if (hasErrors(found)) return;
    setSubmitting(true);
    await onSubmit?.(values);
    savePendingEmail(values.email.trim());
    router.push(VERIFY_EMAIL_HREF);
  }

  return { values, errors, submitting, setValue, handleSubmit };
}
