import type { ComponentPropsWithRef } from "react";

import type { FieldMessageProps } from "@/components/ui/Field";

/** Props of the `SearchInput` component. */
export type SearchInputProps = Omit<ComponentPropsWithRef<"input">, "type" | "size"> &
  Omit<FieldMessageProps, "label"> & {
    /** Accessible name. Visually hidden by default (as in Figma). */
    label: FieldMessageProps["label"];
    /** Whether the label is visible; when `false` it stays available to assistive technology. */
    showLabel?: boolean;
    /** Keyboard shortcut shown as a hint, e.g. "Ctrl K". */
    shortcut?: string;
  };
