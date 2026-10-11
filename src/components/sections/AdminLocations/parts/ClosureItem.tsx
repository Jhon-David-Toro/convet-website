import { Calendar, Icon, Trash } from "@/components/ui/Icon";
import { IconButton } from "@/components/ui/IconButton";

import styles from "../AdminLocations.module.scss";
import type { ClosureItemProps } from "../AdminLocations.types";

/**
 * One upcoming closure: its date and reason, and the button that removes it.
 *
 * @param props Props of the component, see {@link ClosureItemProps}.
 * @param props.closure Closure to show.
 * @param props.onRemove Called with the id of the closure to remove.
 * @returns The rendered element.
 */
export function ClosureItem({ closure, onRemove }: ClosureItemProps) {
  return (
    <li className={styles.closure}>
      <Icon icon={Calendar} tone="tertiary" />
      <div className={styles.closureText}>
        <p className={styles.closureDate}>{closure.date}</p>
        <p className={styles.closureNote}>{closure.note}</p>
      </div>
      <IconButton variant="ghost" icon={Trash} label={`Remove closure ${closure.date}`} onClick={() => onRemove(closure.id)} />
    </li>
  );
}
