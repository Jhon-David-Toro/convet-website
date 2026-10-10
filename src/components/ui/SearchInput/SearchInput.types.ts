import type { ComponentPropsWithRef } from "react";

import type { FieldMessageProps } from "@/components/ui/Field";

export type SearchInputProps = Omit<ComponentPropsWithRef<"input">, "type" | "size"> &
  Omit<FieldMessageProps, "label"> & {
    label: FieldMessageProps["label"];
    showLabel?: boolean;
    shortcut?: string;
  };
