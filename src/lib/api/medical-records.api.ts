import "server-only";

import { apiRequest } from "./api.client";
import * as MedicalRecordContract from "./medical-records.contract";
import * as MedicalRecordMappers from "./medical-records.mappers";
import type { PetEvent, PetHealthRecord, PetItem } from "@/lib/customer/customer.types";
import type { StaffPatient, StaffPatientRecord } from "@/lib/staff/staff.types";

import { ApiError } from "./api.errors";
import { getMyPets, getPetForStaff } from "./pets.api";
import * as StaffRecordMappers from "./staff-records.mappers";

/**
 * History of a pet built from its medical records, newest first.
 *
 * @param petId Id of the pet; the backend only answers for the owner's pets.
 * @returns The timeline events of the pet.
 * @throws {ApiError} When the backend fails or the pet is not the customer's.
 */
export async function getPetHistory(petId: string): Promise<PetEvent[]> {
  const records = await getAllPetMedicalRecords(petId);
  return records.flatMap(MedicalRecordMappers.toPetEvents);
}

export async function getPetMedicalRecords(petId: string, page = 1) {
  return apiRequest(MedicalRecordContract.MEDICAL_RECORD_ENDPOINTS.byPet(petId), {
    query: { page, limit: MedicalRecordContract.MEDICAL_RECORDS_LIMIT },
    schema: MedicalRecordContract.medicalRecordPageSchema,
  });
}

export async function getAllPetMedicalRecords(petId: string): Promise<MedicalRecordContract.MedicalRecordDto[]> {
  const first = await getPetMedicalRecords(petId);
  const records = [...first.data];

  for (let page = 2; page <= first.meta.totalPages; page++) {
    const next = await getPetMedicalRecords(petId, page);
    records.push(...next.data);
  }

  return records;
}

/**
 * One medical record (its pet's owner, its vet or an admin).
 *
 * @param idMedicalRecord Id of the record.
 * @returns The record with its pet, vet and appointment.
 * @throws {ApiError} `forbidden` for anyone else; `not-found` when it does not exist.
 */
export async function getMedicalRecord(idMedicalRecord: string): Promise<MedicalRecordContract.MedicalRecordDetailDto> {
  return apiRequest(MedicalRecordContract.MEDICAL_RECORD_ENDPOINTS.detail(idMedicalRecord), {
    schema: MedicalRecordContract.medicalRecordDetailSchema,
  });
}

export async function updateMedicalRecord(
  idMedicalRecord: string,
  dto: MedicalRecordContract.UpdateMedicalRecordDto,
) {
  return apiRequest(MedicalRecordContract.MEDICAL_RECORD_ENDPOINTS.detail(idMedicalRecord), {
    method: "PATCH",
    body: MedicalRecordMappers.nonBlankTexts(dto),
    schema: MedicalRecordContract.updatedMedicalRecordSchema,
  });
}


async function recordsOrError(
  petId: string,
): Promise<{ records: MedicalRecordContract.MedicalRecordDto[] } | { error: ApiError }> {
  try {
    return { records: (await getPetMedicalRecords(petId)).data };
  } catch (error) {
    if (error instanceof ApiError && error.kind !== "unauthorized") return { error };
    throw error;
  }
}

function createEmptyRecord(error: ApiError): StaffPatientRecord {
  return { timeline: [], recordsError: error.message };
}

function createRecord(records: MedicalRecordContract.MedicalRecordDto[]): StaffPatientRecord {
  const [latest] = records;
  return {
    lastVisit: latest ? StaffRecordMappers.toVisitSummary(latest) : undefined,
    timeline: StaffRecordMappers.toStaffTimeline(records),
  };
}

export async function getStaffPatientRecord(
  petId: string,
): Promise<{ patient: StaffPatient; record: StaffPatientRecord } | undefined> {
  const [pet, records] = await Promise.all([getPetForStaff(petId), recordsOrError(petId)]);

  if (!pet) return undefined;

  const patient = StaffRecordMappers.toStaffPatient(pet);
  const record = "error" in records ? createEmptyRecord(records.error) : createRecord(records.records);

  return { patient, record };
}

export async function getCustomerHealthRecords(): Promise<{ pets: PetItem[]; records: PetHealthRecord[] }> {
  const pets = await getMyPets();
  const medicalRecords = await Promise.all(pets.map((pet) => getAllPetMedicalRecords(pet.id)));

  const records = pets.map((pet, index) => MedicalRecordMappers.toHealthRecord(pet, medicalRecords[index]));

  return { pets, records };
}
