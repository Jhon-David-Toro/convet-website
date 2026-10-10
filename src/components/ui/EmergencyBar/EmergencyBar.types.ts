import type { ComponentPropsWithRef } from "react";

export type EmergencyBarProps = ComponentPropsWithRef<"div"> & {
  motto?: { text: string; highlight: string };
  emergencyLabel?: string;
  phone?: string;
  phoneHref?: string;
};

export type EmergencyMottoProps = NonNullable<EmergencyBarProps["motto"]>;

export type EmergencyCallProps = {
  label: string;
  phone: string;
  href: string;
};
