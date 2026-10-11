import Link from "next/link";

import { Logo } from "@/components/ui/Logo";

import type { SidebarLogoProps } from "../Sidebar.types";
import styles from "../Sidebar.module.scss";

/**
 * Logo that links to the home page.
 *
 * @param props Props of the component, see {@link SidebarLogoProps}.
 * @param props.homeHref Link of the logo; defaults to `/`.
 * @returns The rendered element.
 */
export function SidebarLogo({ homeHref = "/" }: SidebarLogoProps) {
  return (
    <Link href={homeHref} className={styles.logo} aria-label="CONVET home">
      <Logo />
    </Link>
  );
}
