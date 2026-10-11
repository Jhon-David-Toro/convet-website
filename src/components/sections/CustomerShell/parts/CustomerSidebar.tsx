import { Sidebar } from "@/components/ui/Sidebar";
import { CUSTOMER_NAME, CUSTOMER_ROLE } from "@/lib/customer/customer.constants";

import { ACCOUNT_NAV, MAIN_NAV, SIGN_OUT_HREF } from "../CustomerShell.constants";
import type { CustomerNavItem, CustomerPathProps } from "../CustomerShell.types";
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
 * @param props Props of the component, see {@link CustomerPathProps}.
 * @param props.pathname Path of the current page.
 * @returns The rendered element.
 */
export function CustomerSidebar({ pathname }: CustomerPathProps) {
  const groups = [
    { heading: "Main", items: toItems(MAIN_NAV, pathname) },
    { heading: "Account", items: toItems(ACCOUNT_NAV, pathname) },
  ];

  return (
    <div className={styles.sidebar}>
      <Sidebar groups={groups} user={{ name: CUSTOMER_NAME, role: CUSTOMER_ROLE }} signOutHref={SIGN_OUT_HREF} homeHref="/" />
    </div>
  );
}
