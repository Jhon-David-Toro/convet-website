import { StatusBadge } from "@/components/patterns/StatusBadge";
import { TableCell } from "@/components/patterns/Table";
import { STOCK_STATUS_VIEWS } from "@/lib/admin/admin.status.constants";

import type { AlertRowProps } from "../AdminDashboard.types";

/**
 * Row of the inventory alerts table: product, lot, stock left and what is wrong.
 *
 * @param props Props of the component, see {@link AlertRowProps}.
 * @param props.alert Alert of the row.
 * @returns The rendered element.
 */
export function AlertRow({ alert }: AlertRowProps) {
  return (
    <tr>
      <TableCell type="strong">{alert.product}</TableCell>
      <TableCell type="mono">{alert.lot}</TableCell>
      <TableCell type="number">{alert.stock}</TableCell>
      <TableCell type="badge">
        <StatusBadge view={STOCK_STATUS_VIEWS[alert.status]} />
      </TableCell>
    </tr>
  );
}
