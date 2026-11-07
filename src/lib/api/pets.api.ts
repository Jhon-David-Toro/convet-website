import "server-only";

import { cache } from "react";

import type { NewPetValues } from "@/components/sections/MyPets/MyPets.types";
import type { PetItem } from "@/lib/customer/customer.types";

import { apiRequest } from "./api.client";
import { collection } from "./api.contract";
import { ApiError } from "./api.errors";
import { PET_ENDPOINTS, petSchema } from "./pets.contract";
import { toCreatePetDto, toPetItem } from "./pets.mappers";

/**
 * Pets of the signed-in customer. Cached for the length of a request, so layouts and pages can both ask for it.
 *
 * @returns The pets, oldest first as the backend sends them.
 * @throws {ApiError} When the backend fails or answers something unexpected.
 */
export const getMyPets = cache(async (): Promise<PetItem[]> => {
  const pets = await apiRequest(PET_ENDPOINTS.list, { schema: collection(petSchema) });
  return pets.filter((pet) => pet.isActive !== false).map((pet) => toPetItem(pet));
});

/**
 * One pet of the signed-in customer.
 *
 * @param idPet Id of the pet.
 * @returns The pet, or `undefined` when the backend does not have it or the customer cannot see it.
 * @throws {ApiError} For failures other than 403/404.
 */
export const getPet = cache(async (idPet: string): Promise<PetItem | undefined> => {
  try {
    return toPetItem(await apiRequest(PET_ENDPOINTS.detail(idPet), { schema: petSchema }));
  } catch (error) {
    if (error instanceof ApiError && (error.kind === "not-found" || error.kind === "forbidden")) return undefined;
    throw error;
  }
});

/**
 * Registers a pet for the signed-in customer.
 *
 * @param values Values of the "Add a pet" form.
 * @returns The pet that was created.
 * @throws {ApiError} When the backend rejects the data or fails.
 */
export async function createPet(values: NewPetValues): Promise<PetItem> {
  return toPetItem(await apiRequest(PET_ENDPOINTS.create, { method: "POST", body: toCreatePetDto(values), schema: petSchema }));
}
