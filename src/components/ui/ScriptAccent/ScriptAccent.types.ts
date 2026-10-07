import type { ComponentPropsWithRef } from "react";

/** Props of the `ScriptAccent` component. */
export type ScriptAccentProps = ComponentPropsWithRef<"p"> & {
  /** `large`: Accent/Script (34/40); `small`: Accent/Script S (22/28). */
  size?: "large" | "small";
};
