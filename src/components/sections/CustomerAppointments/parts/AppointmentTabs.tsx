import { Tab } from "@/components/ui/Tab";

import { PANEL_ID, TABS, TABS_LABEL } from "../CustomerAppointments.constants";
import styles from "../CustomerAppointments.module.scss";
import type { AppointmentTabsProps } from "../CustomerAppointments.types";

/**
 * Tabs that switch between upcoming, past and cancelled appointments; the upcoming tab shows how many there are.
 *
 * @param props Props of the component, see {@link AppointmentTabsProps}.
 * @param props.groups Appointments of every tab.
 * @param props.tab Selected tab.
 * @param props.onChange Called with the tab the customer picked.
 * @returns The rendered element.
 */
export function AppointmentTabs({ groups, tab, onChange }: AppointmentTabsProps) {
  return (
    <div role="tablist" aria-label={TABS_LABEL} className={styles.tabs}>
      {TABS.map(({ value, label }) => (
        <Tab key={value} selected={tab === value} count={value === "upcoming" ? groups.upcoming.length : undefined} aria-controls={PANEL_ID} onClick={() => onChange(value)}>
          {label}
        </Tab>
      ))}
    </div>
  );
}
