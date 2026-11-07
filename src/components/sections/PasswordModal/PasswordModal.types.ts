import type { FormModalSaveResult } from "@/lib/shared/useFormModal.types";

/** Saves a new password; in the app it is a Server Action that calls the backend. */
export type SavePassword = (values: PasswordValues) => Promise<FormModalSaveResult<PasswordValues>>;

export type PasswordValues = {
  current: string;
  next: string;
  repeat: string;
};
