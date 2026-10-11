import { Icon, Lock } from "@/components/ui/Icon";

import type { LotNoteProps } from "../VisitRecord.types";
import styles from "../VisitRecord.module.scss";

/**
 * Small note with a lock under the lot field: why a lot cannot be picked.
 *
 * @param props Props of the component, see {@link LotNoteProps}.
 * @param props.text Text of the note.
 * @returns The rendered element.
 */
export function LotNote({ text }: LotNoteProps) {
  return (
    <p className={styles.lotNote}>
      <Icon icon={Lock} size="small" tone="tertiary" />
      {text}
    </p>
  );
}
