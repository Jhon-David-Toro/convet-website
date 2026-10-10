import type { ComponentPropsWithRef } from "react";

export type PasswordStrengthProps = Omit<ComponentPropsWithRef<"div">, "children"> & {
  password: string;
};

export type StrengthTone = "error" | "warning" | "success";

export type StrengthLevel = {
  label: string;
  tone: StrengthTone;
};
