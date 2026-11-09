import { Icon } from "@/components/ui/Icon";
import { Field, useField } from "@/components/ui/Field";

import type { TextInputProps } from "./TextInput.types";
import styles from "./TextInput.module.scss";

/**
 * Single-line text field with label, helper and error message.
 *
 * @param props Props of the component, see {@link TextInputProps}.
 * @param props.id Element id.
 * @param props.label Visible text. For icons it becomes the accessible name.
 * @param props.optional Shows "(optional)" next to the label.
 * @param props.helper Helper text below the control.
 * @param props.error Error message: replaces the helper and marks the control as invalid.
 * @param props.type Variant of the element (button type or cell type).
 * @param props.trailingButton Optional button displayed at the trailing edge.
 * @param props.disabled Whether the control is disabled.
 * @param props.className Extra class name for the root element.
 * @param props.rest Remaining properties, forwarded to the root element.
 * @returns The rendered element.
 */
export function TextInput({
  id: idProp,
  label,
  optional,
  helper,
  error,
  type = "text",
  trailingButton,
  disabled,
  className,
  ...rest
}: TextInputProps) {
  const field = useField(idProp, { helper, error });

  return (
    <Field id={field.id} label={label} optional={optional} helper={helper} error={error} disabled={disabled} className={className}>
      <div className={styles.wrapper}>
        <input
          {...rest}
          id={field.id}
          type={type}
          disabled={disabled}
          className={styles.input}
          aria-invalid={field.invalid || undefined}
          aria-describedby={field.describedBy}
        />
        {trailingButton && (
          <button
            type="button"
            onClick={trailingButton.onClick}
            disabled={disabled}
            aria-label={trailingButton.label}
            className={styles.button}
          >
            <Icon icon={trailingButton.icon} size="small" />
          </button>
        )}
      </div>
    </Field>
  );
}
