import type { ComponentPropsWithRef } from "react";

/** Props of the `EmergencyCard` component. */
export type EmergencyCardProps = Omit<ComponentPropsWithRef<"section">, "title"> & {
  /** Small heading, e.g. "24/7 Emergency · Call now". */
  label: string;
  /** Large phone number, e.g. "593-0404". */
  number: string;
  /** Short note shown under the label. */
  note: string;
  /** Call link, e.g. "tel:+2975930404". */
  href: string;
  /** Accessible label of the call link. */
  callLabel: string;
};
