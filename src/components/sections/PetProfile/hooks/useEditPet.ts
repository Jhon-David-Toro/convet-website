import { useState } from "react";
import type { SubmitEvent } from "react";

import type { NewPetErrors, NewPetValues } from "@/components/sections/MyPets/MyPets.types";
import { ageFromBirthDate, pickFieldErrors, validateNewPet } from "@/components/sections/MyPets/MyPets.utils";
import { hasErrors } from "@/lib/auth/validation.utils";

import { UNEXPECTED_ERROR } from "../PetProfile.constants";
import type { EditPetState, UseEditPetParams } from "./useEditPet.types";

function validatePetInput(values: NewPetValues): NewPetErrors {
  return validateNewPet(values, new Date());
}

async function savePetChanges(
  idPet: string,
  values: NewPetValues,
  onSave: UseEditPetParams["onSave"],
): Promise<{ ok: boolean; fieldErrors?: Record<string, string>; message?: string } | undefined> {
  try {
    return await onSave(idPet, values);
  } catch {
    return undefined;
  }
}

/**
 * Manages pet edit form: values, validation, and submission with change persistence.
 * @param idPet Pet ID to edit; passed to onSave for the backend request.
 * @param initial Pet data to display in form; used as starting state.
 * @param onSave Backend callback receiving (petId, values) and returning result with optional errors.
 * @param onSaved Called after successful backend save; receives updated pet values.
 * @returns Form state with pet-specific age calculation and error tracking.
 */
export function useEditPet({ idPet, initial, onSave, onSaved }: UseEditPetParams): EditPetState {
  const [values, setValues] = useState<NewPetValues>(initial);
  const [errors, setErrors] = useState<NewPetErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string>();

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
    const result = await savePetChanges(idPet, values, onSave);
    setSubmitting(false);

    if (result?.ok) {
      onSaved(values);
      return;
    }

    if (!result) {
      setSubmitError(UNEXPECTED_ERROR);
      return;
    }

    const fields = pickFieldErrors(result.fieldErrors);
    setErrors(fields);
    setSubmitError(hasErrors(fields) ? undefined : result.message);
  }

  return {
    values,
    errors,
    age: ageFromBirthDate(values.birthDate, new Date()),
    submitting,
    submitError,
    setValue,
    handleSubmit,
  };
}
