import { useState } from "react";
import type { SubmitEvent } from "react";

import { hasErrors } from "@/lib/validation.utils";

import { EMPTY_PET } from "../MyPets.constants";
import type { AddPetState, NewPetErrors, NewPetValues, UseAddPetParams } from "../MyPets.types";
import { ageFromBirthDate, describeFile, validateNewPet } from "../MyPets.utils";

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
   * Validates the form and, when it is valid, hands the values over, empties the form and closes the modal.
   *
   * @param event Submit event of the form.
   */
  function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    const found = validateNewPet(values, new Date());
    setErrors(found);
    if (hasErrors(found)) return;
    onSave?.(values);
    setValues(EMPTY_PET);
    setFile(undefined);
    onClose();
  }

  return {
    values,
    errors,
    age: ageFromBirthDate(values.birthDate, new Date()),
    file,
    setValue,
    selectFile: (picked) => setFile({ name: picked.name, description: describeFile(picked) }),
    removeFile: () => setFile(undefined),
    handleSubmit,
  };
}
