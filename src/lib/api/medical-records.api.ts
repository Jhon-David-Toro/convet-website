import "server-only";

import { apiRequest } from "./api.client";
import { MEDICAL_RECORD_ENDPOINTS, MEDICAL_RECORDS_LIMIT, medicalRecordPageSchema } from "./medical-records.contract";
import { toPetEvents } from "./medical-records.mappers";
import type { PetEvent } from "@/lib/customer/customer.types";

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
