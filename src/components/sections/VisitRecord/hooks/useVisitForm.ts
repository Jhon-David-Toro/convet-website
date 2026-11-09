import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

import { useToast } from "@/components/ui/Toast";

import { DRAFT_SAVED_MESSAGE, FINISH_HREF, SIGNED_MESSAGE } from "../VisitRecord.constants";
import type { UseVisitFormParams, VisitFormState, VisitValues } from "../VisitRecord.types";
import { initialValues } from "../VisitRecord.utils";
import { useVaccineToggle } from "./useVaccineToggle";

function notifyResult(
  result: { ok: boolean; message?: string },
  toast: ReturnType<typeof useToast>["toast"],
  successMessage: string,
  onSuccess?: () => void,
) {
  if (!result.ok) {
    result.message && toast({ message: result.message, tone: "error" });
    return;
  }
  toast({ message: successMessage, tone: "success" });
  onSuccess?.();
}

/**
 * Manages visit form: clinical records (vaccines, notes) with draft/sign save workflow.
 * @param visit Appointment/visit data to display; initial values extracted using initialValues util.
 * @param onSave Backend save callback receiving form values; returns result with ok/message. Optional.
 * @returns Form state with vaccine section state, saving flag (for transitions), and save handlers (draft/finish).
 */
export function useVisitForm({ visit, onSave }: UseVisitFormParams): VisitFormState {
  const router = useRouter();
  const { toast } = useToast();
  const vaccine = useVaccineToggle();
  const [values, setValues] = useState(() => initialValues(visit));
  const [saving, startSaving] = useTransition();

  function setValue(field: keyof VisitValues, value: string) {
    setValues((current) => ({ ...current, [field]: value }));
  }

  function save(message: string, onSuccess?: () => void) {
    startSaving(async () => {
      const result = onSave ? await onSave(values) : { ok: true as const };
      notifyResult(result, toast, message, onSuccess);
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
