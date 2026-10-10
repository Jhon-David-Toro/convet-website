import type { ComponentPropsWithRef } from "react";

export type EmployeeCardProps = ComponentPropsWithRef<"article"> & {
  photo?: { src: string; alt: string };
  name: string;
  role: string;
  roleLabel: string;
  services?: string[];
  bookHref: string;
  bookLabel: string;
};

export type EmployeeServicesProps = {
  services: string[];
};
