"use client";

import { AuthForm, AuthHeading } from "@/components/sections/AuthLayout";
import { Button } from "@/components/ui/Button";
import { pickLabel } from "@/lib/shared/labels";

import { SIGN_UP_SUBTITLE, SIGN_UP_TITLE, SUBMIT_LABELS } from "./SignUpForm.constants";
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
 * @param props.onSubmit Creates the account before moving on to the email verification.
 * @returns The rendered element.
 */
export function SignUpForm({ onSubmit }: SignUpFormProps) {
  const { handleSubmit, submitting, ...fields } = useSignUpForm({ onSubmit });

  return (
    <AuthForm onSubmit={handleSubmit} aria-label={SIGN_UP_TITLE}>
      <AuthHeading title={SIGN_UP_TITLE} subtitle={SIGN_UP_SUBTITLE} />
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
