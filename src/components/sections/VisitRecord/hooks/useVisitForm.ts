import { useRouter } from "next/navigation";
import { useState } from "react";

import { useToast } from "@/components/ui/Toast";

import { DRAFT_SAVED_MESSAGE, FINISH_HREF, SIGNED_MESSAGE } from "../VisitRecord.constants";
import type { UseVisitFormParams, VisitFormState, VisitValues } from "../VisitRecord.types";
import { initialValues } from "../VisitRecord.utils";
import { useVaccineToggle } from "./useVaccineToggle";

/**
 * State of the visit form: the value of every field, whether a vaccine is being recorded, and saving a draft or signing the visit.
 *
 * @param params Parameters of the hook, see {@link UseVisitFormParams}.
 * @param params.visit Visit of the record.
 * @returns The values, the functions that change them and the form actions.
 */
export function useVisitForm({ visit }: UseVisitFormParams): VisitFormState {
  const router = useRouter();
  const { toast } = useToast();
  const vaccine = useVaccineToggle();
  const [values, setValues] = useState(() => initialValues(visit));

  /**
   * Changes the value of one field.
   *
   * @param field Field to change.
   * @param value New value.
   */
  function setValue(field: keyof VisitValues, value: string) {
    setValues((current) => ({ ...current, [field]: value }));
  }

  /** Tells the user the draft was saved. */
  function saveDraft() {
    toast({ message: DRAFT_SAVED_MESSAGE });
  }

  /** Signs the visit and goes back to Today. */
  function finish() {
    toast({ message: SIGNED_MESSAGE, tone: "success" });
    router.push(FINISH_HREF);
  }

  return { ...vaccine, values, bind: (field) => ({ value: values[field], onChange: (event) => setValue(field, event.target.value) }), setValue, saveDraft, finish };
}
