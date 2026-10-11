import { TabBar, TabBarItem } from "@/components/ui/TabBar";

import { TAB_BAR_NAV } from "../CustomerShell.constants";
import styles from "../CustomerShell.module.scss";
import type { CustomerPathProps } from "../CustomerShell.types";
import { isActivePath } from "../CustomerShell.utils";

/**
 * Bottom navigation of the customer area below desktop: home, pets, visits and profile.
 *
 * @param props Props of the component, see {@link CustomerPathProps}.
 * @param props.pathname Path of the current page.
 * @returns The rendered element.
 */
export function CustomerTabBar({ pathname }: CustomerPathProps) {
  return (
    <TabBar className={styles.tabBar}>
      {TAB_BAR_NAV.map(({ icon, label, href }) => (
        <TabBarItem key={href} icon={icon} label={label} href={href} active={isActivePath(href, pathname)} />
      ))}
    </TabBar>
  );
}
