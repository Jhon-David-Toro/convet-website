import { useState } from "react";

import { useToast } from "@/components/ui/Toast";
import type { ServiceRow } from "@/lib/admin/admin.types";
import { useActionToast } from "@/lib/shared/useActionToast";

import { PRICE_ERROR, PUBLISHED_MESSAGE } from "../AdminServices.constants";
import type { ServiceActions, ServiceDraft, ServiceDraftState } from "../AdminServices.types";
import { draftOf, flipSpecies, rulesChange } from "../AdminServices.utils";

/**
 * Booking rules of a service being edited: the draft values, the functions that change them, and the buttons that discard or publish.
 * With `saveRules`, publishing sends the bookable state and the price to the backend and keeps the draft only when it worked.
 *
 * @param service Service whose rules are edited.
 * @param saveRules Server Action that saves the rules of a service of a branch.
 * @returns The draft and the functions that change it.
 */
export function useServiceDraft(service: ServiceRow, saveRules?: ServiceActions["saveRules"]): ServiceDraftState {
  const { toast } = useToast();
  const save = useActionToast(saveRules, PUBLISHED_MESSAGE);
  const [saved, setSaved] = useState(() => draftOf(service));
  const [draft, setDraft] = useState(saved);
  const [priceError, setPriceError] = useState<string>();

  /** Saves the draft: in the backend when the service belongs to a branch, otherwise only on screen. */
  async function publish() {
    if (!saveRules || !service.branchId) {
      setSaved(draft);
      toast({ message: PUBLISHED_MESSAGE, tone: "success" });
      return;
    }
    const change = rulesChange(saved, draft);
    if (!change) return setPriceError(PRICE_ERROR);
    setPriceError(undefined);
    const result = await save.run(service.branchId, service.id, change);
    if (result?.ok) setSaved(draft);
  }

  return {
    draft,
    pending: save.pending,
    priceError,
    setField: <Field extends keyof ServiceDraft>(field: Field, value: ServiceDraft[Field]) => setDraft((current) => ({ ...current, [field]: value })),
    toggleSpecies: (species) => setDraft((current) => ({ ...current, species: flipSpecies(current.species, species) })),
    discard: () => {
      setDraft(saved);
      setPriceError(undefined);
    },
    publish: () => void publish(),
  };
}
