import { Tab } from "@/components/ui/Tab";

import styles from "../AdminServices.module.scss";
import { PANEL_ID, TABS, TABS_LABEL } from "../AdminServices.constants";
import type { ServiceTabsProps } from "../AdminServices.types";

/**
 * Tabs of the service panel: public page, booking rules and vets.
 *
 * @param props Props of the component, see {@link ServiceTabsProps}.
 * @param props.tab Selected tab.
 * @param props.onChange Called with the tab the user picked.
 * @returns The rendered element.
 */
export function ServiceTabs({ tab, onChange }: ServiceTabsProps) {
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
