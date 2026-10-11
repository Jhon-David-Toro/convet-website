import { StatusBadge } from "@/components/patterns/StatusBadge";
import { TableCell } from "@/components/patterns/Table";
import { cx } from "@/lib/shared/cx";

import styles from "../AdminServices.module.scss";
import type { ServiceRowViewProps } from "../AdminServices.types";
import { durationLabel, onlineView } from "../AdminServices.utils";
import { ServiceNameCell } from "./ServiceNameCell";

/**
 * Row of the services table. The name is a button that selects the service; the selected row is highlighted.
 *
 * @param props Props of the component, see {@link ServiceRowViewProps}.
 * @param props.service Service of the row.
 * @param props.selected Whether the service is the selected one.
 * @param props.onSelect Called with the id of the service the user picked.
 * @returns The rendered element.
 */
export function ServiceRowView({ service, selected, onSelect }: ServiceRowViewProps) {
  return (
    <tr className={cx(selected && styles.selected)} aria-selected={selected}>
      <ServiceNameCell service={service} onSelect={onSelect} />
      <TableCell>{durationLabel(service)}</TableCell>
      <TableCell type="badge">
        <StatusBadge view={onlineView(service)} />
      </TableCell>
      <TableCell type="number">{service.vets}</TableCell>
    </tr>
  );
}
