import { useState } from "react";

import type { AppointmentGroups, AppointmentsState } from "../CustomerAppointments.types";
import { moveAppointment } from "../CustomerAppointments.utils";

/**
 * Appointments of the customer by tab, with the functions that cancel one and bring it back (the "Undo" of the toast).
 *
 * @param initial Appointments the page starts with.
 * @returns The groups and the functions that change them.
 */
export function useAppointments(initial: AppointmentGroups): AppointmentsState {
  const [groups, setGroups] = useState(initial);

  return {
    groups,
    cancel: (id) => setGroups((current) => moveAppointment(current, id, "upcoming", "cancelled")),
    restore: (id) => setGroups((current) => moveAppointment(current, id, "cancelled", "upcoming")),
  };
}
