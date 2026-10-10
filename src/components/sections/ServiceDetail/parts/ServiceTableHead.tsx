import { TableHeaderCell } from "@/components/patterns/Table";

import type { ServiceTableHeadProps } from "../ServiceDetail.types";

/**
 * Header row of the reference table.
 *
 * @param props Props of the component, see {@link ServiceTableHeadProps}.
 * @param props.columns Column headers.
 * @returns The rendered element.
 */
export function ServiceTableHead({ columns }: ServiceTableHeadProps) {
  return (
    <thead>
      <tr>
        {columns.map((column) => (
          <TableHeaderCell key={column}>{column}</TableHeaderCell>
        ))}
      </tr>
    </thead>
  );
}
