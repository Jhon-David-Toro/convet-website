import { useEffect, useState } from "react";

import { SAVING_DELAY_MS } from "./formModal.constants";
import { finishSaving } from "./formModal.utils";
import type { FormErrors, FormModalState, FormModalStatus, UseFormModalParams } from "./useFormModal.types";

/**
 * State of a form that lives in a dialog: its values and errors, and the steps of saving it (idle, error, saving, success).
 * Without `save`, saving is simulated (a valid form goes to saving and, a moment later, to success). With `save`, the form waits for it:
 * success closes the flow, a failure goes back to the error step with its message and field errors.
 *
 * @param params Parameters of the hook, see {@link UseFormModalParams}.
 * @param params.initial Values the form starts with.
 * @param params.validate Gives the message of every invalid field; empty when the form can be saved.
 * @param params.save Saves the values for real.
 * @param params.onSaved Called when saving is done, for dialogs that have no confirmation of their own.
 * @returns The values, errors and status of the form, how many fields are wrong, and the functions that change a value or submit it.
 */
export function useFormModal<Values>({ initial, validate, save, onSaved }: UseFormModalParams<Values>): FormModalState<Values> {
  const [values, setValues] = useState<Values>(initial);
  const [errors, setErrors] = useState<FormErrors<Values>>({});
  const [status, setStatus] = useState<FormModalStatus>("idle");
  const [serverError, setServerError] = useState<string>();

  useEffect(() => (save ? undefined : finishSaving(status, SAVING_DELAY_MS, () => {
    setStatus("success");
    onSaved?.();
  })), [status, save, onSaved]);

  /** Runs the real save and moves the form to success or back to the error step. */
  async function saveForReal(saveValues: NonNullable<typeof save>) {
    const result = await saveValues(values);
    if (result.ok) {
      setStatus("success");
      onSaved?.();
      return;
    }
    setErrors(result.fieldErrors ?? {});
    setServerError(result.message);
    setStatus("error");
  }

  return {
    values,
    errors,
    status,
    errorCount: Object.values(errors).filter(Boolean).length,
    setValue: (field, value) => {
      setValues((current) => ({ ...current, [field]: value }));
      setErrors((current) => ({ ...current, [field]: undefined }));
    },
    serverError,
    submit: () => {
      const found = validate(values);
      setErrors(found);
      setServerError(undefined);
      const valid = Object.keys(found).length === 0;
      setStatus(valid ? "saving" : "error");
      return valid && save ? saveForReal(save) : undefined;
    },
  };
}
