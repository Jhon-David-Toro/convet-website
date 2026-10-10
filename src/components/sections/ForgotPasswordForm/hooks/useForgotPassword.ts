import { useState } from "react";
import type { SubmitEvent } from "react";

import type { ForgotPasswordState, UseForgotPasswordParams } from "../ForgotPasswordForm.types";
import { validateResetEmail } from "../ForgotPasswordForm.utils";

/**
 * State of the reset form: the typed email, its error, the request in flight and the address the link was sent to.
 *
 * @param params Parameters of the hook, see {@link UseForgotPasswordParams}.
 * @param params.onSubmit Sends the reset link.
 * @returns The state and the handlers that change it.
 */
export function useForgotPassword({ onSubmit }: UseForgotPasswordParams): ForgotPasswordState {
  const [email, setEmailValue] = useState("");
  const [error, setError] = useState<string>();
  const [sentTo, setSentTo] = useState<string>();
  const [sending, setSending] = useState(false);

  /**
   * Stores the typed email and clears its error.
   *
   * @param next Address typed so far.
   */
  function setEmail(next: string) {
    setEmailValue(next);
    setError(undefined);
  }

  /** Sends the reset link to the typed address and remembers it for the confirmation. */
  async function send() {
    setSending(true);
    await onSubmit?.(email.trim());
    setSending(false);
    setSentTo(email.trim());
  }

  /**
   * Validates the email and sends the link.
   *
   * @param event Submit event of the form.
   */
  async function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    const found = validateResetEmail(email);
    setError(found);
    if (!found) await send();
  }

  return { email, setEmail, error, sentTo, sending, handleSubmit, handleResend: send };
}
