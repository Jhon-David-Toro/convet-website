"use client";

import { AuthForm } from "@/components/sections/AuthLayout";
import { Button } from "@/components/ui/Button";
import { pickLabel } from "@/lib/shared/labels";

import { VERIFY_LABELS } from "./VerifyEmailForm.constants";
import type { VerifyEmailFormProps } from "./VerifyEmailForm.types";
import { usePendingEmail } from "./hooks/usePendingEmail";
import { useVerifyEmail } from "./hooks/useVerifyEmail";
import { ResendRow } from "./parts/ResendRow";
import { VerifyEmailFields } from "./parts/VerifyEmailFields";
import { VerifyEmailIntro } from "./parts/VerifyEmailIntro";

/**
 * Email verification page content: icon and heading, the six-digit code, the verify button and the resend countdown.
 *
 * @param props Props of the component, see {@link VerifyEmailFormProps}.
 * @param props.email Address the code was sent to; by default the one saved when the account was created.
 * @param props.onVerify Checks the code; without it a complete code is accepted.
 * @param props.onResend Sends a new code.
 * @returns The rendered element.
 */
export function VerifyEmailForm({ email, onVerify, onResend }: VerifyEmailFormProps) {
  const state = useVerifyEmail({ onVerify, onResend });
  const pendingEmail = usePendingEmail();

  return (
    <AuthForm onSubmit={state.handleSubmit} aria-label="Verify email">
      <VerifyEmailIntro email={email ?? pendingEmail} />
      <VerifyEmailFields code={state.code} setCode={state.setCode} invalid={state.invalid} verifying={state.verifying} />
      <Button type="submit" loading={state.verifying} disabled={!state.complete}>
        {pickLabel(state.verifying, VERIFY_LABELS)}
      </Button>
      <ResendRow seconds={state.seconds} handleResend={state.handleResend} />
    </AuthForm>
  );
}
