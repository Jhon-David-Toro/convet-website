import { z } from "zod";

import { optionalText } from "./api.contract";

const personName = z.object({ firstName: z.string(), lastName: z.string() });

/**
 * Medical record as `GET /medical-records/pet/:petId` sends it: the record, its veterinarian (with the user's name)
 * and its appointment (with branch and service).
 */
export const medicalRecordSchema = z.object({
  idMedicalRecord: z.string(),
  petId: z.string(),
  observations: optionalText,
  diagnosis: optionalText,
  treatment: optionalText,
  recommendations: optionalText,
  createdAt: z.string(),
  veterinarian: z.object({ user: personName }).optional(),
  appointment: z
    .object({
      startsAt: z.string(),
      completedAt: optionalText,
      branch: z.object({ name: z.string() }).optional(),
      branchService: z.object({ service: z.object({ name: z.string() }) }).optional(),
    })
    .optional(),
});

/** Answer of `GET /medical-records/pet/:petId`: one page plus its metadata. */
export const medicalRecordPageSchema = z.object({
  data: z.array(medicalRecordSchema),
  meta: z.object({ total: z.number(), page: z.number(), limit: z.number(), totalPages: z.number() }),
});

export type MedicalRecordDto = z.infer<typeof medicalRecordSchema>;

/** Records requested for a pet's history; the backend accepts 1 to 100 per page. */
export const MEDICAL_RECORDS_LIMIT = 100;

export const MEDICAL_RECORD_ENDPOINTS = {
  byPet: (petId: string) => `/medical-records/pet/${encodeURIComponent(petId)}`,
} as const;
