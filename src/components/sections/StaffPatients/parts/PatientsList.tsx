import { DataTable } from "@/components/patterns/DataTable";

import { COLUMNS, TABLE_LABEL } from "../StaffPatients.constants";
import type { PatientRowsProps } from "../StaffPatients.types";
import { PatientCard } from "./PatientCard";
import { PatientRow } from "./PatientRow";
import styles from "../StaffPatients.module.scss";

/**
 * The patients of the page: cards on mobile and a table from tablet.
 *
 * @param props Props of the component, see {@link PatientRowsProps}.
 * @param props.rows Patients of the current page.
 * @returns The rendered element.
 */
export function PatientsList({ rows }: PatientRowsProps) {
  return (
    <>
      <ul className={styles.cards} aria-label={TABLE_LABEL}>
        {rows.map((patient) => (
          <PatientCard key={patient.id} patient={patient} />
        ))}
      </ul>
      <div className={styles.tableOnly}>
        <DataTable label={TABLE_LABEL} columns={COLUMNS} minWidth="64rem">
          {rows.map((patient) => (
            <PatientRow key={patient.id} patient={patient} />
          ))}
        </DataTable>
      </div>
    </>
  );
}
