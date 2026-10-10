import { TableCell } from "@/components/patterns/Table";

import type { ServiceTableRowProps } from "../ServiceDetail.types";

/**
 * Row of the reference table; the first cell is emphasized.
 *
 * @param props Props of the component, see {@link ServiceTableRowProps}.
 * @param props.row Cells of the row, in column order.
 * @returns The rendered element.
 */
export function ServiceTableRow({ row }: ServiceTableRowProps) {
  return (
    <tr>
      {row.map((cell, index) => (
        <TableCell key={cell} type={index === 0 ? "strong" : "text"}>
          {cell}
        </TableCell>
      ))}
    </tr>
  );
}
