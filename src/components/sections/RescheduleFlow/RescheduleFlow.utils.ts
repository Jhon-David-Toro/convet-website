import type { BookingSummaryProps } from "@/components/patterns/BookingSummary";
import { bookingSummary } from "@/components/sections/BookingFlow/BookingFlow.utils";
import { shortDay } from "@/lib/booking/booking.utils";
import type { CustomerAppointment } from "@/lib/customer/customer.types";

import { SUMMARY_EYEBROW } from "./RescheduleFlow.constants";

type RescheduleSummary = Pick<
  BookingSummaryProps,
  "eyebrow" | "date" | "time" | "service" | "pet" | "vet" | "location"
>;

/**
 * Builds the summary displayed during appointment rescheduling.
 *
 * @param appointment Appointment being rescheduled.
 * @param date New appointment date.
 * @param time New appointment time.
 * @returns Booking summary with the updated date and time.
 */
export function rescheduleSummary(
  appointment: CustomerAppointment,
  date: string,
  time: string,
): RescheduleSummary {
  const summary = bookingSummary(
    {
      petId: "",
      serviceId: appointment.serviceId,
      vetId: appointment.vetId,
      date,
      time,
      notes: "",
      whatsapp: true,
    },
    [],
  );

  return {
    ...summary,
    eyebrow: SUMMARY_EYEBROW,
    pet: {
      title: appointment.pet || "Pet",
      detail: "Registered pet",
    },
  };
}

/**
 * Formats the selected date and time into a single line.
 *
 * @param date Appointment date in YYYY-MM-DD format.
 * @param time Appointment time.
 * @returns Formatted date and time.
 */
export function whenText(date: string, time: string): string {
  return `${shortDay(date)} · ${time}`;
}