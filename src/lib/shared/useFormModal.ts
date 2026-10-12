import { useEffect, useState } from "react";

import { SAVING_DELAY_MS } from "./formModal.constants";
import { finishSaving } from "./formModal.utils";
import type { FormErrors, FormModalState, FormModalStatus, UseFormModalParams } from "./useFormModal.types";

/**
 * State of a form that lives in a dialog: its values and errors, and the steps of saving it (idle, error, saving, success).
 * Saving is simulated: the design has no backend, so a valid form goes to saving and, a moment later, to success.
 *
 * @param params Parameters of the hook, see {@link UseFormModalParams}.
 * @param params.initial Values the form starts with.
 * @param params.validate Gives the message of every invalid field; empty when the form can be saved.
 * @param params.onSaved Called when saving is done, for dialogs that have no confirmation of their own.
 * @returns The values, errors and status of the form, how many fields are wrong, and the functions that change a value or submit it.
 */
export function useFormModal<Values>({ initial, validate, onSaved }: UseFormModalParams<Values>): FormModalState<Values> {
  const [values, setValues] = useState<Values>(initial);
  const [errors, setErrors] = useState<FormErrors<Values>>({});
  const [status, setStatus] = useState<FormModalStatus>("idle");

  useEffect(() => finishSaving(status, SAVING_DELAY_MS, () => {
    setStatus("success");
    onSaved?.();
  }), [status, onSaved]);

  return {
    values,
    errors,
    status,
    errorCount: Object.values(errors).filter(Boolean).length,
    setValue: (field, value) => {
      setValues((current) => ({ ...current, [field]: value }));
      setErrors((current) => ({ ...current, [field]: undefined }));
    },
    submit: () => {
      const found = validate(values);
      setErrors(found);
      setStatus(Object.keys(found).length > 0 ? "error" : "saving");
    },
  };
}
