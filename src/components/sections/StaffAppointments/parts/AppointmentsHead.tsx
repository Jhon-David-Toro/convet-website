import { TableHeaderCell } from "@/components/patterns/Table";

import { ACTIONS_COLUMN_LABEL, COLUMNS } from "../StaffAppointments.constants";
import styles from "../StaffAppointments.module.scss";

/**
 * Header row of the appointments table; the last column holds the row actions and is only named for screen readers.
 *
 * @returns The rendered element.
 */
export function AppointmentsHead() {
  return (
    <thead>
      <tr>
        {COLUMNS.map((column) => (
          <TableHeaderCell key={column}>{column}</TableHeaderCell>
        ))}
        <TableHeaderCell>
          <span className={styles.srOnly}>{ACTIONS_COLUMN_LABEL}</span>
        </TableHeaderCell>
      </tr>
    </thead>
  );
}
