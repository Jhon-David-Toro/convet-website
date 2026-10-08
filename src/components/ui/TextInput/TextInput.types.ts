import type { ComponentPropsWithRef } from "react";

import type { FieldMessageProps } from "@/components/ui/Field";

/** Props of the `TextInput` component. */
export type TextInputProps = Omit<ComponentPropsWithRef<"input">, "type" | "size"> &
  FieldMessageProps & {
    /** Variant of the element (button type or cell type). */
    type?: "text" | "email" | "tel" | "url" | "password" | "number";
  };
