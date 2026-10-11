import { useRouter } from "next/navigation";
import { useState } from "react";
import type { SubmitEvent } from "react";

import { CODE_LENGTH } from "@/lib/auth/auth.constants";

import { RESEND_SECONDS, VERIFIED_HREF } from "../VerifyEmailForm.constants";
import type { UseVerifyEmailParams, VerifyEmailState } from "../VerifyEmailForm.types";
import { useCountdown } from "./useCountdown";

/**
 * State of the email verification: the typed code, whether it was rejected, the request in flight and the resend countdown.
 * A correct code opens the home page.
 *
 * @param params Parameters of the hook, see {@link UseVerifyEmailParams}.
 * @param params.onVerify Checks the code; without it a complete code is accepted.
 * @param params.onResend Sends a new code.
 * @returns The state and the handlers that change it.
 */
export function useVerifyEmail({ onVerify, onResend }: UseVerifyEmailParams): VerifyEmailState {
  const router = useRouter();
  const [code, setCodeValue] = useState("");
  const [invalid, setInvalid] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const { seconds, restart } = useCountdown(RESEND_SECONDS);
  const complete = code.length === CODE_LENGTH;

  /**
   * Stores the typed code and clears the rejection.
   *
   * @param next Digits typed so far.
   */
  function setCode(next: string) {
    setCodeValue(next);
    setInvalid(false);
  }

  /**
   * Checks a complete code and opens the home page when it is right.
   *
   * @param event Submit event of the form.
   */
  async function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!complete) return;
    setVerifying(true);
    const accepted = onVerify ? await onVerify(code) : true;
    setVerifying(false);
    setInvalid(!accepted);
    if (accepted) router.push(VERIFIED_HREF);
  }

  /** Asks for a new code and restarts the countdown. */
  async function handleResend() {
    await onResend?.();
    restart();
  }

  return { code, complete, setCode, invalid, verifying, seconds, handleSubmit, handleResend };
}
