import Link from "next/link";

import { Avatar } from "@/components/ui/Avatar";
import { Icon, LogOut } from "@/components/ui/Icon";

import styles from "../Sidebar.module.scss";
import { SIDEBAR_SIGN_OUT_ICON_SIZE } from "../Sidebar.constants";
import type { SidebarUserProps } from "../Sidebar.types";

/**
 * Signed-in user (name and role) with the sign out link.
 *
 * @param props Props of the component, see {@link SidebarUserProps}.
 * @param props.user Signed-in user: name and role.
 * @param props.signOutHref Link that signs the user out.
 * @returns The rendered element.
 */
export function SidebarUser({ user, signOutHref }: SidebarUserProps) {
  return (
    <div className={styles.user}>
      <Avatar subject="person" size="small" className={styles.avatar} />
      <div className={styles.userText}>
        <p className={styles.userName}>{user.name}</p>
        <p className={styles.userRole}>{user.role}</p>
      </div>
      <Link href={signOutHref} className={styles.signOut} aria-label="Sign out">
        <Icon icon={LogOut} size={SIDEBAR_SIGN_OUT_ICON_SIZE} />
      </Link>
    </div>
  );
}
