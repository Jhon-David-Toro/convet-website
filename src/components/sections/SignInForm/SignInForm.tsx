"use client";

import { AuthForm, AuthHeading } from "@/components/sections/AuthLayout";
import { Button } from "@/components/ui/Button";
import { pickLabel } from "@/lib/labels";

import { SIGN_IN_SUBTITLE, SIGN_IN_TITLE, SUBMIT_LABELS } from "./SignInForm.constants";
import type { SignInFormProps } from "./SignInForm.types";
import { useSignInForm } from "./hooks/useSignInForm";
import { SignInAlert } from "./parts/SignInAlert";
import { SignInFields } from "./parts/SignInFields";
import { SignInFooter } from "./parts/SignInFooter";
import { SignInOptions } from "./parts/SignInOptions";

/**
 * Sign-in page content: heading, the credentials form (with its error and loading states) and the links to other auth pages.
 *
 * @param props Props of the component, see {@link SignInFormProps}.
 * @param props.onSubmit Checks the credentials; without it a valid form is accepted.
 * @returns The rendered element.
 */
export function SignInForm({ onSubmit }: SignInFormProps) {
  const form = useSignInForm({ onSubmit });
  const submitting = form.status === "submitting";

  return (
    <AuthForm onSubmit={form.handleSubmit} aria-label={SIGN_IN_TITLE}>
      <AuthHeading title={SIGN_IN_TITLE} subtitle={SIGN_IN_SUBTITLE} />
      {form.status === "error" && <SignInAlert />}
      <SignInFields values={form.values} errors={form.errors} setValue={form.setValue} />
      <SignInOptions values={form.values} setValue={form.setValue} />
      <Button type="submit" loading={submitting}>
        {pickLabel(submitting, SUBMIT_LABELS)}
      </Button>
      <SignInFooter />
    </AuthForm>
  );
}
