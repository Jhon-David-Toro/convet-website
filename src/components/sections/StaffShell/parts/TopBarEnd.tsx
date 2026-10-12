import { ModalButton } from "@/components/sections/ModalButton";
import { NotificationBell } from "@/components/sections/NotificationCenter";
import { Menu, Search } from "@/components/ui/Icon";
import { IconButton } from "@/components/ui/IconButton";

import { MENU_LABEL, NEW_APPOINTMENT_LABEL, OPEN_SEARCH_LABEL } from "../StaffShell.constants";
import type { StaffTopBarEndProps } from "../StaffShell.types";
import { topBarFor } from "../StaffShell.utils";
import styles from "../StaffShell.module.scss";

/**
 * End of the top bar. Desktop: the notifications bell and the new appointment button.
 * Below desktop: the search button and, on record pages, the menu button.
 *
 * @param props Props of the component, see {@link StaffTopBarEndProps}.
 * @param props.pathname Path of the current page.
 * @param props.config Configuration of the area.
 * @param props.onMenu Opens the menu.
 * @returns The rendered element.
 */
export function TopBarEnd({ pathname, config, onMenu }: StaffTopBarEndProps) {
  const hasBack = Boolean(topBarFor(pathname, config).backHref);

  return (
    <>
      <IconButton variant="ghost" icon={Search} label={OPEN_SEARCH_LABEL} className={styles.compactEnd} />
      {hasBack && <IconButton variant="ghost" icon={Menu} label={MENU_LABEL} onClick={onMenu} className={styles.compactEnd} />}
      <NotificationBell />
      <ModalButton modal="appointment" icon="plus" className={styles.desktopEnd}>
        {NEW_APPOINTMENT_LABEL}
      </ModalButton>
    </>
  );
}
