import { Sidebar } from "@/components/ui/Sidebar";
import { STAFF_SIGN_OUT_HREF } from "@/lib/staff.paths.constants";

import styles from "../StaffShell.module.scss";
import type { StaffPathProps } from "../StaffShell.types";
import { sidebarGroups } from "../StaffShell.utils";

/**
 * Sidebar of the staff or admin area (desktop only): the pages of the area, the branch and the signed-in user.
 *
 * @param props Props of the component, see {@link StaffPathProps}.
 * @param props.pathname Path of the current page.
 * @param props.config Configuration of the area.
 * @returns The rendered element.
 */
export function StaffSidebar({ pathname, config }: StaffPathProps) {
  return (
    <div className={styles.sidebar}>
      <Sidebar groups={sidebarGroups(config.nav, pathname, config.homeHref)} branch={config.branch} user={config.user} signOutHref={STAFF_SIGN_OUT_HREF} homeHref="/" />
    </div>
  );
}
