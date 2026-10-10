import type { ReactNode } from "react";

export type FieldMessageProps = {
  label: ReactNode;
  optional?: boolean;
  helper?: ReactNode;
  error?: ReactNode;
};

export type FieldProps = FieldMessageProps & {
  id: string;
  disabled?: boolean;
  showLabel?: boolean;
  className?: string;
  children: ReactNode;
};

export type FieldLabelProps = Pick<FieldProps, "id" | "label" | "optional" | "disabled" | "showLabel">;

export type FieldHintProps = Pick<FieldProps, "id"> & {
  message: ReactNode;
  isError: boolean;
};

export type UseFieldOptions = Pick<FieldMessageProps, "helper" | "error">;
