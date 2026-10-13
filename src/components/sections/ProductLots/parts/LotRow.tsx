"use client";

import { StatusBadge } from "@/components/patterns/StatusBadge";
import { TableCell } from "@/components/patterns/Table";
import { STOCK_STATUS_VIEWS } from "@/lib/admin/admin.status.constants";
import { LOT_MENU } from "@/lib/admin/admin.menus.constants";

import type { LotRowProps } from "../ProductLots.types";
import { LotIdentityCells } from "./LotIdentityCells";

/**
 * Row of the lots table: lot code, expiry, supplier, date received, units on hand, status and the row actions.
 *
 * @param props Props of the component, see {@link LotRowProps}.
 * @param props.lot Lot of the row.
 * @returns The rendered element.
 */
export function LotRow({ lot }: LotRowProps) {
  return (
    <tr>
      <LotIdentityCells lot={lot} />
      <TableCell type="number">{lot.onHand}</TableCell>
      <TableCell type="badge">
        <StatusBadge view={STOCK_STATUS_VIEWS[lot.status]} />
      </TableCell>
      <TableCell type="actions" actionLabel={`Actions for lot ${lot.code}`} items={LOT_MENU} />
    </tr>
  );
}
