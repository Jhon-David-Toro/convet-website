import { useState } from "react";

import type { CustomerReminder } from "@/lib/customer.types";

import type { DismissState } from "../CustomerOverview.types";

/**
 * Reminders the customer has not dismissed yet.
 *
 * @param reminders Every reminder.
 * @returns The reminders still visible and a function that dismisses one.
 */
export function useDismissed(reminders: CustomerReminder[]): DismissState {
  const [dismissed, setDismissed] = useState<string[]>([]);

  return {
    visible: reminders.filter((reminder) => !dismissed.includes(reminder.id)),
    dismiss: (id) => setDismissed((current) => [...current, id]),
  };
}
