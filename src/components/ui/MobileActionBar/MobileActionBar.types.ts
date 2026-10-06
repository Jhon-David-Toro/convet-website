import type { ComponentPropsWithRef } from "react";

/** Props of the `MobileActionBar` component. */
export type MobileActionBarProps = ComponentPropsWithRef<"nav"> & {
  /** Sticks to the bottom edge of the screen and is hidden from tablet up (mobile-only bar). */
  fixed?: boolean;
};
