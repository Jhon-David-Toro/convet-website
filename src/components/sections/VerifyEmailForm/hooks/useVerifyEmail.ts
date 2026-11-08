import { useRouter } from "next/navigation";
import { useState } from "react";
import type { SubmitEvent } from "react";

import { CODE_LENGTH } from "@/lib/auth/auth.constants";

import { RESEND_SECONDS, VERIFIED_HREF } from "../VerifyEmailForm.constants";
import type { UseVerifyEmailParams, VerifyEmailState } from "../VerifyEmailForm.types";
import { useCountdown } from "./useCountdown";

/**
 * Manages email verification: code input, validation, and resend countdown timer.
 * @param onVerify Backend verification callback receiving code; returns true if valid, false if rejected. Optional.
 * @param onResend Backend resend callback to request a new code; restarts countdown timer. Optional.
 * @returns Form state with code, complete flag (length check), invalid flag, and countdown seconds.
 */
export function useVerifyEmail({ onVerify, onResend }: UseVerifyEmailParams): VerifyEmailState {
  const router = useRouter();
  const [code, setCodeValue] = useState("");
  const [invalid, setInvalid] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const { seconds, restart } = useCountdown(RESEND_SECONDS);
  const complete = code.length === CODE_LENGTH;

  function setCode(next: string) {
    setCodeValue(next);
    setInvalid(false);
  }

  async function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!complete) return;

    setVerifying(true);
    const accepted = onVerify ? await onVerify(code) : true;
    setVerifying(false);

    setInvalid(!accepted);
    if (accepted) router.push(VERIFIED_HREF);
  }

  async function handleResend() {
    await onResend?.();
    restart();
  }

  return { code, complete, setCode, invalid, verifying, seconds, handleSubmit, handleResend };
}
