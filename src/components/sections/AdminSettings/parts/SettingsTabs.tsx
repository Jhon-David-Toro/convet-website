import { Tab } from "@/components/ui/Tab";

import { PANEL_ID, TABS, TABS_LABEL } from "../AdminSettings.constants";
import styles from "../AdminSettings.module.scss";
import type { SettingsTabsProps } from "../AdminSettings.types";

/**
 * Tabs of the settings page.
 *
 * @param props Props of the component, see {@link SettingsTabsProps}.
 * @param props.tab Selected tab.
 * @param props.onChange Called with the tab the user picked.
 * @returns The rendered element.
 */
export function SettingsTabs({ tab, onChange }: SettingsTabsProps) {
  return (
    <div role="tablist" aria-label={TABS_LABEL} className={styles.tabs}>
      {TABS.map(({ value, label }) => (
        <Tab key={value} selected={tab === value} aria-controls={PANEL_ID} onClick={() => onChange(value)}>
          {label}
        </Tab>
      ))}
    </div>
  );
}
