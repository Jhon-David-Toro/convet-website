import { useState } from "react";
import type { SubmitEvent } from "react";

import { hasErrors } from "@/lib/auth/validation.utils";

import { EMPTY_PET } from "../MyPets.constants";
import type { AddPetState, NewPetErrors, NewPetValues, UseAddPetParams } from "../MyPets.types";
import { ageFromBirthDate, describeFile, pickFieldErrors, validateNewPet } from "../MyPets.utils";

/**
 * State of the "Add a pet" form: values, errors, the chosen photo or document and the age worked out from the date of birth.
 *
 * @param params Parameters of the hook, see {@link UseAddPetParams}.
 * @param params.onClose Closes the modal after saving.
 * @param params.onSave Receives the values of a valid form.
 * @returns The state and the handlers that change it.
 */
export function useAddPet({ onClose, onSave }: UseAddPetParams): AddPetState {
  const [values, setValues] = useState<NewPetValues>(EMPTY_PET);
  const [errors, setErrors] = useState<NewPetErrors>({});
  const [file, setFile] = useState<AddPetState["file"]>();
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string>();

  /**
   * Changes one value and clears the error of that field.
   *
   * @param field Field to change.
   * @param value New value of the field.
   */
  function setValue<Field extends keyof NewPetValues>(field: Field, value: NewPetValues[Field]) {
    setValues((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
  }

  /**
   * Validates the form and, when it is valid, saves the pet. The modal closes and the form empties only when the save worked;
   * otherwise the error stays on screen and the customer's data is kept.
   *
   * @param event Submit event of the form.
   */
  async function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting) return;
    const found = validateNewPet(values, new Date());
    setErrors(found);
    setSubmitError(undefined);
    if (hasErrors(found)) return;
    setSubmitting(true);
    const result = (await onSave?.(values)) ?? { ok: true as const, data: undefined };
    setSubmitting(false);
    if (!result.ok) {
      const fields = pickFieldErrors(result.fieldErrors);
      setErrors(fields);
      setSubmitError(hasErrors(fields) ? undefined : result.message);
      return;
    }
    setValues(EMPTY_PET);
    setFile(undefined);
    onClose();
  }

  return {
    values,
    errors,
    age: ageFromBirthDate(values.birthDate, new Date()),
    submitting,
    submitError,
    file,
    setValue,
    selectFile: (picked) => setFile({ name: picked.name, description: describeFile(picked) }),
    removeFile: () => setFile(undefined),
    handleSubmit,
  };
}
