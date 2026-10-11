import { DataTable } from "@/components/patterns/DataTable";
import { TableCell } from "@/components/patterns/Table";

import { AUDIT_COLUMNS, AUDIT_ENTRIES, AUDIT_TABLE_LABEL, PANEL_ID } from "../AdminSettings.constants";

/**
 * Audit log: who changed what and when.
 *
 * @returns The rendered element.
 */
export function AuditPanel() {
  return (
    <div id={PANEL_ID} role="tabpanel">
      <DataTable label={AUDIT_TABLE_LABEL} columns={AUDIT_COLUMNS} actions={false} minWidth="36rem">
        {AUDIT_ENTRIES.map((entry) => (
          <tr key={entry.id}>
            <TableCell type="mono">{entry.when}</TableCell>
            <TableCell type="strong">{entry.who}</TableCell>
            <TableCell>{entry.action}</TableCell>
          </tr>
        ))}
      </DataTable>
    </div>
  );
}
