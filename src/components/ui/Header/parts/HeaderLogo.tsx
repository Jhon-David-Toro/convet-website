import Link from "next/link";

import { Logo } from "@/components/ui/Logo";

import type { HeaderLogoProps } from "../Header.types";
import styles from "../Header.module.scss";

/**
 * Logo that links to the home page.
 *
 * @param props Props of the component, see {@link HeaderLogoProps}.
 * @param props.homeHref Link of the logo; defaults to `/`.
 * @returns The rendered element.
 */
export function HeaderLogo({ homeHref = "/" }: HeaderLogoProps) {
  return (
    <Link href={homeHref} aria-label="CONVET home" className={styles.logo}>
      <Logo />
    </Link>
  );
}
