"use client";

import { useState } from "react";

import type { ServicePanelProps, ServiceTab } from "../AdminServices.types";
import { BookingRulesPanel } from "./BookingRulesPanel";
import { PublicPanel } from "./PublicPanel";
import { ServiceTabs } from "./ServiceTabs";
import { VetsPanel } from "./VetsPanel";
import styles from "../AdminServices.module.scss";

const PANELS = {
  public: PublicPanel,
  rules: BookingRulesPanel,
  vets: VetsPanel,
};

/**
 * Settings of the selected service: its name, the tabs and the content of the selected tab.
 *
 * @param props Props of the component, see {@link ServicePanelProps}.
 * @param props.service Service selected in the table.
 * @returns The rendered element.
 */
export function ServicePanel({ service }: ServicePanelProps) {
  const [tab, setTab] = useState<ServiceTab>("rules");
  const Panel = PANELS[tab];

  return (
    <section className={styles.panel} aria-label={service.name}>
      <h2 className={styles.panelTitle}>{service.name}</h2>
      <ServiceTabs tab={tab} onChange={setTab} />
      <Panel service={service} />
    </section>
  );
}
