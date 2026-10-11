import { CUSTOMER_APPOINTMENTS } from "@/lib/customer.constants";
import type { CustomerAppointment } from "@/lib/customer.types";

import { APPOINTMENTS_HREF, CANCEL_PARAM } from "./CustomerAppointments.constants";
import type { AppointmentGroups } from "./CustomerAppointments.types";

/**
 * Appointments of the customer grouped by the tab they belong to.
 *
 * @returns The appointments of every tab.
 */
export function defaultGroups(): AppointmentGroups {
  return {
    upcoming: CUSTOMER_APPOINTMENTS.filter((appointment) => appointment.status === "upcoming" || appointment.status === "today"),
    past: CUSTOMER_APPOINTMENTS.filter((appointment) => appointment.status === "completed"),
    cancelled: CUSTOMER_APPOINTMENTS.filter((appointment) => appointment.status === "cancelled"),
  };
}

/**
 * Link of the page that moves an appointment to another day or time.
 *
 * @param appointment Appointment to move.
 * @returns The reschedule link.
 */
export function rescheduleHref(appointment: CustomerAppointment): string {
  return `/app/reschedule/${appointment.id}`;
}

/**
 * Link that opens the cancel dialog of an appointment.
 *
 * @param appointment Appointment to cancel.
 * @returns The appointments page with the appointment in the query string.
 */
export function cancelHref(appointment: CustomerAppointment): string {
  return `${APPOINTMENTS_HREF}?${CANCEL_PARAM}=${appointment.id}`;
}

/**
 * Moves an appointment from one group to another, changing its status.
 *
 * @param groups Current groups.
 * @param id Id of the appointment.
 * @param from Group it is in.
 * @param to Group it moves to.
 * @returns New groups; the same ones when the appointment is not in `from`.
 */
export function moveAppointment(groups: AppointmentGroups, id: string, from: keyof AppointmentGroups, to: keyof AppointmentGroups): AppointmentGroups {
  const found = groups[from].find((appointment) => appointment.id === id);
  if (!found) return groups;
  const status = to === "cancelled" ? "cancelled" : "upcoming";
  return { ...groups, [from]: groups[from].filter((appointment) => appointment.id !== id), [to]: [{ ...found, status }, ...groups[to]] };
}

/**
 * Description of what cancelling means for an appointment, shown in the dialog.
 *
 * @param appointment Appointment to cancel.
 * @returns The sentence with the pet, the day, the time and the vet.
 */
export function cancelDescription(appointment: CustomerAppointment): string {
  return `Move ${appointment.pet}'s ${appointment.weekday}, ${appointment.month} ${Number(appointment.day)} · ${appointment.startTime} visit to another day with ${appointment.vet} — free until 24 h before. Cancelling is still possible below.`;
}
