import { Tab } from "@/components/ui/Tab";

import { PANEL_ID, TABS, TABS_LABEL } from "../ProductLots.constants";
import type { LotsTabsProps } from "../ProductLots.types";
import styles from "../ProductLots.module.scss";

/**
 * Tabs of the product: lots (with how many there are), movements, public page and settings.
 *
 * @param props Props of the component, see {@link LotsTabsProps}.
 * @param props.tab Selected tab.
 * @param props.onChange Called with the tab the user picked.
 * @param props.lotCount How many lots the product has.
 * @returns The rendered element.
 */
export function LotsTabs({ tab, onChange, lotCount }: LotsTabsProps) {
  return (
    <div role="tablist" aria-label={TABS_LABEL} className={styles.tabs}>
      {TABS.map(({ value, label }) => (
        <Tab key={value} selected={tab === value} count={value === "lots" ? lotCount : undefined} aria-controls={PANEL_ID} onClick={() => onChange(value)}>
          {label}
        </Tab>
      ))}
    </div>
  );
}
