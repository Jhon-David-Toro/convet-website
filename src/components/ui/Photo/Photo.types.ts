import type { ComponentPropsWithRef } from "react";

/** Props of the `Photo` component. */
export type PhotoProps = Omit<ComponentPropsWithRef<"div">, "children"> & {
  /** Image source URL. */
  src?: string;
  /** Photo description (required with `src`). */
  alt?: string;
  /** CSS aspect ratio (defaults to Media/Photo: 320×400). */
  ratio?: string;
};
