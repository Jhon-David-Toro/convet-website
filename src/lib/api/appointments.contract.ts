import { z } from "zod";

import { decimal, optionalText } from "./api.contract";

export const APPOINTMENT_STATUSES = ["PENDING", "CONFIRMED", "IN_PROGRESS", "COMPLETED", "CANCELLED", "REJECTED", "EXPIRED"] as const;

/** Answer of `GET /appointments/availability`: free 20-minute slots of a vet in a branch on one day. */
export const availabilitySchema = z.object({
  branchId: z.string(),
  veterinarianId: z.string(),
  date: z.string(),
  timeZone: z.string(),
  availableSlots: z.array(z.object({ startsAt: z.string(), localTime: z.string() })),
});

/** Appointment as `POST /appointments` sends it: the bare row, `PENDING` until the clinic confirms it. */
export const appointmentSchema = z.object({
  idAppointment: z.string(),
  customerId: z.string(),
  petId: z.string(),
  branchId: z.string(),
  branchServiceId: z.string(),
  veterinarianId: z.string(),
  startsAt: z.string(),
  endsAt: optionalText,
  status: z.enum(APPOINTMENT_STATUSES),
  priceAtBooking: decimal,
  confirmationExpiresAt: optionalText,
  notes: optionalText,
});

export type AvailabilityDto = z.infer<typeof availabilitySchema>;

export type AppointmentDto = z.infer<typeof appointmentSchema>;

/** Query of `GET /appointments/availability`. `veterinarianId` is the `idStaff` of the vet; `date` is `YYYY-MM-DD`. */
export type AvailabilityQuery = { branchId: string; veterinarianId: string; date: string };

/**
 * Body of `POST /appointments` and `POST /appointments/customer/:customerId`. `branchServiceId` is the service **in the branch**, and
 * `startsAt` must be one of the `availableSlots[].startsAt` values, sent back unchanged (it carries the time zone).
 */
export type CreateAppointmentDto = {
  petId: string;
  branchId: string;
  branchServiceId: string;
  veterinarianId: string;
  startsAt: string;
  notes?: string;
};

export const APPOINTMENT_ENDPOINTS = {
  availability: "/appointments/availability",
  create: "/appointments",
  createForCustomer: (customerId: string) => `/appointments/customer/${encodeURIComponent(customerId)}`,
} as const;
