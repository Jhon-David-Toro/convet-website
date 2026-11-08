import "server-only";

import { apiRequest } from "./api.client";
import { MEDICAL_RECORD_ENDPOINTS, MEDICAL_RECORDS_LIMIT, medicalRecordDetailSchema, medicalRecordPageSchema, updatedMedicalRecordSchema } from "./medical-records.contract";
import type { MedicalRecordDetailDto, MedicalRecordDto, UpdateMedicalRecordDto } from "./medical-records.contract";
import { nonBlankTexts, toPetEvents } from "./medical-records.mappers";
import type { PetEvent } from "@/lib/customer/customer.types";
import type { StaffPatient, StaffPatientRecord } from "@/lib/staff/staff.types";

import { ApiError } from "./api.errors";
import { getPetForStaff } from "./pets.api";
import { toStaffPatient, toStaffTimeline, toVisitSummary } from "./staff-records.mappers";

/**
 * History of a pet built from its medical records, newest first.
 *
 * @param petId Id of the pet; the backend only answers for the owner's pets.
 * @returns The timeline events of the pet.
 * @throws {ApiError} When the backend fails or the pet is not the customer's.
 */
export async function getPetHistory(petId: string): Promise<PetEvent[]> {
  const page = await apiRequest(MEDICAL_RECORD_ENDPOINTS.byPet(petId), { query: { limit: MEDICAL_RECORDS_LIMIT }, schema: medicalRecordPageSchema });
  return page.data.flatMap(toPetEvents);
}

/**
 * Medical records of a pet, one page at a time, for the clinic (a vet sees only their own records; an admin sees every record).
 *
 * @param petId Id of the pet.
 * @param page Page number, from 1.
 * @returns The records and the page metadata.
 * @throws {ApiError} `forbidden` for staff who are not active vets.
 */
export async function getPetMedicalRecords(petId: string, page = 1) {
  return apiRequest(MEDICAL_RECORD_ENDPOINTS.byPet(petId), { query: { page, limit: MEDICAL_RECORDS_LIMIT }, schema: medicalRecordPageSchema });
}

/**
 * One medical record (its pet's owner, its vet or an admin).
 *
 * @param idMedicalRecord Id of the record.
 * @returns The record with its pet, vet and appointment.
 * @throws {ApiError} `forbidden` for anyone else; `not-found` when it does not exist.
 */
export async function getMedicalRecord(idMedicalRecord: string): Promise<MedicalRecordDetailDto> {
  return apiRequest(MEDICAL_RECORD_ENDPOINTS.detail(idMedicalRecord), { schema: medicalRecordDetailSchema });
}

/**
 * Changes the clinical texts of a record (its vet or an admin). Empty texts are left out: the backend cannot clear a field.
 *
 * @param idMedicalRecord Id of the record.
 * @param dto Texts to replace.
 * @returns The updated record.
 * @throws {ApiError} `validation` when nothing is left to change; `forbidden` for customers and other staff.
 */
export async function updateMedicalRecord(idMedicalRecord: string, dto: UpdateMedicalRecordDto) {
  return apiRequest(MEDICAL_RECORD_ENDPOINTS.detail(idMedicalRecord), { method: "PATCH", body: nonBlankTexts(dto), schema: updatedMedicalRecordSchema });
}


/**
 * Medical records of a pet for the patient record, or the safe error when the user may not read them (staff who are not vets).
 *
 * @param petId Id of the pet.
 * @returns The records, or the error to show.
 * @throws {ApiError} When the session expired.
 */
async function recordsOrError(petId: string): Promise<{ records: MedicalRecordDto[] } | { error: ApiError }> {
  try {
    return { records: (await getPetMedicalRecords(petId)).data };
  } catch (error) {
    if (error instanceof ApiError && error.kind !== "unauthorized") return { error };
    throw error;
  }
}

/**
 * Patient record of a pet for the clinic: the pet and, when the user may read them, its medical records.
 *
 * @param petId Id of the pet.
 * @returns The patient and its record, or `undefined` when the pet does not exist. When the records cannot be read, the record
 * carries the safe error instead.
 * @throws {ApiError} When the pet itself cannot be loaded.
 */
export async function getStaffPatientRecord(petId: string): Promise<{ patient: StaffPatient; record: StaffPatientRecord } | undefined> {
  const [pet, records] = await Promise.all([getPetForStaff(petId), recordsOrError(petId)]);
  if (!pet) return undefined;
  const patient = toStaffPatient(pet);
  if ("error" in records) return { patient, record: { timeline: [], recordsError: records.error.message } };
  const [latest] = records.records;
  return { patient, record: { lastVisit: latest && toVisitSummary(latest), timeline: toStaffTimeline(records.records) } };
}
