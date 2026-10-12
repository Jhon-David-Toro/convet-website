import { parseDate } from "@/components/ui/MaskedInput";
import type { FormErrors } from "@/lib/shared/useFormModal.types";

import { AFFECTED, FROM_ERROR, ORDER_ERROR, TO_ERROR } from "./TimeOffModal.constants";
import type { AffectedAppointment, TimeOffValues } from "./TimeOffModal.types";

/**
 * Validates the time off: both days must be real dates and the last one cannot be before the first.
 *
 * @param values Values of the form.
 * @returns The message of every invalid field; empty when the time off can be saved.
 */
export function validateTimeOff(values: TimeOffValues): FormErrors<TimeOffValues> {
  const from = parseDate(values.from);
  const to = parseDate(values.to);
  const messages = {
    from: from ? undefined : FROM_ERROR,
    to: to ? (from && to < from ? ORDER_ERROR : undefined) : TO_ERROR,
  };
  return Object.fromEntries(Object.entries(messages).filter(([, message]) => message));
}

/**
 * Appointments of a team member that fall in the time off and would have to be rescheduled.
 *
 * @param member Id of the team member.
 * @returns The appointments; none when the person has nothing booked.
 */
export function affectedAppointments(member: string): AffectedAppointment[] {
  return AFFECTED[member] ?? [];
}

/**
 * Title of the warning about the appointments the time off affects.
 *
 * @param count Number of appointments.
 * @returns For example "Affects 3 appointments".
 */
export function affectedTitle(count: number): string {
  return `Affects ${count} ${count === 1 ? "appointment" : "appointments"}`;
}

/**
 * Title of the error banner: how many fields have to be fixed.
 *
 * @param count Number of invalid fields.
 * @returns For example "Fix 2 fields to save the time off".
 */
export function errorTitle(count: number): string {
  return `Fix ${count} ${count === 1 ? "field" : "fields"} to save the time off`;
}
