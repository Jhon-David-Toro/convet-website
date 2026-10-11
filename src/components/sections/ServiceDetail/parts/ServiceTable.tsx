import { cx } from "@/lib/shared/cx";

import type { ServiceTableProps } from "../ServiceDetail.types";
import { ServiceTableHead } from "./ServiceTableHead";
import { ServiceTableRow } from "./ServiceTableRow";
import styles from "../ServiceDetail.module.scss";

/**
 * Reference table of a service (e.g. the vaccines that are offered); the first column is emphasized.
 *
 * @param props Props of the component, see {@link ServiceTableProps}.
 * @param props.table Heading, columns and rows of the table.
 * @returns The rendered element.
 */
export function ServiceTable({ table }: ServiceTableProps) {
  return (
    <section className={cx(styles.block, styles.tableBlock)}>
      <h2 className={styles.blockTitle}>{table.title}</h2>
      <div className={styles.tableCard}>
        <table className={styles.table}>
          <ServiceTableHead columns={table.columns} />
          <tbody>
            {table.rows.map((row) => (
              <ServiceTableRow key={row[0]} row={row} />
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
