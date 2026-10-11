import Link from "next/link";

import { DataTable } from "@/components/patterns/DataTable";
import { ArrowRight, Icon } from "@/components/ui/Icon";
import { INVENTORY_ALERTS } from "@/lib/admin/admin.constants";
import { ADMIN_NAV_HREFS } from "@/lib/admin/admin.paths.constants";

import styles from "../AdminDashboard.module.scss";
import { ALERT_COLUMNS, ALERTS_TABLE_LABEL, ALERTS_TITLE, OPEN_INVENTORY_LABEL } from "../AdminDashboard.constants";
import { AlertRow } from "./AlertRow";

/**
 * Inventory alerts: the products and lots that need attention, with a link to the inventory.
 *
 * @returns The rendered element.
 */
export function AlertsTable() {
  return (
    <section className={styles.block} aria-labelledby="dashboard-alerts">
      <div className={styles.blockHeader}>
        <h2 id="dashboard-alerts" className={styles.blockTitle}>
          {ALERTS_TITLE}
        </h2>
        <Link href={ADMIN_NAV_HREFS.stock} className={styles.link}>
          {OPEN_INVENTORY_LABEL}
          <Icon icon={ArrowRight} size="small" />
        </Link>
      </div>
      <DataTable label={ALERTS_TABLE_LABEL} columns={ALERT_COLUMNS} actions={false} minWidth="34rem">
        {INVENTORY_ALERTS.map((alert) => (
          <AlertRow key={alert.id} alert={alert} />
        ))}
      </DataTable>
    </section>
  );
}
