import { Modal } from "@/components/ui/Modal";
import { NavItem } from "@/components/ui/NavItem";

import { MENU_LABEL } from "../StaffShell.constants";
import styles from "../StaffShell.module.scss";
import type { StaffMenuProps } from "../StaffShell.types";
import { sidebarGroups } from "../StaffShell.utils";

/**
 * Navigation of the area on small screens: a dialog with the same links as the sidebar.
 *
 * @param props Props of the component, see {@link StaffMenuProps}.
 * @param props.pathname Path of the current page.
 * @param props.config Configuration of the area.
 * @param props.open Whether the menu is open.
 * @param props.onClose Closes the menu.
 * @returns The rendered element.
 */
export function StaffMenu({ pathname, config, open, onClose }: StaffMenuProps) {
  const items = sidebarGroups(config.nav, pathname, config.homeHref).flatMap((group) => group.items);

  return (
    <Modal open={open} onClose={onClose} title={MENU_LABEL}>
      <ul className={styles.menuList}>
        {items.map((item) => (
          <li key={item.href}>
            <NavItem {...item} onClick={onClose} />
          </li>
        ))}
      </ul>
    </Modal>
  );
}
