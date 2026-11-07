import { z } from "zod";

import { optionalText } from "./api.contract";

/** Pet as `backend-convetaruba` sends it (`Pet` model of `prisma/schema.prisma`; extra columns are stripped). */
export const petSchema = z.object({
  idPet: z.string(),
  name: z.string(),
  species: z.enum(["DOG", "CAT", "BIRD", "RABBIT", "OTHER"]),
  breed: optionalText,
  color: optionalText,
  sex: z.enum(["MALE", "FEMALE", "UNKNOWN"]).optional(),
  dateOfBirth: optionalText,
  isActive: z.boolean().optional(),
});

export type PetDto = z.infer<typeof petSchema>;

/** Body of `POST /pets` (`CreatePetDto`). The backend uses `forbidNonWhitelisted`, so only these fields may be sent. */
export type CreatePetDto = {
  name: string;
  species: PetDto["species"];
  sex: NonNullable<PetDto["sex"]>;
  breed?: string;
  color?: string;
  /** ISO 8601 date. */
  dateOfBirth?: string;
};

/** Backend enum values for the values of the "Add a pet" form. */
export const SPECIES_TO_DTO: Record<string, PetDto["species"]> = { dog: "DOG", cat: "CAT", bird: "BIRD", rabbit: "RABBIT", other: "OTHER" };

export const SEX_TO_DTO: Record<string, NonNullable<PetDto["sex"]>> = { female: "FEMALE", male: "MALE", unknown: "UNKNOWN" };

/** Endpoints used for pets. Change them here if the backend scopes them differently. */
export const PET_ENDPOINTS = {
  list: "/pets",
  create: "/pets",
  detail: (idPet: string) => `/pets/${encodeURIComponent(idPet)}`,
} as const;
