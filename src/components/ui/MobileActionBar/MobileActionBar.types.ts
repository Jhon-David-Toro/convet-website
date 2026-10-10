import type { ComponentPropsWithRef } from "react";

export type MobileActionBarProps = ComponentPropsWithRef<"nav"> & {
  fixed?: boolean;
};
