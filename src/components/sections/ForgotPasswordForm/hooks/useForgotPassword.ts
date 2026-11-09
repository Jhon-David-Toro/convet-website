import { useState } from "react";
import type { SubmitEvent } from "react";

import type { ForgotPasswordState, UseForgotPasswordParams } from "../ForgotPasswordForm.types";
import { validateResetEmail } from "../ForgotPasswordForm.utils";

/**
 * Manages password reset flow: email validation, reset link request, and resend countdown.
 * @param onSubmit Backend callback to request password reset link; receives normalized email (trim+lowercase). Optional.
 * @returns Form state with sentTo (confirmation email), sending flag, and handlers for submit/resend with countdown.
 */
export function useForgotPassword({ onSubmit }: UseForgotPasswordParams): ForgotPasswordState {
  const [email, setEmailValue] = useState("");
  const [error, setError] = useState<string>();
  const [sentTo, setSentTo] = useState<string>();
  const [sending, setSending] = useState(false);

  function setEmail(next: string) {
    setEmailValue(next);
    setError(undefined);
  }

  async function sendResetLink() {
    const address = email.trim().toLowerCase();
    setSending(true);
    await onSubmit?.(address);
    setSending(false);
    setSentTo(address);
  }

  async function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    const found = validateResetEmail(email);
    setError(found);
    if (!found) await sendResetLink();
  }

  return { email, setEmail, error, sentTo, sending, handleSubmit, handleResend: sendResetLink };
}
