import type { ComponentPropsWithRef } from "react";

/** Props of the `Loading` component. */
export type LoadingProps = ComponentPropsWithRef<"div"> & {
  /** Visible message; also announced to assistive technology. */
  children: string;
};
