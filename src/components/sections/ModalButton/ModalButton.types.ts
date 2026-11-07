import type { ButtonProps } from "@/components/ui/Button";

import type { SavePassword } from "@/components/sections/PasswordModal/PasswordModal.types";

export type ModalKey = "new-client" | "supplier" | "service" | "product" | "password" | "email" | "delete-account" | "invite" | "time-off" | "patient" | "appointment";

export type ModalIconKey = "plus" | "mail" | "calendar";

export type ModalButtonProps = Omit<Extract<ButtonProps, { href?: never }>, "onClick" | "type" | "leadingIcon" | "trailingIcon"> & {
  modal: ModalKey;
  icon?: ModalIconKey;
  /** Saves the dialog for real; only the password dialog uses it so far. */
  onSave?: SavePassword;
};
