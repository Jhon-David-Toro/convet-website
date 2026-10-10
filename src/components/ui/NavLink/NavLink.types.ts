import type Link from "next/link";
import type { ComponentProps } from "react";

export type NavLinkProps = ComponentProps<typeof Link> & {
  active?: boolean;
};
