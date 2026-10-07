import type Link from "next/link";
import type { ComponentProps } from "react";

/** Props of the `NavLink` component. */
export type NavLinkProps = ComponentProps<typeof Link> & {
  /** Current page: bold text, blue indicator and `aria-current="page"`. */
  active?: boolean;
};
