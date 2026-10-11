import { NavItem } from "@/components/ui/NavItem";

import type { SidebarGroupViewProps } from "../Sidebar.types";
import styles from "../Sidebar.module.scss";

/**
 * A titled group of navigation items.
 *
 * @param props Props of the component, see {@link SidebarGroupViewProps}.
 * @param props.group Group of navigation items with its heading.
 * @returns The rendered element.
 */
export function SidebarGroupView({ group }: SidebarGroupViewProps) {
  return (
    <section className={styles.group} aria-label={group.heading}>
      {group.heading && <p className={styles.heading}>{group.heading}</p>}
      <ul className={styles.items}>
        {group.items.map((item) => (
          <li key={item.label}>
            <NavItem {...item} />
          </li>
        ))}
      </ul>
    </section>
  );
}
