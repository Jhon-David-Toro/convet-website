import { useState } from "react";

import { useToast } from "@/components/ui/Toast";

import { PUBLISHED_MESSAGE } from "../AdminServices.constants";
import type { ServiceDraft, ServiceDraftState } from "../AdminServices.types";
import { draftOf, flipSpecies } from "../AdminServices.utils";
import type { ServiceRow } from "@/lib/admin.types";

/**
 * Booking rules of a service being edited: the draft values, the functions that change them, and the buttons that discard or publish.
 *
 * @param service Service whose rules are edited.
 * @returns The draft and the functions that change it.
 */
export function useServiceDraft(service: ServiceRow): ServiceDraftState {
  const { toast } = useToast();
  const [saved, setSaved] = useState(() => draftOf(service));
  const [draft, setDraft] = useState(saved);

  return {
    draft,
    setField: <Field extends keyof ServiceDraft>(field: Field, value: ServiceDraft[Field]) => setDraft((current) => ({ ...current, [field]: value })),
    toggleSpecies: (species) => setDraft((current) => ({ ...current, species: flipSpecies(current.species, species) })),
    discard: () => setDraft(saved),
    publish: () => {
      setSaved(draft);
      toast({ message: PUBLISHED_MESSAGE, tone: "success" });
    },
  };
}
