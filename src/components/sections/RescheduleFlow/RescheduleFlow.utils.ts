import type { BookingSummaryProps } from "@/components/patterns/BookingSummary";
import { bookingSummary } from "@/components/sections/BookingFlow/BookingFlow.utils";
import { shortDay } from "@/lib/booking/booking.utils";
import type { CustomerAppointment } from "@/lib/customer/customer.types";

import { SUMMARY_EYEBROW } from "./RescheduleFlow.constants";

/**
 * Card shown next to the reschedule: the visit with the new day and time.
 *
 * @param appointment Appointment being moved.
 * @param date New day as `YYYY-MM-DD`, or an empty string.
 * @param time New time, or an empty string.
 * @returns The props of the booking summary.
 */
export function rescheduleSummary(appointment: CustomerAppointment, date: string, time: string): Pick<BookingSummaryProps, "eyebrow" | "date" | "time" | "service" | "pet" | "vet" | "location"> {
  const summary = bookingSummary({ petId: appointment.pet.toLowerCase(), serviceId: appointment.serviceId, vetId: appointment.vetId, date, time, notes: "", whatsapp: true });
  return { ...summary, eyebrow: SUMMARY_EYEBROW };
}

/**
 * Day and time in one line, e.g. "Fri, Oct 9 · 9:30 AM".
 *
 * @param date Day as `YYYY-MM-DD`.
 * @param time Time such as "9:30 AM".
 * @returns The day and time.
 */
export function whenText(date: string, time: string): string {
  return `${shortDay(date)} · ${time}`;
}
