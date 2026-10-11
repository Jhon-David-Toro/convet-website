import styles from "../StaffToday.module.scss";
import type { GridColumnProps } from "../StaffToday.types";
import { columnAppointments } from "../StaffToday.utils";
import { GridEvent } from "./GridEvent";

/**
 * Column of one vet: the appointments of the vet over the hour lines.
 *
 * @param props Props of the component, see {@link GridColumnProps}.
 * @param props.vet Vet of the column.
 * @returns The rendered element.
 */
export function GridColumn({ vet }: GridColumnProps) {
  return (
    <div role="listitem" aria-label={vet.name} className={styles.column}>
      {columnAppointments(vet.id).map((appointment) => (
        <GridEvent key={appointment.id} appointment={appointment} />
      ))}
    </div>
  );
}
