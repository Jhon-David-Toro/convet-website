"use server";

import { revalidatePath } from "next/cache";

import type { VisitValues } from "@/components/sections/VisitRecord/VisitRecord.types";
import { runAction } from "@/lib/api/api.guard";
import type { ActionResult } from "@/lib/api/api.types";
import { updateMedicalRecord } from "@/lib/api/medical-records.api";
import { toMedicalRecordUpdate } from "@/lib/api/staff-records.mappers";
import { requireRole } from "@/lib/auth/auth.access";
import { STAFF_VISITS_HREF } from "@/lib/staff/staff.paths.constants";

/**
 * Saves the clinical texts of a visit in its medical record. Only the record's vet or an admin may do it; the backend checks.
 *
 * @param idMedicalRecord Id of the record.
 * @param values Values of the visit form.
 * @returns Success, or a safe error.
 */
export async function saveVisitAction(idMedicalRecord: string, values: VisitValues): Promise<ActionResult> {
  await requireRole(["STAFF", "ADMIN"]);
  const result = await runAction(async () => {
    await updateMedicalRecord(idMedicalRecord, toMedicalRecordUpdate(values));
  });
  if (result.ok) revalidatePath(`${STAFF_VISITS_HREF}/${idMedicalRecord}`);
  return result;
}
