import { DataTable } from "@/components/patterns/DataTable";
import { TableCell } from "@/components/patterns/Table";
import { Badge } from "@/components/ui/Badge";

import { DRAWER_LOTS_TITLE, LOT_BADGES, LOT_COLUMNS } from "../StaffInventory.constants";
import type { DrawerProductProps } from "../StaffInventory.types";
import styles from "../StaffInventory.module.scss";

/**
 * Lots of a product on hand, the one to use first on top, with their expiry, quantity and status.
 *
 * @param props Props of the component, see {@link DrawerProductProps}.
 * @param props.product Product shown.
 * @returns The rendered element.
 */
export function DrawerLots({ product }: DrawerProductProps) {
  if (product.lots.length === 0) return null;

  return (
    <section className={styles.drawerSection}>
      <h3 className={styles.drawerHeading}>{DRAWER_LOTS_TITLE}</h3>
      <DataTable label="Lots on hand" columns={LOT_COLUMNS} actions={false} minWidth="22rem">
        {product.lots.map((lot) => {
          const { tone, icon, label } = LOT_BADGES[lot.status];
          return (
            <tr key={lot.code}>
              <TableCell type="mono">{lot.code}</TableCell>
              <TableCell>{lot.expiry}</TableCell>
              <TableCell type="number">{lot.quantity}</TableCell>
              <TableCell type="badge">
                <Badge tone={tone} icon={icon}>
                  {label}
                </Badge>
              </TableCell>
            </tr>
          );
        })}
      </DataTable>
    </section>
  );
}
