import styles from "../StaffToday.module.scss";
import type { GridColumnsProps } from "../StaffToday.types";
import { GridColumn } from "./GridColumn";

/**
 * Columns of the grid, one per vet.
 *
 * @param props Props of the component, see {@link GridColumnsProps}.
 * @param props.vets Vets of the clinic.
 * @returns The rendered element.
 */
export function GridColumns({ vets }: GridColumnsProps) {
  return (
    <div role="list" className={styles.columns}>
      {vets.map((vet) => (
        <GridColumn key={vet.id} vet={vet} />
      ))}
    </div>
  );
}
