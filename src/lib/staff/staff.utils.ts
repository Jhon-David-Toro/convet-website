import { minutesToLabel } from "@/lib/booking/booking.utils";

import { MINUTES_PER_HOUR, STAFF_APPOINTMENTS, STAFF_VETS } from "./staff.constants";
import type { StaffAppointment, StaffVet } from "./staff.types";

/**
 * Minutes since midnight of a time such as "9:30" or "14:00".
 *
 * @param time Time as `H:MM` in 24-hour format.
 * @returns The minutes since midnight.
 */
export function toMinutes(time: string): number {
  const [hours, minutes] = time.split(":").map(Number);
  return hours * MINUTES_PER_HOUR + minutes;
}

/**
 * Time such as "10:00" for a number of minutes since midnight.
 *
 * @param minutes Minutes since midnight.
 * @returns The time as `H:MM`.
 */
export function toTime(minutes: number): string {
  const hours = Math.floor(minutes / MINUTES_PER_HOUR);
  return `${hours}:${String(minutes % MINUTES_PER_HOUR).padStart(2, "0")}`;
}

/**
 * Time at which an appointment ends.
 *
 * @param appointment Appointment of the clinic.
 * @returns The end time as `H:MM`.
 */
export function endTime(appointment: StaffAppointment): string {
  return toTime(toMinutes(appointment.time) + appointment.duration);
}

/**
 * Vet of the clinic by id.
 *
 * @param id Id of the vet.
 * @returns The vet; the first one when the id is unknown.
 */
export function findStaffVet(id: string): StaffVet {
  return STAFF_VETS.find((vet) => vet.id === id) ?? STAFF_VETS[0];
}

/**
 * Start time of an appointment written with AM or PM, as the table shows it.
 *
 * @param time Time as `H:MM` on a 24-hour clock.
 * @returns The time, e.g. "8:00 AM".
 */
export function timeLabel(time: string): string {
  return minutesToLabel(toMinutes(time));
}

/**
 * Appointments of one vet, sorted by start time.
 *
 * @param vetId Id of the vet.
 * @returns The appointments of the vet.
 */
export function appointmentsOfVet(vetId: string): StaffAppointment[] {
  return STAFF_APPOINTMENTS.filter((appointment) => appointment.vetId === vetId).sort((a, b) => toMinutes(a.time) - toMinutes(b.time));
}
