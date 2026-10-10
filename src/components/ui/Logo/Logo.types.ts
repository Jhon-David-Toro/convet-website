import type { ComponentPropsWithRef } from "react";

export type LogoProps = ComponentPropsWithRef<"span"> & {
  variant?: "full" | "mark";
  tone?: "default" | "inverse";
};
