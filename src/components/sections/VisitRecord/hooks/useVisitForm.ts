import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

import { useToast } from "@/components/ui/Toast";

import { DRAFT_SAVED_MESSAGE, FINISH_HREF, SIGNED_MESSAGE } from "../VisitRecord.constants";
import type { UseVisitFormParams, VisitFormState, VisitValues } from "../VisitRecord.types";
import { initialValues } from "../VisitRecord.utils";
import { useVaccineToggle } from "./useVaccineToggle";

/**
 * State of the visit form: the values, the vaccine section, and the buttons that save the draft or sign the visit. With `onSave`,
 * both buttons save the clinical texts in the backend first and only go on when it worked.
 *
 * @param params Parameters of the hook, see {@link UseVisitFormParams}.
 * @param params.visit Visit being recorded.
 * @param params.onSave Saves the visit in the backend.
 * @returns The state of the form and its actions.
 */
export function useVisitForm({ visit, onSave }: UseVisitFormParams): VisitFormState {
  const router = useRouter();
  const { toast } = useToast();
  const vaccine = useVaccineToggle();
  const [values, setValues] = useState(() => initialValues(visit));
  const [saving, startSaving] = useTransition();

  /**
   * Changes the value of one field.
   *
   * @param field Field to change.
   * @param value New value.
   */
  function setValue(field: keyof VisitValues, value: string) {
    setValues((current) => ({ ...current, [field]: value }));
  }

  /**
   * Saves the visit (in the backend when there is `onSave`), tells the user, and runs the next step when it worked.
   *
   * @param message Message of the success toast.
   * @param then Step after a successful save.
   */
  function save(message: string, then?: () => void) {
    startSaving(async () => {
      const result = onSave ? await onSave(values) : { ok: true as const };
      if (!result.ok) {
        toast({ message: result.message, tone: "error" });
        return;
      }
      toast({ message, tone: "success" });
      then?.();
    });
  }

  return {
    ...vaccine,
    values,
    saving,
    bind: (field) => ({ value: values[field], onChange: (event) => setValue(field, event.target.value) }),
    setValue,
    saveDraft: () => save(DRAFT_SAVED_MESSAGE),
    finish: () => save(SIGNED_MESSAGE, () => router.push(FINISH_HREF)),
  };
}
