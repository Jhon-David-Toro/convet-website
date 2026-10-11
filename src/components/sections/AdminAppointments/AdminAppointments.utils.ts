import { ADMIN_APPOINTMENTS } from "@/lib/admin.constants";
import type { AdminAppointment } from "@/lib/admin.types";

import { ALL_FILTER } from "./AdminAppointments.constants";

/**
 * Appointments that match the selected status chip.
 *
 * @param filter Value of the selected chip, or "all".
 * @returns The appointments to list.
 */
export function appointmentsFor(filter: string): AdminAppointment[] {
  return filter === ALL_FILTER ? ADMIN_APPOINTMENTS : ADMIN_APPOINTMENTS.filter((appointment) => appointment.status === filter);
}
