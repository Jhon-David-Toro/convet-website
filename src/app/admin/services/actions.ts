"use server";

import { revalidatePath, updateTag } from "next/cache";

import type { ServiceRulesChange } from "@/components/sections/AdminServices/AdminServices.types";
import type { ServiceValues } from "@/components/sections/ServiceModal/ServiceModal.types";
import { NAME_TAKEN_ERROR } from "@/components/sections/ServiceModal/ServiceModal.constants";
import { validateService } from "@/components/sections/ServiceModal/ServiceModal.utils";
import { runAction } from "@/lib/api/api.guard";
import type { ActionResult } from "@/lib/api/api.types";
import { setBranchServiceActive, setBranchServicePrice } from "@/lib/api/branches.api";
import { createService } from "@/lib/api/catalog.api";
import { CATALOG_TAGS } from "@/lib/api/catalog.contract";
import { slugFrom } from "@/lib/api/catalog.mappers";
import { requireRole } from "@/lib/auth/auth.access";
import type { FormModalSaveResult } from "@/lib/shared/useFormModal.types";

const SERVICES_PATH = "/admin/services";

/**
 * Saves the booking rules the backend stores for a service of a branch: whether it can be booked and its price.
 *
 * @param branchId Id of the branch.
 * @param idBranchService Id of the service in the branch.
 * @param change What changed.
 * @returns Success, or a safe error.
 */
export async function saveServiceRulesAction(branchId: string, idBranchService: string, change: ServiceRulesChange): Promise<ActionResult> {
  await requireRole(["ADMIN"]);
  const result = await runAction(async () => {
    if (change.online !== undefined) await setBranchServiceActive(branchId, idBranchService, change.online);
    if (change.amount !== undefined) await setBranchServicePrice(branchId, idBranchService, change.amount);
  });
  if (result.ok) revalidatePath(SERVICES_PATH);
  return result;
}

/**
 * Creates a service of the catalog from the "New service" dialog. The backend creates it unpublished.
 *
 * @param values Values of the dialog; the category is the backend id.
 * @returns Success, or the safe error with the field errors.
 */
export async function createServiceAction(values: ServiceValues): Promise<FormModalSaveResult<ServiceValues>> {
  await requireRole(["ADMIN"]);
  const errors = validateService(values, false);
  if (Object.keys(errors).length > 0) return { ok: false, message: "Some of the information is not valid. Please review it and try again.", fieldErrors: errors };

  const result = await runAction(() => createService({ name: values.name.trim(), slug: slugFrom(values.name), categoryId: values.category }));
  if (!result.ok && result.kind === "conflict") return { ok: false, message: NAME_TAKEN_ERROR, fieldErrors: { name: NAME_TAKEN_ERROR } };
  if (!result.ok) return { ok: false, message: result.message, fieldErrors: { name: result.fieldErrors?.name ?? result.fieldErrors?.slug, category: result.fieldErrors?.categoryId } };
  updateTag(CATALOG_TAGS.services);
  revalidatePath(SERVICES_PATH);
  return { ok: true };
}
