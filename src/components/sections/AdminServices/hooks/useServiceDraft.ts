import { useState } from "react";

import { useToast } from "@/components/ui/Toast";
import type { ServiceRow } from "@/lib/admin/admin.types";
import { useActionToast } from "@/lib/shared/useActionToast";

import { PRICE_ERROR, PUBLISHED_MESSAGE } from "../AdminServices.constants";
import type { ServiceActions, ServiceDraft, ServiceDraftState } from "../AdminServices.types";
import { draftOf, flipSpecies, rulesChange } from "../AdminServices.utils";

/**
 * Manages service booking rules: draft edits, change detection, backend persistence.
 * @param service Service row with id, branch affiliation, and initial booking rules.
 * @param saveRules Backend persist callback receiving (branchId, serviceId, change); saves only if rules actually changed. Optional.
 * @returns Draft state with separate saved/draft for change detection; pending flag from async save.
 */
export function useServiceDraft(service: ServiceRow, saveRules?: ServiceActions["saveRules"]): ServiceDraftState {
  const { toast } = useToast();
  const save = useActionToast(saveRules, PUBLISHED_MESSAGE);
  const [saved, setSaved] = useState(() => draftOf(service));
  const [draft, setDraft] = useState(saved);
  const [priceError, setPriceError] = useState<string>();

  async function publish() {
    if (!saveRules || !service.branchId) {
      setSaved(draft);
      toast({ message: PUBLISHED_MESSAGE, tone: "success" });
      return;
    }

    const change = rulesChange(saved, draft);
    if (!change) {
      setPriceError(PRICE_ERROR);
      return;
    }

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
