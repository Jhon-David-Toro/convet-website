"use client";

import { usePathname } from "next/navigation";

import styles from "./CustomerShell.module.scss";
import type { CustomerShellProps } from "./CustomerShell.types";
import { CustomerSidebar } from "./parts/CustomerSidebar";
import { CustomerTabBar } from "./parts/CustomerTabBar";
import { CustomerTopBar } from "./parts/CustomerTopBar";

/**
 * Frame of the signed-in customer area: sidebar on desktop, top bar, the page and the bottom tab bar on small screens.
 *
 * @param props Props of the component, see {@link CustomerShellProps}.
 * @param props.children Page content.
 * @returns The rendered element.
 */
export function CustomerShell({ children }: CustomerShellProps) {
  const pathname = usePathname();

  return (
    <div className={styles.shell}>
      <CustomerSidebar pathname={pathname} />
      <div className={styles.main}>
        <CustomerTopBar pathname={pathname} />
        <main className={styles.content}>{children}</main>
      </div>
      <CustomerTabBar pathname={pathname} />
    </div>
  );
}
