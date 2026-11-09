import type { ComponentPropsWithRef } from "react";
import type { LucideIcon } from "lucide-react";

import type { FieldMessageProps } from "@/components/ui/Field";

export type TrailingButton = {
  label: string;
  icon: LucideIcon;
  onClick: () => void;
};

export type TextInputProps = Omit<ComponentPropsWithRef<"input">, "type" | "size"> &
  FieldMessageProps & {
    type?: "text" | "email" | "tel" | "url" | "password" | "number";
    trailingButton?: TrailingButton;
  };
