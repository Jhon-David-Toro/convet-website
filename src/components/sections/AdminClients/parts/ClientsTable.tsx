import { DataTable } from "@/components/patterns/DataTable";

import { COLUMNS, TABLE_LABEL } from "../AdminClients.constants";
import type { ClientsTableProps } from "../AdminClients.types";
import { ClientRow } from "./ClientRow";

/**
 * Table of the clients with their pets, phone, kind of account and last visit.
 *
 * @param props Props of the component, see {@link ClientsTableProps}.
 * @param props.rows Clients to list.
 * @returns The rendered element.
 */
export function ClientsTable({ rows }: ClientsTableProps) {
  return (
    <DataTable label={TABLE_LABEL} columns={COLUMNS} minWidth="48rem">
      {rows.map((client) => (
        <ClientRow key={client.id} client={client} />
      ))}
    </DataTable>
  );
}
