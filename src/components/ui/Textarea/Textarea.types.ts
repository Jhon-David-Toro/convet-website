import type { ComponentPropsWithRef } from "react";

import type { FieldMessageProps } from "@/components/ui/Field";

/** Props of the `Textarea` component. */
export type TextareaProps = ComponentPropsWithRef<"textarea"> & FieldMessageProps;
