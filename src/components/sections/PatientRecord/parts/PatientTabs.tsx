import { Tab } from "@/components/ui/Tab";

import { PANEL_ID, TABS, TABS_LABEL } from "../PatientRecord.constants";
import type { PatientTabsProps } from "../PatientRecord.types";
import styles from "../PatientRecord.module.scss";

/**
 * Tabs of the record: visits, vaccines, treatments, documents and appointments, with a count where there is one.
 *
 * @param props Props of the component, see {@link PatientTabsProps}.
 * @param props.tab Selected tab.
 * @param props.onChange Called with the tab the user picked.
 * @returns The rendered element.
 */
export function PatientTabs({ tab, onChange }: PatientTabsProps) {
  return (
    <div role="tablist" aria-label={TABS_LABEL} className={styles.tabs}>
      {TABS.map(({ value, label, count }) => (
        <Tab key={value} selected={tab === value} count={count} aria-controls={PANEL_ID} onClick={() => onChange(value)}>
          {label}
        </Tab>
      ))}
    </div>
  );
}
