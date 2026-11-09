"use server";

import { revalidatePath } from "next/cache";

import { runAction } from "@/lib/api/api.guard";
import { setBranchActive, updateBranch } from "@/lib/api/branches.api";
import type { ActionResult } from "@/lib/api/api.types";
import { requireRole } from "@/lib/auth/auth.access";

const LOCATIONS_PATH = "/admin/locations";

/**
 * Opens or closes a branch.
 *
 * @param idBranch Id of the branch.
 * @param isActive Whether the branch takes appointments.
 * @returns Success, or a safe error.
 */
export async function setBranchActiveAction(idBranch: string, isActive: boolean): Promise<ActionResult> {
  await requireRole(["ADMIN"]);
  const result = await runAction(async () => {
    await setBranchActive(idBranch, isActive);
  });
  if (result.ok) revalidatePath(LOCATIONS_PATH);
  return result;
}

/**
 * Saves the phone the clinic shows for a branch.
 *
 * @param idBranch Id of the branch.
 * @param phone New phone number.
 * @returns Success, or a safe error.
 */
export async function saveBranchPhoneAction(idBranch: string, phone: string): Promise<ActionResult> {
  await requireRole(["ADMIN"]);
  const result = await runAction(async () => {
    await updateBranch(idBranch, { phone: phone.trim() });
  });
  if (result.ok) revalidatePath(LOCATIONS_PATH);
  return result;
}
