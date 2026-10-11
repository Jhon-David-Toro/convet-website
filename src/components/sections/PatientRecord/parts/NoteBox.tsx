import { Eye, Icon, Lock } from "@/components/ui/Icon";
import { cx } from "@/lib/shared/cx";

import styles from "../PatientRecord.module.scss";
import type { NoteBoxProps } from "../PatientRecord.types";

/**
 * Note under a visit: the internal one (staff only) or the summary shared with the owner.
 *
 * @param props Props of the component, see {@link NoteBoxProps}.
 * @param props.tone Whether the note is internal or shared.
 * @param props.title Title of the note.
 * @param props.text Text of the note.
 * @returns The rendered element.
 */
export function NoteBox({ tone, title, text }: NoteBoxProps) {
  return (
    <div className={cx(styles.note, styles[tone])}>
      <p className={styles.noteTitle}>
        <Icon icon={tone === "internal" ? Lock : Eye} size="small" />
        {title}
      </p>
      <p className={styles.noteText}>{text}</p>
    </div>
  );
}
