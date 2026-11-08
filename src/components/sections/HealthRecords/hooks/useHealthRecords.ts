import { useState } from "react";

import type { PetHealthRecord, PetItem } from "@/lib/customer/customer.types";

import type { HealthRecordsState } from "../HealthRecords.types";

/**
 * Pet whose health record is shown, and that record.
 *
 * @param pets Pets of the customer.
 * @param records One health record per pet.
 * @param initialPetId Pet shown first; by default the first one.
 * @returns The selected pet, its record and the function that picks another pet.
 */
export function useHealthRecords(pets: PetItem[], records: PetHealthRecord[], initialPetId?: string): HealthRecordsState {
  const [petId, setPetId] = useState(initialPetId ?? pets[0]?.id);
  const pet = pets.find((candidate) => candidate.id === petId) ?? pets[0];
  const record = records.find((candidate) => candidate.petId === pet?.id) ?? records[0];

  return { pet, record, selectPet: setPetId };
}
