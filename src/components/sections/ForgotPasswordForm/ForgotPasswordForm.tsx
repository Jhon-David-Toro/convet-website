"use client";

import { AuthForm, AuthHeading } from "@/components/sections/AuthLayout";
import { Button } from "@/components/ui/Button";
import { ArrowLeft } from "@/components/ui/Icon";
import { TextInput } from "@/components/ui/TextInput";
import { SIGN_IN_HREF } from "@/lib/auth/auth.constants";
import { pickLabel } from "@/lib/shared/labels";

import { BACK_LABEL, FORGOT_SUBTITLE, FORGOT_TITLE, SEND_LABELS } from "./ForgotPasswordForm.constants";
import styles from "./ForgotPasswordForm.module.scss";
import type { ForgotPasswordFormProps } from "./ForgotPasswordForm.types";
import { useForgotPassword } from "./hooks/useForgotPassword";
import { ResetSent } from "./parts/ResetSent";

/**
 * Password reset page content: a link back to sign in, the heading, the email form and, once sent, the confirmation.
 *
 * @param props Props of the component, see {@link ForgotPasswordFormProps}.
 * @param props.onSubmit Sends the reset link.
 * @returns The rendered element.
 */
export function ForgotPasswordForm({ onSubmit }: ForgotPasswordFormProps) {
  const state = useForgotPassword({ onSubmit });

  return (
    <AuthForm onSubmit={state.handleSubmit} aria-label={FORGOT_TITLE}>
      <Button variant="tertiary" size="small" href={SIGN_IN_HREF} leadingIcon={ArrowLeft} className={styles.back}>
        {BACK_LABEL}
      </Button>
      <AuthHeading title={FORGOT_TITLE} subtitle={FORGOT_SUBTITLE} loose />
      <TextInput label="Email" type="email" autoComplete="email" value={state.email} error={state.error} onChange={(event) => state.setEmail(event.target.value)} />
      <Button type="submit" loading={state.sending}>
        {pickLabel(state.sending, SEND_LABELS)}
      </Button>
      {state.sentTo && <ResetSent email={state.sentTo} onResend={state.handleResend} />}
    </AuthForm>
  );
}
