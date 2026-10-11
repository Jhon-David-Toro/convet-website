import styles from "../AdminLocations.module.scss";
import type { ClosureListProps } from "../AdminLocations.types";
import { ClosureItem } from "./ClosureItem";

/**
 * List of the upcoming closures of the clinic.
 *
 * @param props Props of the component, see {@link ClosureListProps}.
 * @param props.closures Closures to list.
 * @param props.onRemove Called with the id of the closure to remove.
 * @returns The rendered element.
 */
export function ClosureList({ closures, onRemove }: ClosureListProps) {
  return (
    <ul className={styles.closures}>
      {closures.map((closure) => (
        <ClosureItem key={closure.id} closure={closure} onRemove={onRemove} />
      ))}
    </ul>
  );
}
