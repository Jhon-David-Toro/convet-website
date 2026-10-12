import { parseDate } from "@/components/ui/MaskedInput";
import type { BookingSlot } from "@/lib/booking/booking.types";
import { findVet, shortDay, slotsFor } from "@/lib/booking/booking.utils";
import type { FormErrors } from "@/lib/shared/useFormModal.types";

import { DATE_ERROR, PATIENT_ERROR, SUBMIT_LABEL, TIME_ERROR } from "./AppointmentModal.constants";
import type { AppointmentValues } from "./AppointmentModal.types";

/**
 * ISO date (`YYYY-MM-DD`) of a typed date.
 *
 * @param value Date typed as "10 / 13 / 2026".
 * @returns The ISO date; empty while the date is not valid.
 */
export function toIso(value: string): string {
  const date = parseDate(value);
  if (!date) return "";
  const pad = (part: number) => String(part).padStart(2, "0");
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
}

/**
 * Times a vet offers on a typed date.
 *
 * @param vetId Id of the vet.
 * @param value Date typed as "10 / 13 / 2026".
 * @returns The slots; empty when the date is not valid or the vet does not work that day.
 */
export function slotsOn(vetId: string, value: string): BookingSlot[] {
  const iso = toIso(value);
  return iso ? slotsFor(findVet(vetId), iso) : [];
}

/**
 * Validates the appointment: a patient, a real date and a time.
 *
 * @param values Values of the form.
 * @returns The message of every invalid field; empty when the appointment can be booked.
 */
export function validateAppointment(values: AppointmentValues): FormErrors<AppointmentValues> {
  const messages = {
    patient: values.patient.trim() ? undefined : PATIENT_ERROR,
    date: toIso(values.date) ? undefined : DATE_ERROR,
    time: values.time ? undefined : TIME_ERROR,
  };
  return Object.fromEntries(Object.entries(messages).filter(([, message]) => message));
}

/**
 * Label of the submit button, with the chosen day and time once there is one.
 *
 * @param values Values of the form.
 * @returns For example "Book Tue, Oct 13 · 10:20 AM"; "Book" while no time is picked.
 */
export function submitLabel(values: AppointmentValues): string {
  const iso = toIso(values.date);
  return iso && values.time ? `${SUBMIT_LABEL} ${shortDay(iso)} · ${values.time}` : SUBMIT_LABEL;
}

/**
 * Title of the error banner: how many fields have to be fixed.
 *
 * @param count Number of invalid fields.
 * @returns For example "Fix 2 fields to book the appointment".
 */
export function errorTitle(count: number): string {
  return `Fix ${count} ${count === 1 ? "field" : "fields"} to book the appointment`;
}
