import { useState } from "react";
import type { SubmitEvent } from "react";

import { hasErrors } from "@/lib/auth/validation.utils";
import type { ActionResult } from "@/lib/api/api.types";
import type { PetItem } from "@/lib/customer/customer.types";

import { EMPTY_PET, UNEXPECTED_ERROR } from "../MyPets.constants";
import type {
  AddPetState,
  NewPetErrors,
  NewPetValues,
  UseAddPetParams,
} from "../MyPets.types";
import {
  ageFromBirthDate,
  describeFile,
  pickFieldErrors,
  validateNewPet,
} from "../MyPets.utils";

function validatePetInput(values: NewPetValues): NewPetErrors {
  return validateNewPet(values, new Date());
}

async function savePet(
  values: NewPetValues,
  onSave: UseAddPetParams["onSave"],
): Promise<ActionResult<PetItem | void>> {
  try {
    return (
      (await onSave?.(values)) ?? {
        ok: true,
        data: undefined,
      }
    );
  } catch {
    return {
      ok: false,
      kind: "server",
      message: UNEXPECTED_ERROR,
    };
  }
}

/**
 * Manages pet creation form: values, file upload state, and backend submission.
 *
 * @param onClose Called after successful pet creation to close the modal.
 * @param onSave Backend submission callback.
 * @param onCreated Called with the created pet when the backend returns it.
 * @returns Form state and handlers for input changes and submission.
 */
export function useAddPet({
  onClose,
  onSave,
  onCreated,
}: UseAddPetParams): AddPetState {
  const [values, setValues] = useState<NewPetValues>(EMPTY_PET);
  const [errors, setErrors] = useState<NewPetErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string>();
  const [file, setFile] = useState<AddPetState["file"]>();

  function setValue<Field extends keyof NewPetValues>(
    field: Field,
    value: NewPetValues[Field],
  ) {
    setValues((current) => ({
      ...current,
      [field]: value,
    }));

    setErrors((current) => ({
      ...current,
      [field]: undefined,
    }));
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
        if (result.data) {
          onCreated?.(result.data);
        }

        setValues(EMPTY_PET);
        setFile(undefined);
        onClose();
        return;
      }

      const fields = pickFieldErrors(result.fieldErrors);

      setErrors(fields);
      setSubmitError(
        hasErrors(fields) ? undefined : result.message,
      );
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
    selectFile: (picked) =>
      setFile({
        name: picked.name,
        description: describeFile(picked),
      }),
    removeFile: () => setFile(undefined),
    handleSubmit,
  };
}