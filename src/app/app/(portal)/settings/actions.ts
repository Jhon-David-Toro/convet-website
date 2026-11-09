"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { runAction } from "@/lib/api/api.guard";
import { changePassword } from "@/lib/api/users.api";
import { requireRole } from "@/lib/auth/auth.access";
import { SIGN_IN_HREF } from "@/lib/auth/auth.constants";
import { ACCESS_TOKEN_COOKIE } from "@/lib/auth/session.constants";
import { validateNewPassword } from "@/lib/auth/validation.utils";
import type { FormModalSaveResult } from "@/lib/shared/useFormModal.types";
import type { PasswordValues } from "@/components/sections/PasswordModal/PasswordModal.types";

const WRONG_CURRENT = "Your current password is not correct.";

/**
 * Server Action of the "Change password" dialog. The backend rejects a wrong current password with a validation error,
 * which is shown on that field. The backend signs every session out after a change (including this one), so on success the
 * access cookie is cleared and the customer goes to sign in again.
 *
 * @param values Current and new password.
 * @returns A failure to show in the dialog; on success it redirects and does not return.
 */
export async function changePasswordAction(values: PasswordValues): Promise<FormModalSaveResult<PasswordValues>> {
  const user = await requireRole(["CUSTOMER"]);

  const weak = validateNewPassword(values.next);
  if (weak) return { ok: false, message: weak, fieldErrors: { next: weak } };

  const result = await runAction(() => changePassword(user.idUser, { currentPassword: values.current, newPassword: values.next }));
  if (!result.ok) {
    return result.kind === "validation" ? { ok: false, message: WRONG_CURRENT, fieldErrors: { current: WRONG_CURRENT } } : { ok: false, message: result.message };
  }

  (await cookies()).delete(ACCESS_TOKEN_COOKIE);
  redirect(SIGN_IN_HREF);
}
