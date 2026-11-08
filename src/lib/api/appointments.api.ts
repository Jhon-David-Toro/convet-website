import "server-only";

import { apiRequest } from "./api.client";
import { APPOINTMENT_ENDPOINTS, appointmentSchema, availabilitySchema } from "./appointments.contract";
import type { AppointmentDto, AvailabilityDto, AvailabilityQuery, CreateAppointmentDto } from "./appointments.contract";
import { compactNotes } from "./appointments.mappers";

/**
 * Free times of a vet in a branch on one day. Any signed-in user can ask.
 *
 * @param query Branch, vet (`idStaff`) and day (`YYYY-MM-DD`).
 * @returns The slots, with their start in UTC and the local time to show.
 * @throws {ApiError} `not-found` when the branch or the vet is inactive, or the vet does not work there that day.
 */
export async function getAvailability(query: AvailabilityQuery): Promise<AvailabilityDto> {
  return apiRequest(APPOINTMENT_ENDPOINTS.availability, { query, schema: availabilitySchema });
}

/**
 * Asks for an appointment as the signed-in customer. It stays `PENDING` until the clinic confirms it.
 *
 * @param dto Pet, branch, service of the branch, vet, slot and notes.
 * @returns The appointment request.
 * @throws {ApiError} `validation` when the slot was taken meanwhile or the service has no price; `not-found` for inactive data.
 */
export async function createAppointment(dto: CreateAppointmentDto): Promise<AppointmentDto> {
  return apiRequest(APPOINTMENT_ENDPOINTS.create, { method: "POST", body: compactNotes(dto), schema: appointmentSchema });
}

/**
 * Books an appointment for a customer (staff and admin).
 *
 * @param customerId Id of the customer user.
 * @param dto Pet, branch, service of the branch, vet, slot and notes.
 * @returns The appointment request.
 * @throws {ApiError} `not-found` when the user is not a customer.
 */
export async function createAppointmentForCustomer(customerId: string, dto: CreateAppointmentDto): Promise<AppointmentDto> {
  return apiRequest(APPOINTMENT_ENDPOINTS.createForCustomer(customerId), { method: "POST", body: compactNotes(dto), schema: appointmentSchema });
}
