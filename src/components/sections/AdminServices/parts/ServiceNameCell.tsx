import { TableCell } from "@/components/patterns/Table";

import type { ServiceNameCellProps } from "../AdminServices.types";
import styles from "../AdminServices.module.scss";

/**
 * Name of a service in the table: a button that selects the service.
 *
 * @param props Props of the component, see {@link ServiceNameCellProps}.
 * @param props.service Service of the row.
 * @param props.onSelect Called with the id of the service the user picked.
 * @returns The rendered element.
 */
export function ServiceNameCell({ service, onSelect }: ServiceNameCellProps) {
  return (
    <TableCell type="strong">
      <button type="button" className={styles.nameButton} onClick={() => onSelect(service.id)}>
        {service.name}
      </button>
    </TableCell>
  );
}
