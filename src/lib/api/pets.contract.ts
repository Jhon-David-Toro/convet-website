import { z } from "zod";

import { optionalText } from "./api.contract";

/**
 * Pet as the backend sends it. ASSUMED from what the UI shows: confirm against the Prisma model / DTOs of
 * `backend-convetaruba` and adjust here; the mappers and the UI only depend on {@link PetDto}.
 */
export const petSchema = z.object({
  idPet: z.string(),
  name: z.string(),
  species: z.string(),
  breed: optionalText,
  color: optionalText,
  sex: optionalText,
  birthDate: optionalText,
  microchip: optionalText,
  weightKg: z.coerce.number().nullish().transform((value) => value ?? undefined),
  allergies: optionalText,
  isActive: z.boolean().optional(),
});

export type PetDto = z.infer<typeof petSchema>;

/**
 * Body of `POST /pets`. The backend runs `ValidationPipe` with `forbidNonWhitelisted`, so only these fields may be sent.
 * ASSUMED: confirm the field names and the enum casing against the backend DTO.
 */
export type CreatePetDto = {
  name: string;
  species: string;
  sex: string;
  breed?: string;
  color?: string;
  birthDate?: string;
};

/** Species and sex values the backend is assumed to accept, keyed by the values of the "Add a pet" form. */
export const SPECIES_TO_DTO: Record<string, string> = { dog: "DOG", cat: "CAT", bird: "BIRD", other: "OTHER" };

export const SEX_TO_DTO: Record<string, string> = { female: "FEMALE", male: "MALE", unknown: "UNKNOWN" };

/** Endpoints used for pets. Change them here if the backend scopes them differently. */
export const PET_ENDPOINTS = {
  list: "/pets",
  create: "/pets",
  detail: (idPet: string) => `/pets/${encodeURIComponent(idPet)}`,
} as const;
