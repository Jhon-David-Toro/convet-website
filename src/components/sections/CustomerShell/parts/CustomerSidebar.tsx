"use client";

import { Sidebar } from "@/components/ui/Sidebar";
import { useSignOut } from "@/lib/auth/useSignOut";

import { ACCOUNT_NAV, MAIN_NAV, SIGN_OUT_HREF } from "../CustomerShell.constants";
import type { CustomerNavItem, CustomerSidebarProps } from "../CustomerShell.types";
import { isActivePath } from "../CustomerShell.utils";
import styles from "../CustomerShell.module.scss";

/**
 * Builds the items of a sidebar group, marking the one of the current page.
 *
 * @param items Navigation items of the group.
 * @param pathname Path of the current page.
 * @returns The props of every item.
 */
function toItems(items: CustomerNavItem[], pathname: string) {
  return items.map(({ icon, label, href }) => ({ icon, label, href, active: isActivePath(href, pathname) }));
}

/**
 * Sidebar of the customer area (desktop only): main pages, account pages and the signed-in user.
 *
 * @param props Props of the component, see {@link CustomerSidebarProps}.
 * @param props.pathname Path of the current page.
 * @param props.user Signed-in user: name and role.
 * @returns The rendered element.
 */
export function CustomerSidebar({ pathname, user }: CustomerSidebarProps) {
  const signOut = useSignOut();
  const groups = [
    { heading: "Main", items: toItems(MAIN_NAV, pathname) },
    { heading: "Account", items: toItems(ACCOUNT_NAV, pathname) },
  ];

  return (
    <div className={styles.sidebar}>
      <Sidebar groups={groups} user={user} signOutHref={SIGN_OUT_HREF} onSignOut={signOut} homeHref="/" />
    </div>
  );
}
