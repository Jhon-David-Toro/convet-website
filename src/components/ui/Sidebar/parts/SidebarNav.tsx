import styles from "../Sidebar.module.scss";
import type { SidebarNavProps } from "../Sidebar.types";
import { SidebarGroupView } from "./SidebarGroupView";

/**
 * Primary navigation: every group of items.
 *
 * @param props Props of the component, see {@link SidebarNavProps}.
 * @param props.groups Groups of navigation items.
 * @returns The rendered element.
 */
export function SidebarNav({ groups }: SidebarNavProps) {
  return (
    <nav aria-label="Primary" className={styles.nav}>
      {groups.map((group, index) => (
        <SidebarGroupView key={group.heading ?? index} group={group} />
      ))}
    </nav>
  );
}
