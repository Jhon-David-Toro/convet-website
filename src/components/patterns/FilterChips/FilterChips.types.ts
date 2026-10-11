import type { ComponentPropsWithRef } from "react";

export type FilterOption = {
  value: string;
  label: string;
  count?: number | string;
};

export type FilterChipsProps = Omit<ComponentPropsWithRef<"div">, "onChange" | "children"> & {
  label: string;
  options: FilterOption[];
  value: string;
  onChange: (value: string) => void;
};
