import type { ComponentPropsWithRef } from "react";

/** Props of the `EmployeeCard` component. */
export type EmployeeCardProps = ComponentPropsWithRef<"article"> & {
  /** Portrait of the person: image `src` and `alt`. */
  photo?: { src: string; alt: string };
  /** Name to show. */
  name: string;
  /** Description line, e.g. "Veterinarian · Small animals". */
  role: string;
  /** Navy label with the role, e.g. "Veterinarian". */
  roleLabel: string;
  /** Names of the services offered. */
  services?: string[];
  /** Link to the booking page. */
  bookHref: string;
  /** Label of the booking button. */
  bookLabel: string;
};

/** Props of the list of service badges. */
export type EmployeeServicesProps = {
  /** Names of the services offered. */
  services: string[];
};
