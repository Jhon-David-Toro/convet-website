import type { ReactNode } from "react";

/** Field props shared by every Input/*: label, optional marker, helper and error. */
export type FieldMessageProps = {
  /** Visible text. For icons it becomes the accessible name. */
  label: ReactNode;
  /** Shows "(optional)" next to the label. */
  optional?: boolean;
  /** Helper text below the control. */
  helper?: ReactNode;
  /** Error message: replaces the helper and marks the control as invalid. */
  error?: ReactNode;
};

/** Props of the `Field` component. */
export type FieldProps = FieldMessageProps & {
  /** Control id: the label points to it and the message hangs from `${id}-message`. */
  id: string;
  /** Whether the control is disabled. */
  disabled?: boolean;
  /** `false` hides the label visually but keeps it for assistive technology. */
  showLabel?: boolean;
  /** Extra class name for the root element. */
  className?: string;
  /** Content of the element. */
  children: ReactNode;
};

/** Props of the label. */
export type FieldLabelProps = Pick<FieldProps, "id" | "label" | "optional" | "disabled" | "showLabel">;

/** Props of the helper / error message. */
export type FieldHintProps = Pick<FieldProps, "id"> & {
  /** Message to show. */
  message: ReactNode;
  /** Whether the message is an error (red, with a warning icon). */
  isError: boolean;
};

/** Messages that decide the accessibility attributes of a field. */
export type UseFieldOptions = Pick<FieldMessageProps, "helper" | "error">;
