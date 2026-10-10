import type { ComponentPropsWithRef } from "react";

import type { FieldMessageProps } from "@/components/ui/Field";

export type TextareaProps = ComponentPropsWithRef<"textarea"> & FieldMessageProps;
