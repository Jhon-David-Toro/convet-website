import React, { useState } from "react";
import type { SubmitEvent } from "react";

import { hasErrors } from "@/lib/auth/validation.utils";

import { EMPTY_PET, UNEXPECTED_ERROR } from "../MyPets.constants";
import type { AddPetState, NewPetErrors, NewPetValues, UseAddPetParams } from "../MyPets.types";
import { ageFromBirthDate, describeFile, pickFieldErrors, validateNewPet } from "../MyPets.utils";

function validatePetInput(values: NewPetValues): NewPetErrors {
  return validateNewPet(values, new Date());
}

async function savePet(
  values: NewPetValues,
  onSave: UseAddPetParams["onSave"],
): Promise<{ ok: boolean; fieldErrors?: Record<string, string>; message?: string }> {
  try {
    return (await onSave?.(values)) ?? { ok: true };
  } catch {
    return { ok: false, message: UNEXPECTED_ERROR };
  }
}

/**
 * Manages pet creation form: values, file upload state, and backend submission.
 * @param onClose Called after successful pet creation to close the modal.
 * @param onSave Backend submission callback; returns result with optional field errors. Optional.
 * @returns Form state including file object, age calculation, and all handlers for input changes.
 */
export function useAddPet({ onClose, onSave }: UseAddPetParams): AddPetState {
  const [values, setValues] = useState<NewPetValues>(EMPTY_PET);
  const [errors, setErrors] = useState<NewPetErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string>();
  const [file, setFile] = useState<AddPetState["file"]>();

  function setValue<Field extends keyof NewPetValues>(field: Field, value: NewPetValues[Field]) {
    setValues((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
  }

  async function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting) return;

    const found = validatePetInput(values);
    setErrors(found);
    setSubmitError(undefined);
    if (hasErrors(found)) return;

    setSubmitting(true);
    try {
      const result = await savePet(values, onSave);
      if (result.ok) {
        setValues(EMPTY_PET);
        setFile(undefined);
        onClose();
        return;
      }
      const fields = pickFieldErrors(result.fieldErrors);
      setErrors(fields);
      setSubmitError(hasErrors(fields) ? undefined : result.message);
    } finally {
      setSubmitting(false);
    }
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
