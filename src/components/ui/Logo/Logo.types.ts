import type { ComponentPropsWithRef } from "react";

/** Props of the `Logo` component. */
export type LogoProps = ComponentPropsWithRef<"span"> & {
  /** `full`: mark + name; `mark`: only the circular seal. */
  variant?: "full" | "mark";
  /** `inverse` for navy backgrounds (footer, bands). */
  tone?: "default" | "inverse";
};
