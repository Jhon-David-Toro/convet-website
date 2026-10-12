import type { ButtonProps } from "@/components/ui/Button";

export type ModalKey = "new-client" | "supplier" | "service" | "product" | "password" | "email" | "delete-account" | "invite" | "time-off" | "patient";

export type ModalIconKey = "plus" | "mail" | "calendar";

export type ModalButtonProps = Omit<Extract<ButtonProps, { href?: never }>, "onClick" | "type" | "leadingIcon" | "trailingIcon"> & {
  modal: ModalKey;
  icon?: ModalIconKey;
};
