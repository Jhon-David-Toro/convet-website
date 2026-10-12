import type { ButtonProps } from "@/components/ui/Button";

export type ModalKey = "new-client" | "supplier" | "service" | "product" | "password" | "email" | "delete-account";

export type ModalButtonProps = Omit<Extract<ButtonProps, { href?: never }>, "onClick" | "type"> & {
  modal: ModalKey;
};
