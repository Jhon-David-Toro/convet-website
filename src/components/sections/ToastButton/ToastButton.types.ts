import type { ButtonProps } from "@/components/ui/Button";
import type { ToastTone } from "@/components/ui/Toast";

export type ToastButtonProps = Omit<Extract<ButtonProps, { href?: never }>, "onClick" | "type"> & {
  message: string;
  tone?: ToastTone;
};
