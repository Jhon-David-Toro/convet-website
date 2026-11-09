import { useRouter } from "next/navigation";
import { useState } from "react";
import type { SubmitEvent } from "react";

import { SIGN_IN_HREF } from "@/lib/auth/auth.constants";
import { hasErrors } from "@/lib/auth/validation.utils";

import { EMAIL_TAKEN_ERROR, EMPTY_SIGN_UP } from "../SignUpForm.constants";
import type { SignUpErrors, SignUpFormState, SignUpValues, UseSignUpFormParams } from "../SignUpForm.types";
import { validateSignUp } from "../SignUpForm.utils";

function handleSignUpError(
  result: { ok: false; kind?: string; fieldErrors?: Record<string, string>; message?: string },
  setErrors: (errors: SignUpErrors) => void,
  setSubmitError: (error?: string) => void,
) {
  if (result.kind === "conflict") {
    setErrors({ email: EMAIL_TAKEN_ERROR });
    return;
  }
  if (result.fieldErrors && hasErrors(result.fieldErrors)) {
    setErrors(result.fieldErrors);
    return;
  }
  setSubmitError(result.message);
}

/**
 * Manages sign-up form: account creation with email conflict detection and field validation.
 * @param onSubmit Backend account creation callback; returns result with ok/kind/fieldErrors. Optional.
 * @returns Form state with submitting flag, field errors, and general error message; navigates to sign-in on success.
 */
export function useSignUpForm({ onSubmit }: UseSignUpFormParams): SignUpFormState {
  const router = useRouter();
  const [values, setValues] = useState<SignUpValues>(EMPTY_SIGN_UP);
  const [errors, setErrors] = useState<SignUpErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string>();

  function setValue<Field extends keyof SignUpValues>(field: Field, value: SignUpValues[Field]) {
    setValues((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
  }

  async function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting) return;

    const found = validateSignUp(values);
    setErrors(found);
    setSubmitError(undefined);
    if (hasErrors(found)) return;

    setSubmitting(true);
    try {
      const result = (await onSubmit?.(values)) ?? { ok: true as const, data: undefined };
      if (result.ok) {
        router.push(SIGN_IN_HREF);
        return;
      }
      handleSignUpError(result, setErrors, setSubmitError);
    } finally {
      setSubmitting(false);
    }
  }

  return { values, errors, submitting, submitError, setValue, handleSubmit };
}
