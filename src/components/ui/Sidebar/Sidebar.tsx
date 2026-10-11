import { cx } from "@/lib/shared/cx";

import styles from "./Sidebar.module.scss";
import { SidebarBranch } from "./parts/SidebarBranch";
import { SidebarLogo } from "./parts/SidebarLogo";
import { SidebarNav } from "./parts/SidebarNav";
import { SidebarUser } from "./parts/SidebarUser";
import type { SidebarProps } from "./Sidebar.types";

/**
 * Navigation/Sidebar: navigation of the private areas by role (customer, staff, administrator).
 *
 * @param props Props of the component, see {@link SidebarProps}.
 * @param props.groups Groups of navigation items.
 * @param props.branch Active branch. The selector is only shown when there is more than one branch.
 * @param props.onBranchClick Called when the user clicks the branch selector.
 * @param props.user Signed-in user: name and role.
 * @param props.signOutHref Link that signs the user out.
 * @param props.homeHref Link of the logo; defaults to `/`.
 * @param props.className Extra class name for the root element.
 * @param props.rest Remaining properties, forwarded to the root element.
 * @returns The rendered element.
 */
export function Sidebar({ groups, branch, onBranchClick, user, signOutHref, homeHref, className, ...rest }: SidebarProps) {
  return (
    <aside aria-label="Sidebar" {...rest} className={cx(styles.sidebar, className)}>
      <SidebarLogo homeHref={homeHref} />
      {branch && <SidebarBranch branch={branch} onClick={onBranchClick} />}
      <SidebarNav groups={groups} />
      <SidebarUser user={user} signOutHref={signOutHref} />
    </aside>
  );
}
