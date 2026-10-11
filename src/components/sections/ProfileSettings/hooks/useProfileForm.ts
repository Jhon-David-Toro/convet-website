import { useState } from "react";
import type { SubmitEvent } from "react";

import { hasErrors } from "@/lib/auth/validation.utils";
import type { CustomerProfile } from "@/lib/customer/customer.types";

import type { ProfileErrors, ProfileFormState, UseProfileFormParams } from "../ProfileSettings.types";
import { validateProfile } from "../ProfileSettings.utils";

/**
 * State of the personal information form: values, errors and whether the last save went through.
 *
 * @param params Parameters of the hook, see {@link UseProfileFormParams}.
 * @param params.initial Profile the form starts with.
 * @param params.onSave Receives the values of a valid form.
 * @returns The state and the handlers that change it.
 */
export function useProfileForm({ initial, onSave }: UseProfileFormParams): ProfileFormState {
  const [values, setValues] = useState<CustomerProfile>(initial);
  const [errors, setErrors] = useState<ProfileErrors>({});
  const [saved, setSaved] = useState(false);

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
   * Validates the form and, when it is valid, hands the values over.
   *
   * @param event Submit event of the form.
   */
  function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    const found = validateProfile(values);
    setErrors(found);
    if (hasErrors(found)) return;
    onSave?.(values);
    setSaved(true);
  }

  return { values, errors, saved, setValue, handleSubmit };
}
