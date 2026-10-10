import type { ComponentPropsWithRef } from "react";

export type PhotoProps = Omit<ComponentPropsWithRef<"div">, "children"> & {
  src?: string;
  alt?: string;
  ratio?: string;
};
