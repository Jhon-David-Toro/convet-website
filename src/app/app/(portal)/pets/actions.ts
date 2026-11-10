"use server";

import { revalidatePath } from "next/cache";

import { hasErrors } from "@/lib/auth/validation.utils";
import { runAction } from "@/lib/api/api.guard";
import { ApiError } from "@/lib/api/api.errors";
import { createPet, deactivatePet, updatePet } from "@/lib/api/pets.api";
import { toUpdatePetDto } from "@/lib/api/pets.mappers";
import { requireRole } from "@/lib/auth/auth.access";
import { validateNewPet } from "@/components/sections/MyPets/MyPets.utils";
import type { NewPetValues } from "@/components/sections/MyPets/MyPets.types";
import type { ActionResult } from "@/lib/api/api.types";
import { CUSTOMER_PETS_HREF } from "@/lib/customer/customer.paths.constants";
import type { PetItem } from "@/lib/customer/customer.types";

/**
 * Server Action of the "Add a pet" form. It checks the session and the data again on the server (the client check is only a convenience)
 * before calling the backend, and refreshes the pet pages afterwards.
 *
 * @param values Values of the form.
 * @returns The created pet, or a safe error with the field errors the backend reported.
 */
export async function addPetAction(
    values: NewPetValues,
  ): Promise<ActionResult<PetItem>> {
    await requireRole(["CUSTOMER"]);

    const errors = validateNewPet(values, new Date());

    if (hasErrors(errors)) {
      return {
        ok: false,
        kind: "validation",
        message: new ApiError("validation").message,
        fieldErrors: errors,
      };
    }

    const result = await runAction(() => createPet(values));

    if (!result.ok) return result;

    revalidatePath(CUSTOMER_PETS_HREF);

    return {
      ok: true,
      data: result.data,
    };
  }

/**
 * Server Action of the "Edit pet" form. Checks the session and the data on the server, then sends every field to the backend.
 * The pet pages are refreshed afterwards, so the list and the profile show the new values.
 *
 * @param idPet Id of the pet to change.
 * @param values Values of the edit form.
 * @returns Success, or a safe error with the field errors the backend reported.
 */
export async function updatePetAction(idPet: string, values: NewPetValues): Promise<ActionResult> {
  await requireRole(["CUSTOMER"]);

  const errors = validateNewPet(values, new Date());
  if (hasErrors(errors)) {
    return { ok: false, kind: "validation", message: new ApiError("validation").message, fieldErrors: errors };
  }

  const result = await runAction(() => updatePet(idPet, toUpdatePetDto(values)));
  if (!result.ok) return result;
  revalidatePath(CUSTOMER_PETS_HREF, "layout");
  return { ok: true, data: undefined };
}

/**
 * Server Action of the archive confirmation. Archives the pet on the backend; it then leaves the customer's pets.
 * The pet pages are refreshed afterwards.
 *
 * @param idPet Id of the pet to archive.
 * @returns Success, or a safe error when the backend refuses it.
 */
export async function archivePetAction(idPet: string): Promise<ActionResult> {
  await requireRole(["CUSTOMER"]);

  const result = await runAction(() => deactivatePet(idPet));
  if (!result.ok) return result;
  revalidatePath(CUSTOMER_PETS_HREF, "layout");
  return { ok: true, data: undefined };
}
