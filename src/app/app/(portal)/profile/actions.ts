"use server";

import { revalidatePath } from "next/cache";

import { runAction } from "@/lib/api/api.guard";
import type { ActionResult } from "@/lib/api/api.types";
import { getProfile, updateEmail, updateProfile } from "@/lib/api/users.api";
import { requireRole } from "@/lib/auth/auth.access";
import { hasErrors } from "@/lib/auth/validation.utils";
import { validateProfile } from "@/components/sections/ProfileSettings/ProfileSettings.utils";
import type { CustomerProfile } from "@/lib/customer/customer.types";

const PROFILE_HREF = "/app/profile";

/**
 * Saves only what changed: name and phone through `PATCH /users/:id`, the email through `PATCH /users/:id/email`.
 *
 * @param idUser Id of the signed-in user.
 * @param current Profile as it is stored.
 * @param next Profile the customer submitted.
 */
async function saveChanges(idUser: string, current: CustomerProfile, next: CustomerProfile): Promise<void> {
  const email = next.email.trim().toLowerCase();
  const changes = {
    ...(next.firstName.trim() !== current.firstName && { firstName: next.firstName.trim() }),
    ...(next.lastName.trim() !== current.lastName && { lastName: next.lastName.trim() }),
    ...(next.phone.trim() !== current.phone && { mobileNumber: next.phone.trim() }),
  };
  if (Object.keys(changes).length > 0) await updateProfile(idUser, changes);
  if (email !== current.email.toLowerCase()) await updateEmail(idUser, email);
}

/**
 * Server Action of the personal information form. It re-validates on the server and never touches fields that did not change,
 * because the backend rejects an empty profile update.
 *
 * @param profile Profile the customer submitted.
 * @returns Success, or a safe error (`conflict` when the email is taken).
 */
export async function saveProfileAction(profile: CustomerProfile): Promise<ActionResult> {
  const user = await requireRole(["CUSTOMER"]);

  const errors = validateProfile(profile);
  if (hasErrors(errors)) return { ok: false, kind: "validation", message: "Please review the highlighted fields.", fieldErrors: errors };

  const result = await runAction(async () => saveChanges(user.idUser, await getProfile(user.idUser), profile));
  if (!result.ok) return result;
  revalidatePath(PROFILE_HREF);
  return { ok: true, data: undefined };
}
