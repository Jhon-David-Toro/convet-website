import { Tab } from "@/components/ui/Tab";
import { FILTER_ALL, FILTER_UNREAD } from "@/lib/notifications/notifications.utils";

import { ALL_LABEL, TABS_LABEL, UNREAD_LABEL } from "../NotificationCenter.constants";
import type { PanelTabsProps } from "../NotificationCenter.types";
import styles from "../NotificationCenter.module.scss";

/**
 * Tabs of the panel: every notification, or only the unread ones with their count.
 *
 * @param props Props of the component, see {@link PanelTabsProps}.
 * @param props.filter Selected tab: `all` or `unread`.
 * @param props.unread How many notifications are unread.
 * @param props.onChange Called with the tab the user picked.
 * @returns The rendered element.
 */
export function PanelTabs({ filter, unread, onChange }: PanelTabsProps) {
  return (
    <div role="tablist" aria-label={TABS_LABEL} className={styles.tabs}>
      <Tab selected={filter === FILTER_ALL} onClick={() => onChange(FILTER_ALL)}>
        {ALL_LABEL}
      </Tab>
      <Tab selected={filter === FILTER_UNREAD} count={unread} onClick={() => onChange(FILTER_UNREAD)}>
        {UNREAD_LABEL}
      </Tab>
    </div>
  );
}
