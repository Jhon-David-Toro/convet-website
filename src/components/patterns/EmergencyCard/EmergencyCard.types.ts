import type { ComponentPropsWithRef } from "react";

export type EmergencyCardProps = Omit<ComponentPropsWithRef<"section">, "title"> & {
  label: string;
  number: string;
  note: string;
  href: string;
  callLabel: string;
};
