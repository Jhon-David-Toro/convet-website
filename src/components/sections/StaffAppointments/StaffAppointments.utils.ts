import { STAFF_APPOINTMENTS } from "@/lib/staff/staff.constants";
import type { StaffAppointment } from "@/lib/staff/staff.types";

import { ALL_VALUE, PAGE_SIZE, RANGE_HAS_DATA, TABLE_ORDER } from "./StaffAppointments.constants";
import type { AppointmentFilters } from "./StaffAppointments.types";

/**
 * Tells whether an appointment matches what was typed in the search: pet or owner.
 *
 * @param appointment Appointment to check.
 * @param query Text typed by the user.
 * @returns `true` when the query is empty or found in the pet or the owner.
 */
function matchesQuery(appointment: StaffAppointment, query: string): boolean {
  const text = query.trim().toLowerCase();
  return !text || `${appointment.patient} ${appointment.owner}`.toLowerCase().includes(text);
}

/**
 * Appointments of the table in the order the clinic reads them: open ones first, then the finished ones.
 *
 * @returns The appointments of the day, sorted.
 */
export function sortedAppointments(): StaffAppointment[] {
  return [...STAFF_APPOINTMENTS].sort((a, b) => TABLE_ORDER.indexOf(a.id) - TABLE_ORDER.indexOf(b.id));
}

/**
 * Appointments that pass the filters of the table.
 *
 * @param filters Filters chosen by the user.
 * @returns The matching appointments, sorted.
 */
export function filterAppointments(filters: AppointmentFilters): StaffAppointment[] {
  if (!RANGE_HAS_DATA[filters.range]) return [];
  return sortedAppointments().filter(
    (appointment) =>
      matchesQuery(appointment, filters.query) &&
      (filters.vet === ALL_VALUE || appointment.vetId === filters.vet) &&
      (filters.status === ALL_VALUE || appointment.status === filters.status),
  );
}

/**
 * Number of pages needed for a number of rows.
 *
 * @param total Number of rows.
 * @returns The number of pages, at least one.
 */
export function pageCountFor(total: number): number {
  return Math.max(1, Math.ceil(total / PAGE_SIZE));
}

/**
 * Rows of one page.
 *
 * @param rows All the rows.
 * @param page Page number, starting at 1.
 * @returns The rows of the page.
 */
export function pageRows(rows: StaffAppointment[], page: number): StaffAppointment[] {
  return rows.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
}
