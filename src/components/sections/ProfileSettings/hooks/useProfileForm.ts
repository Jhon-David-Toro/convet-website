import { useState } from "react";
import type { SubmitEvent } from "react";

import { hasErrors } from "@/lib/auth/validation.utils";
import type { CustomerProfile } from "@/lib/customer/customer.types";

import { EMAIL_TAKEN_ERROR } from "../ProfileSettings.constants";
import type { ProfileErrors, ProfileFormState, UseProfileFormParams } from "../ProfileSettings.types";
import { validateProfile } from "../ProfileSettings.utils";

/**
 * State of the personal information form: values, errors, the saving state and whether the last save went through.
 *
 * @param params Parameters of the hook, see {@link UseProfileFormParams}.
 * @param params.initial Profile the form starts with.
 * @param params.onSave Saves the values of a valid form.
 * @returns The state and the handlers that change it.
 */
export function useProfileForm({ initial, onSave }: UseProfileFormParams): ProfileFormState {
  const [values, setValues] = useState<CustomerProfile>(initial);
  const [errors, setErrors] = useState<ProfileErrors>({});
  const [saved, setSaved] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string>();

  /**
   * Changes one value, clears its error and the "saved" confirmation.
   *
   * @param field Field to change.
   * @param value New value of the field.
   */
  function setValue<Field extends keyof CustomerProfile>(field: Field, value: CustomerProfile[Field]) {
    setValues((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
    setSaved(false);
  }

  /**
   * Validates the form and saves it. A taken email is shown on its field and any other failure in a banner; what was typed is kept.
   *
   * @param event Submit event of the form.
   */
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
    if (result.kind === "conflict") setErrors({ email: EMAIL_TAKEN_ERROR });
    else if (result.fieldErrors && hasErrors(result.fieldErrors)) setErrors(result.fieldErrors);
    else setSubmitError(result.message);
  }

  return { values, errors, saved, submitting, submitError, setValue, handleSubmit };
}
