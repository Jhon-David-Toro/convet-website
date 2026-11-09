"use client";

import { AuthForm, AuthHeading } from "@/components/sections/AuthLayout";
import { Alert } from "@/components/ui/Alert";
import { Button } from "@/components/ui/Button";
import { pickLabel } from "@/lib/shared/labels";

import { SIGN_UP_SUBTITLE, SIGN_UP_TITLE, SUBMIT_ERROR_TITLE, SUBMIT_LABELS } from "./SignUpForm.constants";
import type { SignUpFormProps } from "./SignUpForm.types";
import { useSignUpForm } from "./hooks/useSignUpForm";
import { SignUpConsents } from "./parts/SignUpConsents";
import { SignUpContactFields } from "./parts/SignUpContactFields";
import { SignUpFooter } from "./parts/SignUpFooter";
import { SignUpNameFields } from "./parts/SignUpNameFields";
import { SignUpPassword } from "./parts/SignUpPassword";

/**
 * Create-account page content: heading, the registration form and the link back to sign in.
 *
 * @param props Props of the component, see {@link SignUpFormProps}.
 * @param props.onSubmit Creates the account and moves on to sign in.
 * @returns The rendered element.
 */
export function SignUpForm({ onSubmit }: SignUpFormProps) {
  const { handleSubmit, submitting, submitError, ...fields } = useSignUpForm({ onSubmit });

  return (
    <AuthForm onSubmit={handleSubmit} aria-label={SIGN_UP_TITLE}>
      <AuthHeading title={SIGN_UP_TITLE} subtitle={SIGN_UP_SUBTITLE} />
      {submitError && (
        <Alert tone="error" title={SUBMIT_ERROR_TITLE}>
          {submitError}
        </Alert>
      )}
      <SignUpNameFields {...fields} />
      <SignUpContactFields {...fields} />
      <SignUpPassword {...fields} />
      <SignUpConsents {...fields} />
      <Button type="submit" loading={submitting}>
        {pickLabel(submitting, SUBMIT_LABELS)}
      </Button>
      <SignUpFooter />
    </AuthForm>
  );
}
