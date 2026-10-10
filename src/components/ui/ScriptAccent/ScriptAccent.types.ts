import type { ComponentPropsWithRef } from "react";

export type ScriptAccentProps = ComponentPropsWithRef<"p"> & {
  size?: "large" | "small";
};
