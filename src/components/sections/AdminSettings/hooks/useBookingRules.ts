import { useState } from "react";

import { useToast } from "@/components/ui/Toast";
import { BOOKING_RULES } from "@/lib/admin/admin.constants";

import { RULES_SAVED_MESSAGE } from "../AdminSettings.constants";
import type { RulesState } from "../AdminSettings.types";

/**
 * Booking rules being edited: the current values, a function that changes one, one that goes back to the saved values, and one that saves.
 *
 * @returns The rules and the functions that change or save them.
 */
export function useBookingRules(): RulesState {
  const { toast } = useToast();
  const [saved, setSaved] = useState(BOOKING_RULES);
  const [rules, setRules] = useState(saved);

  return {
    rules,
    setRule: (key, value) => setRules((current) => ({ ...current, [key]: value })),
    discard: () => setRules(saved),
    save: () => {
      setSaved(rules);
      toast({ message: RULES_SAVED_MESSAGE, tone: "success" });
    },
  };
}
