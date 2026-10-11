"use client";

import { usePathname } from "next/navigation";

import { AppTopBar } from "@/components/ui/AppTopBar";
import { useDisclosure } from "@/lib/shared/useDisclosure";

import { SHELL_CONFIGS } from "./StaffShell.constants";
import type { StaffShellProps } from "./StaffShell.types";
import { StaffMenu } from "./parts/StaffMenu";
import { StaffSidebar } from "./parts/StaffSidebar";
import { TopBarEnd } from "./parts/TopBarEnd";
import { TopBarStart } from "./parts/TopBarStart";
import styles from "./StaffShell.module.scss";

/**
 * Frame of the staff area: sidebar on desktop, top bar with the search, the page and, below desktop, a menu dialog.
 *
 * @param props Props of the component, see {@link StaffShellProps}.
 * @param props.children Page content.
 * @param props.variant Which area: the clinic staff or the administrators.
 * @returns The rendered element.
 */
export function StaffShell({ children, variant = "staff" }: StaffShellProps) {
  const config = SHELL_CONFIGS[variant];
  const pathname = usePathname();
  const menu = useDisclosure();

  return (
    <div className={styles.shell}>
      <StaffSidebar pathname={pathname} config={config} />
      <div className={styles.main}>
        <AppTopBar start={<TopBarStart pathname={pathname} config={config} onMenu={menu.show} />} end={<TopBarEnd pathname={pathname} config={config} onMenu={menu.show} />} />
        <main className={styles.content}>{children}</main>
      </div>
      <StaffMenu pathname={pathname} config={config} open={menu.open} onClose={menu.hide} />
    </div>
  );
}
