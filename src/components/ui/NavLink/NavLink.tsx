import Link from "next/link";

import { cx } from "@/lib/shared/cx";

import type { NavLinkProps } from "./NavLink.types";
import styles from "./NavLink.module.scss";

/**
 * Navigation link of the header. The current page is bold, has an indicator and `aria-current="page"`.
 *
 * @param props Props of the component, see {@link NavLinkProps}.
 * @param props.active Current page: bold text, blue indicator and `aria-current="page"`.
 * @param props.className Extra class name for the root element.
 * @param props.rest Remaining properties, forwarded to the root element.
 * @returns The rendered element.
 */
export function NavLink({ active = false, className, ...rest }: NavLinkProps) {
  return (
    <Link {...rest} aria-current={active ? "page" : undefined} className={cx(styles.link, active && styles.active, className)} />
  );
}
