import { DataTable } from "@/components/patterns/DataTable";
import { SERVICE_ROWS } from "@/lib/admin/admin.constants";

import { COLUMNS, TABLE_LABEL } from "../AdminServices.constants";
import type { ServicesTableProps } from "../AdminServices.types";
import { ServiceRowView } from "./ServiceRowView";

/**
 * Table of the services; the row of the selected one is highlighted and its name selects it.
 *
 * @param props Props of the component, see {@link ServicesTableProps}.
 * @param props.selectedId Id of the selected service.
 * @param props.onSelect Called with the id of the service the user picked.
 * @returns The rendered element.
 */
export function ServicesTable({ selectedId, onSelect }: ServicesTableProps) {
  return (
    <DataTable label={TABLE_LABEL} columns={COLUMNS} actions={false} minWidth="28rem">
      {SERVICE_ROWS.map((service) => (
        <ServiceRowView key={service.id} service={service} selected={service.id === selectedId} onSelect={onSelect} />
      ))}
    </DataTable>
  );
}
