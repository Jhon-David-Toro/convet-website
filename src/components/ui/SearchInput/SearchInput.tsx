import { Field, useField } from "@/components/ui/Field";
import { Icon, Search } from "@/components/ui/Icon";
import { cx } from "@/lib/cx";

import styles from "./SearchInput.module.scss";
import type { SearchInputProps } from "./SearchInput.types";

/**
 * Search field with a magnifier icon and an optional keyboard shortcut hint.
 *
 * @param props Props of the component, see {@link SearchInputProps}.
 * @param props.id Element id.
 * @param props.label Accessible name. Visually hidden by default (as in Figma).
 * @param props.showLabel Whether the label is visible; when `false` it stays available to assistive technology.
 * @param props.optional Shows "(optional)" next to the label.
 * @param props.helper Helper text below the control.
 * @param props.error Error message: replaces the helper and marks the control as invalid.
 * @param props.shortcut Keyboard shortcut shown as a hint, e.g. "Ctrl K".
 * @param props.disabled Whether the control is disabled.
 * @param props.className Extra class name for the root element.
 * @param props.rest Remaining properties, forwarded to the root element.
 * @returns The rendered element.
 */
export function SearchInput({
  id: idProp,
  label,
  showLabel = false,
  optional,
  helper,
  error,
  shortcut,
  disabled,
  className,
  ...rest
}: SearchInputProps) {
  const field = useField(idProp, { helper, error });

  return (
    <Field
      id={field.id}
      label={label}
      showLabel={showLabel}
      optional={optional}
      helper={helper}
      error={error}
      disabled={disabled}
      className={className}
    >
      <span className={styles.control}>
        <Icon icon={Search} className={styles.icon} />
        <input
          {...rest}
          id={field.id}
          type="search"
          disabled={disabled}
          className={cx(styles.input, shortcut && styles.withShortcut)}
          aria-invalid={field.invalid || undefined}
          aria-describedby={field.describedBy}
          aria-keyshortcuts={shortcut}
        />
        {shortcut && <kbd className={styles.shortcut}>{shortcut}</kbd>}
      </span>
    </Field>
  );
}
