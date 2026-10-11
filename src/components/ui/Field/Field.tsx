import { cx } from "@/lib/shared/cx";

import type { FieldProps } from "./Field.types";
import { FieldHint } from "./parts/FieldHint";
import { FieldLabel } from "./parts/FieldLabel";
import styles from "./Field.module.scss";

/**
 * Label, control and helper / error message of a form field.
 *
 * @param props Props of the component, see {@link FieldProps}.
 * @param props.id Control id: the label points to it and the message hangs from `${id}-message`.
 * @param props.label Visible text. For icons it becomes the accessible name.
 * @param props.optional Shows "(optional)" next to the label.
 * @param props.helper Helper text below the control.
 * @param props.error Error message: replaces the helper and marks the control as invalid.
 * @param props.disabled Whether the control is disabled.
 * @param props.showLabel `false` hides the label visually but keeps it for assistive technology.
 * @param props.className Extra class name for the root element.
 * @param props.children Content of the element.
 * @returns The rendered element.
 */
export function Field({ id, label, optional, helper, error, disabled, showLabel, className, children }: FieldProps) {
  const message = error ?? helper;

  return (
    <div className={cx(styles.field, className)}>
      <FieldLabel id={id} label={label} optional={optional} disabled={disabled} showLabel={showLabel} />
      {children}
      {message && <FieldHint id={id} message={message} isError={Boolean(error)} />}
    </div>
  );
}
