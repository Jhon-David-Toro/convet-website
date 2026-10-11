import type { CSSProperties } from "react";

import { STAFF_VET_ID } from "@/lib/staff.constants";
import type { StaffAppointment } from "@/lib/staff.types";
import { appointmentsOfVet, endTime, toMinutes, toTime } from "@/lib/staff.utils";

import {
  AGENDA_HEADINGS,
  EARLIER_STATUSES,
  EVENT_GAP,
  GRID_END_MINUTES,
  GRID_START_MINUTES,
  GRID_STEP_MINUTES,
  NOW_MINUTES,
  NOW_STATUSES,
  ROW_HEIGHT,
} from "./StaffToday.constants";
import type { AgendaFilter, AgendaGroup } from "./StaffToday.types";

const PX_PER_MINUTE = ROW_HEIGHT / GRID_STEP_MINUTES;

/**
 * Hours shown on the left of the schedule grid, one per half hour.
 *
 * @returns The times, from the start of the grid to its end.
 */
export function gridTimes(): string[] {
  const count = (GRID_END_MINUTES - GRID_START_MINUTES) / GRID_STEP_MINUTES + 1;
  return Array.from({ length: count }, (_, index) => toTime(GRID_START_MINUTES + index * GRID_STEP_MINUTES));
}

/**
 * Height of the schedule grid.
 *
 * @returns The height in pixels.
 */
export function gridHeight(): number {
  return ((GRID_END_MINUTES - GRID_START_MINUTES) / GRID_STEP_MINUTES + 1) * ROW_HEIGHT;
}

/**
 * Position of an appointment on the grid: it starts where its time is and is as tall as it lasts.
 *
 * @param appointment Appointment to place.
 * @returns The top and height in pixels.
 */
export function eventStyle(appointment: StaffAppointment): CSSProperties {
  const top = (toMinutes(appointment.time) - GRID_START_MINUTES) * PX_PER_MINUTE + EVENT_GAP;
  return { top, height: appointment.duration * PX_PER_MINUTE - EVENT_GAP * 2 };
}

/**
 * Distance from the top of the grid to the line that marks the current time.
 *
 * @returns The distance in pixels.
 */
export function nowOffset(): number {
  return (NOW_MINUTES - GRID_START_MINUTES) * PX_PER_MINUTE;
}

/**
 * Appointments of a vet that start inside the hours the grid shows.
 *
 * @param vetId Id of the vet.
 * @returns The appointments of the column.
 */
export function columnAppointments(vetId: string): StaffAppointment[] {
  return appointmentsOfVet(vetId).filter((appointment) => toMinutes(appointment.time) < GRID_END_MINUTES);
}

/**
 * Title of an appointment on the grid: the patient and the reason.
 *
 * @param appointment Appointment of the clinic.
 * @returns For example "Milo · Vaccination".
 */
export function eventTitle(appointment: StaffAppointment): string {
  return `${appointment.patient} · ${appointment.reason}`;
}

/**
 * Line under the title on the grid: the start time and the owner.
 *
 * @param appointment Appointment of the clinic.
 * @returns For example "8:30 · Jan Kock".
 */
export function eventMeta(appointment: StaffAppointment): string {
  return `${appointment.time} · ${appointment.owner}`;
}

/**
 * Line under the title on the agenda: the time range and the owner.
 *
 * @param appointment Appointment of the clinic.
 * @returns For example "10:00 – 11:00 · Anna Lee".
 */
export function rangeMeta(appointment: StaffAppointment): string {
  return `${appointment.time} – ${endTime(appointment)} · ${appointment.owner}`;
}

/**
 * Appointments the agenda lists: the ones of the signed-in vet, or all of them.
 *
 * @param filter Whether to show only the signed-in vet's patients.
 * @param appointments Appointments of the day.
 * @returns The appointments to list, sorted by time.
 */
export function agendaAppointments(filter: AgendaFilter, appointments: StaffAppointment[]): StaffAppointment[] {
  const own = filter === "mine" ? appointments.filter((appointment) => appointment.vetId === STAFF_VET_ID) : appointments;
  return [...own].sort((a, b) => toMinutes(a.time) - toMinutes(b.time));
}

/**
 * Splits the agenda into what is happening now, what comes next and what already happened, keeping the time order.
 *
 * @param appointments Appointments to split.
 * @returns The non-empty groups, in the order they are shown.
 */
export function agendaGroups(appointments: StaffAppointment[]): AgendaGroup[] {
  const groups: AgendaGroup[] = [
    { heading: AGENDA_HEADINGS.now, tone: "now", appointments: appointments.filter((item) => NOW_STATUSES.includes(item.status)) },
    { heading: AGENDA_HEADINGS.next, tone: "muted", appointments: appointments.filter((item) => !NOW_STATUSES.includes(item.status) && !EARLIER_STATUSES.includes(item.status)) },
    { heading: AGENDA_HEADINGS.earlier, tone: "muted", appointments: appointments.filter((item) => EARLIER_STATUSES.includes(item.status)) },
  ];
  return groups.filter((group) => group.appointments.length > 0);
}
