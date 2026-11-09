"use server";

import { revalidatePath } from "next/cache";

import { runAction } from "@/lib/api/api.guard";
import type { ActionResult } from "@/lib/api/api.types";
import { setStaffMemberActive } from "@/lib/api/staff.api";
import { requireRole } from "@/lib/auth/auth.access";

/**
 * Activates or deactivates a staff member.
 *
 * @param idStaff Id of the staff record.
 * @param isActive Whether the member works at the clinic.
 * @returns Success, or a safe error.
 */
export async function setStaffActiveAction(idStaff: string, isActive: boolean): Promise<ActionResult> {
  await requireRole(["ADMIN"]);
  const result = await runAction(async () => {
    await setStaffMemberActive(idStaff, isActive);
  });
  if (result.ok) revalidatePath("/admin/team");
  return result;
}
