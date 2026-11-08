import { useState } from "react";
import type { SubmitEvent } from "react";

import { hasErrors } from "@/lib/auth/validation.utils";
import type { CustomerProfile } from "@/lib/customer/customer.types";

import { EMAIL_TAKEN_ERROR } from "../ProfileSettings.constants";
import type { ProfileErrors, ProfileFormState, UseProfileFormParams } from "../ProfileSettings.types";
import { validateProfile } from "../ProfileSettings.utils";

function handleProfileError(
  result: { ok: false; kind?: string; fieldErrors?: Record<string, string>; message?: string },
  setErrors: (errors: ProfileErrors) => void,
  setSubmitError: (error?: string) => void,
) {
  if (result.kind === "conflict") {
    setErrors({ email: EMAIL_TAKEN_ERROR });
    return;
  }
  if (result.fieldErrors && hasErrors(result.fieldErrors)) {
    setErrors(result.fieldErrors);
    return;
  }
  setSubmitError(result.message);
}

/**
 * Manages profile edit form: personal information with email uniqueness validation and save confirmation.
 * @param initial Customer profile to display; used as starting state and for detecting changes.
 * @param onSave Backend profile update callback; returns result with ok/kind/fieldErrors. Optional.
 * @returns Form state with saved confirmation flag; clears confirmation when any field changes.
 */
export function useProfileForm({ initial, onSave }: UseProfileFormParams): ProfileFormState {
  const [values, setValues] = useState<CustomerProfile>(initial);
  const [errors, setErrors] = useState<ProfileErrors>({});
  const [saved, setSaved] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string>();

  function setValue<Field extends keyof CustomerProfile>(field: Field, value: CustomerProfile[Field]) {
    setValues((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
    setSaved(false);
  }

  async function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting) return;

    const found = validateProfile(values);
    setErrors(found);
    setSubmitError(undefined);
    if (hasErrors(found)) return;

    setSubmitting(true);
    const result = (await onSave?.(values)) ?? { ok: true as const, data: undefined };
    setSubmitting(false);

    if (result.ok) {
      setSaved(true);
      return;
    }

    handleProfileError(result, setErrors, setSubmitError);
  }

  return { values, errors, saved, submitting, submitError, setValue, handleSubmit };
}
