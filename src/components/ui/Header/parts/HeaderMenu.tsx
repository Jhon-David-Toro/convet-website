import { NavItem } from "@/components/ui/NavItem";

import type { HeaderMenuProps } from "../Header.types";
import styles from "../Header.module.scss";

/**
 * Dropdown menu below the navigation row; it closes when a link is activated.
 *
 * @param props Props of the component, see {@link HeaderMenuProps}.
 * @param props.id Element id.
 * @param props.links Links to render.
 * @param props.signInHref Link to the sign in page.
 * @param props.signInLabel Label of the sign in link.
 * @param props.onNavigate Called when a link inside the menu is activated.
 * @returns The rendered element.
 */
export function HeaderMenu({ id, links, signInHref, signInLabel = "Sign in", onNavigate }: HeaderMenuProps) {
  return (
    <div id={id} className={styles.menu}>
      <nav aria-label="Menu" className={styles.menuInner} onClick={(event) => (event.target as HTMLElement).closest("a") && onNavigate()}>
        {links.map((link) => (
          <NavItem key={link.href} href={link.href} label={link.label} active={link.active} />
        ))}
        <NavItem href={signInHref} label={signInLabel} />
      </nav>
    </div>
  );
}
