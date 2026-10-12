import { RowMenu } from "@/components/patterns/RowMenu";
import { StackedCell } from "@/components/patterns/StackedCell";
import { TableCell } from "@/components/patterns/Table";

import { ACTIONS_LABEL_PREFIX } from "../StaffPatients.constants";
import type { PatientRowProps } from "../StaffPatients.types";
import { breedLine, rowMenuItems } from "../StaffPatients.utils";
import { VaccineBadge } from "./VaccineBadge";
import styles from "../StaffPatients.module.scss";

/**
 * Row of the patients table: pet with its breed, birth date and age, color, owner with the phone, next appointment, vaccination and the row menu.
 *
 * @param props Props of the component, see {@link PatientRowProps}.
 * @param props.patient Patient of the row.
 * @returns The rendered element.
 */
export function PatientRow({ patient }: PatientRowProps) {
  return (
    <tr>
      <TableCell type="avatar" avatar={patient.species} secondary={breedLine(patient)}>
        {patient.name}
      </TableCell>
      <TableCell>
        <StackedCell primary={patient.born} secondary={patient.age} />
      </TableCell>
      <TableCell>{patient.color}</TableCell>
      <TableCell>
        <StackedCell primary={patient.owner} secondary={patient.phone} />
      </TableCell>
      <TableCell>
        <StackedCell primary={patient.nextWhen} secondary={patient.nextWhat} />
      </TableCell>
      <TableCell type="badge">
        <VaccineBadge vaccine={patient.vaccine} vaccineLabel={patient.vaccineLabel} />
      </TableCell>
      <TableCell className={styles.menuCell}>
        <RowMenu label={`${ACTIONS_LABEL_PREFIX} ${patient.name}`} items={rowMenuItems()} />
      </TableCell>
    </tr>
  );
}
