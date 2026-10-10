import type { ComponentPropsWithRef } from "react";

import type { FieldMessageProps } from "@/components/ui/Field";

export type TextInputProps = Omit<ComponentPropsWithRef<"input">, "type" | "size"> &
  FieldMessageProps & {
    type?: "text" | "email" | "tel" | "url" | "password" | "number";
  };
