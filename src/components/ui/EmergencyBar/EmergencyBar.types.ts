import type { ComponentPropsWithRef } from "react";

/** Props of the `EmergencyBar` component. */
export type EmergencyBarProps = ComponentPropsWithRef<"div"> & {
  /** Motto on the left (hidden on mobile): regular text plus highlighted text. */
  motto?: { text: string; highlight: string };
  /** Label of the emergency pill. */
  emergencyLabel?: string;
  /** Phone number to show. */
  phone?: string;
  /** Link that dials the phone number (`tel:`). */
  phoneHref?: string;
};

/** Props of the motto line. */
export type EmergencyMottoProps = NonNullable<EmergencyBarProps["motto"]>;

/** Props of the emergency call pill. */
export type EmergencyCallProps = {
  /** Visible text. For icons it becomes the accessible name. */
  label: string;
  /** Phone number to show. */
  phone: string;
  /** Link destination. */
  href: string;
};
