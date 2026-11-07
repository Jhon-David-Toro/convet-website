"use server";

import { revalidatePath } from "next/cache";

import { hasErrors } from "@/lib/auth/validation.utils";
import { runAction } from "@/lib/api/api.guard";
import { ApiError } from "@/lib/api/api.errors";
import { createPet } from "@/lib/api/pets.api";
import { requireRole } from "@/lib/auth/auth.access";
import { validateNewPet } from "@/components/sections/MyPets/MyPets.utils";
import type { NewPetValues } from "@/components/sections/MyPets/MyPets.types";
import type { ActionResult } from "@/lib/api/api.types";
import { CUSTOMER_PETS_HREF } from "@/lib/customer/customer.paths.constants";

/**
 * Server Action of the "Add a pet" form. It checks the session and the data again on the server (the client check is only a convenience)
 * before calling the backend, and refreshes the pet pages afterwards.
 *
 * @param values Values of the form.
 * @returns Success, or a safe error with the field errors the backend reported.
 */
export async function addPetAction(values: NewPetValues): Promise<ActionResult> {
  await requireRole(["CUSTOMER"]);

  const errors = validateNewPet(values, new Date());
  if (hasErrors(errors)) {
    return { ok: false, kind: "validation", message: new ApiError("validation").message, fieldErrors: errors };
  }

  const result = await runAction(() => createPet(values));
  if (!result.ok) return result;
  revalidatePath(CUSTOMER_PETS_HREF);
  return { ok: true, data: undefined };
}
