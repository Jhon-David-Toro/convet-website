import { cx } from "@/lib/cx";

import styles from "../Field.module.scss";
import type { FieldLabelProps } from "../Field.types";

/**
 * Label of the control; hidden visually (but kept for assistive technology) when `showLabel` is false.
 *
 * @param props Props of the component, see {@link FieldLabelProps}.
 * @param props.id Control id: the label points to it and the message hangs from `${id}-message`.
 * @param props.label Visible text. For icons it becomes the accessible name.
 * @param props.optional Shows "(optional)" next to the label.
 * @param props.disabled Whether the control is disabled.
 * @param props.showLabel `false` hides the label visually but keeps it for assistive technology.
 * @returns The rendered element.
 */
export function FieldLabel({ id, label, optional, disabled, showLabel = true }: FieldLabelProps) {
  return (
    <label id={`${id}-label`} htmlFor={id} className={cx(styles.label, disabled && styles.disabled, !showLabel && styles.hidden)}>
      <span>{label}</span>
      {optional && <span className={styles.optional}>(optional)</span>}
    </label>
  );
}
