import { TableCell } from "@/components/patterns/Table";

import type { LotCellsProps } from "../ProductLots.types";

/**
 * First cells of a lot row: the lot code, the expiry, the supplier and the date received.
 *
 * @param props Props of the component, see {@link LotCellsProps}.
 * @param props.lot Lot of the row.
 * @returns The rendered element.
 */
export function LotIdentityCells({ lot }: LotCellsProps) {
  return (
    <>
      <TableCell type="mono">{lot.code}</TableCell>
      <TableCell>{lot.expiry}</TableCell>
      <TableCell>{lot.supplier}</TableCell>
      <TableCell>{lot.received}</TableCell>
    </>
  );
}
