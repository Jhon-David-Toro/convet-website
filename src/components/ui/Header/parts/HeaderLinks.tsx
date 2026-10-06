import { NavLink } from "@/components/ui/NavLink";

import styles from "../Header.module.scss";
import type { HeaderLinksProps } from "../Header.types";

/**
 * Main navigation links, visible on desktop.
 *
 * @param props Props of the component, see {@link HeaderLinksProps}.
 * @param props.links Links to render.
 * @returns The rendered element.
 */
export function HeaderLinks({ links }: HeaderLinksProps) {
  return (
    <nav aria-label="Main" className={styles.links}>
      {links.map((link) => (
        <NavLink key={link.href} href={link.href} active={link.active}>
          {link.label}
        </NavLink>
      ))}
    </nav>
  );
}
