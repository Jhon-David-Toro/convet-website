import "server-only";

import { cache } from "react";

import type { NewPetValues } from "@/components/sections/MyPets/MyPets.types";
import type { PetItem } from "@/lib/customer/customer.types";

import { apiRequest } from "./api.client";
import { collection } from "./api.contract";
import { ApiError } from "./api.errors";
import { PET_ENDPOINTS, deactivatedPetSchema, petSchema } from "./pets.contract";
import type { PetDto, UpdatePetDto } from "./pets.contract";
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

/**
 * Changes a pet of the signed-in customer.
 *
 * @param idPet Id of the pet.
 * @param dto Fields to change, at least one.
 * @returns The updated pet.
 * @throws {ApiError} `not-found` when the pet is not the customer's or is inactive.
 */
export async function updatePet(idPet: string, dto: UpdatePetDto): Promise<PetItem> {
  return toPetItem(await apiRequest(PET_ENDPOINTS.detail(idPet), { method: "PATCH", body: dto, schema: petSchema }));
}

/**
 * Archives a pet of the signed-in customer; it no longer shows in their pets.
 *
 * @param idPet Id of the pet.
 * @throws {ApiError} `not-found` when the pet is not the customer's or is already archived.
 */
export async function deactivatePet(idPet: string): Promise<void> {
  await apiRequest(PET_ENDPOINTS.deactivate(idPet), { method: "PATCH", schema: deactivatedPetSchema });
}

/**
 * Pets of any owner, archived ones included, for the clinic (staff and admin).
 *
 * @param ownerId Id of the owner user.
 * @returns The pets as the backend sends them, newest first.
 * @throws {ApiError} `forbidden` for customers; `not-found` for an unknown owner.
 */
export async function getOwnerPets(ownerId: string): Promise<PetDto[]> {
  return apiRequest(PET_ENDPOINTS.ofOwner(ownerId), { schema: collection(petSchema) });
}

/**
 * Registers a pet for an owner at the front desk (staff and admin).
 *
 * @param ownerId Id of the owner user.
 * @param values Values of the pet form.
 * @returns The pet that was created.
 */
export async function createPetForOwner(ownerId: string, values: NewPetValues): Promise<PetDto> {
  return apiRequest(PET_ENDPOINTS.ofOwner(ownerId), { method: "POST", body: toCreatePetDto(values), schema: petSchema });
}

/**
 * Any pet, archived or not, for the clinic (staff and admin). Cached for the length of a request.
 *
 * @param idPet Id of the pet.
 * @returns The pet, or `undefined` when it does not exist.
 * @throws {ApiError} For failures other than 404.
 */
export const getPetForStaff = cache(async (idPet: string): Promise<PetDto | undefined> => {
  try {
    return await apiRequest(PET_ENDPOINTS.forStaff(idPet), { schema: petSchema });
  } catch (error) {
    if (error instanceof ApiError && error.kind === "not-found") return undefined;
    throw error;
  }
});
