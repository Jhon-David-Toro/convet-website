"use client";

import { AuthForm, AuthHeading, AuthIcon } from "@/components/sections/AuthLayout";
import { Button } from "@/components/ui/Button";
import { Checkbox } from "@/components/ui/Checkbox";
import { Shield } from "@/components/ui/Icon";
import { TextInput } from "@/components/ui/TextInput";
import { pickLabel } from "@/lib/shared/labels";

import {
  CODE_FIELD_LABEL,
  CODE_HELPER,
  CODE_PLACEHOLDER,
  SUBMIT_LABELS,
  TRUST_LABEL,
  TWO_STEP_SUBTITLE,
  TWO_STEP_TITLE,
} from "./TwoStepForm.constants";
import type { TwoStepFormProps } from "./TwoStepForm.types";
import { useTwoStep } from "./hooks/useTwoStep";

/**
 * Staff 2-step verification page content: a shield, the heading, the authenticator code, the trust checkbox and the submit button.
 *
 * @param props Props of the component, see {@link TwoStepFormProps}.
 * @param props.onSubmit Checks the code; without it a complete code is accepted.
 * @returns The rendered element.
 */
export function TwoStepForm({ onSubmit }: TwoStepFormProps) {
  const state = useTwoStep({ onSubmit });

  return (
    <AuthForm onSubmit={state.handleSubmit} aria-label={TWO_STEP_TITLE}>
      <AuthIcon icon={Shield} />
      <AuthHeading title={TWO_STEP_TITLE} subtitle={TWO_STEP_SUBTITLE} loose />
      <TextInput
        label={CODE_FIELD_LABEL}
        inputMode="numeric"
        autoComplete="one-time-code"
        placeholder={CODE_PLACEHOLDER}
        helper={CODE_HELPER}
        value={state.code}
        error={state.error}
        onChange={(event) => state.setCode(event.target.value)}
      />
      <Checkbox label={TRUST_LABEL} checked={state.trustDevice} onChange={(event) => state.setTrustDevice(event.target.checked)} />
      <Button type="submit" loading={state.submitting}>
        {pickLabel(state.submitting, SUBMIT_LABELS)}
      </Button>
    </AuthForm>
  );
}
