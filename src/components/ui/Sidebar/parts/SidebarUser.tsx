import Link from "next/link";

import { Avatar } from "@/components/ui/Avatar";
import { Icon, LogOut } from "@/components/ui/Icon";

import { SIDEBAR_SIGN_OUT_ICON_SIZE } from "../Sidebar.constants";
import type { SidebarUserProps } from "../Sidebar.types";
import styles from "../Sidebar.module.scss";

/**
 * Signed-in user (name and role) with the sign out link.
 *
 * @param props Props of the component, see {@link SidebarUserProps}.
 * @param props.user Signed-in user: name and role.
 * @param props.signOutHref Link that signs the user out when there is no `onSignOut`.
 * @param props.onSignOut Signs the user out; renders a button instead of a link.
 * @returns The rendered element.
 */
export function SidebarUser({ user, signOutHref, onSignOut }: SidebarUserProps) {
  return (
    <div className={styles.user}>
      <Avatar subject="person" size="small" className={styles.avatar} />
      <div className={styles.userText}>
        <p className={styles.userName}>{user.name}</p>
        <p className={styles.userRole}>{user.role}</p>
      </div>
      {onSignOut ? (
        <button type="button" onClick={onSignOut} className={styles.signOut} aria-label="Sign out">
          <Icon icon={LogOut} size={SIDEBAR_SIGN_OUT_ICON_SIZE} />
        </button>
      ) : (
        <Link href={signOutHref} className={styles.signOut} aria-label="Sign out">
          <Icon icon={LogOut} size={SIDEBAR_SIGN_OUT_ICON_SIZE} />
        </Link>
      )}
    </div>
  );
}
