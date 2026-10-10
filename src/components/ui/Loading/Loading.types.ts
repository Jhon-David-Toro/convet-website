import type { ComponentPropsWithRef } from "react";

export type LoadingProps = ComponentPropsWithRef<"div"> & {
  children: string;
};
