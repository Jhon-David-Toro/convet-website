import { TableCell } from "@/components/patterns/Table";

import type { SupplierRowProps } from "../AdminSuppliers.types";

/**
 * Row of the suppliers table: name, contact person, phone, email, last delivery and the row actions.
 *
 * @param props Props of the component, see {@link SupplierRowProps}.
 * @param props.supplier Supplier of the row.
 * @returns The rendered element.
 */
export function SupplierRow({ supplier }: SupplierRowProps) {
  return (
    <tr>
      <TableCell type="strong">{supplier.name}</TableCell>
      <TableCell>{supplier.contact}</TableCell>
      <TableCell type="mono">{supplier.phone}</TableCell>
      <TableCell>{supplier.email}</TableCell>
      <TableCell>{supplier.lastDelivery}</TableCell>
      <TableCell type="actions" actionLabel={`Actions for ${supplier.name}`} />
    </tr>
  );
}
