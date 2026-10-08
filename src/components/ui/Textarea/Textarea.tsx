import { Field, useField } from "@/components/ui/Field";

import styles from "./Textarea.module.scss";
import type { TextareaProps } from "./Textarea.types";

/**
 * Multi-line text field with label, helper and error message.
 *
 * @param props Props of the component, see {@link TextareaProps}.
 * @param props.id Element id.
 * @param props.label Visible text. For icons it becomes the accessible name.
 * @param props.optional Shows "(optional)" next to the label.
 * @param props.helper Helper text below the control.
 * @param props.error Error message: replaces the helper and marks the control as invalid.
 * @param props.disabled Whether the control is disabled.
 * @param props.className Extra class name for the root element.
 * @param props.rest Remaining properties, forwarded to the root element.
 * @returns The rendered element.
 */
export function Textarea({ id: idProp, label, optional, helper, error, disabled, className, ...rest }: TextareaProps) {
  const field = useField(idProp, { helper, error });

  return (
    <Field id={field.id} label={label} optional={optional} helper={helper} error={error} disabled={disabled} className={className}>
      <textarea
        {...rest}
        id={field.id}
        disabled={disabled}
        className={styles.textarea}
        aria-invalid={field.invalid || undefined}
        aria-describedby={field.describedBy}
      />
    </Field>
  );
}
