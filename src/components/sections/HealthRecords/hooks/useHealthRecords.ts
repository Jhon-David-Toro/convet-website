import { useState } from "react";

import { CUSTOMER_PETS } from "@/lib/customer/customer.constants";
import { HEALTH_RECORDS } from "@/lib/customer/customer.records.constants";

import { DEFAULT_PET_ID } from "../HealthRecords.constants";
import type { HealthRecordsState } from "../HealthRecords.types";

/**
 * Pet whose records are on screen, with its pet and its health record.
 *
 * @returns The pet, its record and the function that switches to another pet.
 */
export function useHealthRecords(): HealthRecordsState {
  const [petId, setPetId] = useState(DEFAULT_PET_ID);
  const pet = CUSTOMER_PETS.find((candidate) => candidate.id === petId) ?? CUSTOMER_PETS[0];
  const record = HEALTH_RECORDS.find((candidate) => candidate.petId === pet.id) ?? HEALTH_RECORDS[0];

  return { pet, record, selectPet: setPetId };
}
