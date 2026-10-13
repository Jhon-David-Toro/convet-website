import { StatusBadge } from "@/components/patterns/StatusBadge";
import { TableCell } from "@/components/patterns/Table";
import { CLIENT_MENU } from "@/lib/admin/admin.menus.constants";

import { ACCOUNT_VIEWS } from "../AdminClients.constants";
import type { ClientRowProps } from "../AdminClients.types";

/**
 * Row of the clients table: name, pets, phone, kind of account, last visit and the row actions.
 *
 * @param props Props of the component, see {@link ClientRowProps}.
 * @param props.client Client of the row.
 * @returns The rendered element.
 */
export function ClientRow({ client }: ClientRowProps) {
  return (
    <tr>
      <TableCell type="strong">{client.name}</TableCell>
      <TableCell>{client.pets}</TableCell>
      <TableCell type="mono">{client.phone}</TableCell>
      <TableCell type="badge">
        <StatusBadge view={ACCOUNT_VIEWS[client.account]} />
      </TableCell>
      <TableCell>{client.lastVisit}</TableCell>
      <TableCell type="actions" actionLabel={`Actions for ${client.name}`} items={CLIENT_MENU} />
    </tr>
  );
}
