import type { CreateAppointmentDto } from "./appointments.contract";

/**
 * Leaves blank notes out and trims the rest: the backend rejects notes made only of spaces.
 *
 * @param dto Body of the booking.
 * @returns The body to send.
 */
export function compactNotes({ notes, ...rest }: CreateAppointmentDto): CreateAppointmentDto {
  const trimmed = notes?.trim();
  return trimmed ? { ...rest, notes: trimmed } : rest;
}
