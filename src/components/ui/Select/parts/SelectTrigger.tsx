import { cx } from "@/lib/shared/cx";

import styles from "../Select.module.scss";
import type { SelectTriggerProps } from "../Select.types";
import { getActiveDescendant } from "../Select.utils";

/**
 * Button of the select-only combobox: shows the selected label (or the placeholder) and opens the list.
 *
 * @param props Props of the component, see {@link SelectTriggerProps}.
 * @param props.field Id, validity and description of the field.
 * @param props.listboxId Id of the list of options.
 * @param props.open Whether the popup or menu is open.
 * @param props.activeIndex Index of the highlighted option, or -1 when none.
 * @param props.selectedLabel Text of the selected option, if any.
 * @param props.placeholder Text shown while there is no value.
 * @param props.onToggle Called to open or close the popup.
 * @param props.onBlur Called when the element loses focus.
 * @param props.onKeyDown Called on key down; the component's own key handling runs after it unless the event is default-prevented.
 * @param props.rest Remaining properties, forwarded to the root element.
 * @returns The rendered element.
 */
export function SelectTrigger({ field, listboxId, open, activeIndex, selectedLabel, placeholder, onToggle, onBlur, onKeyDown, ...rest }: SelectTriggerProps) {
  return (
    <button
      {...rest}
      id={field.id}
      type="button"
      role="combobox"
      aria-haspopup="listbox"
      aria-expanded={open}
      aria-controls={listboxId}
      aria-activedescendant={getActiveDescendant(listboxId, open, activeIndex)}
      aria-invalid={field.invalid || undefined}
      aria-describedby={field.describedBy}
      className={cx(styles.button, selectedLabel === undefined && styles.placeholder)}
      onClick={onToggle}
      onBlur={onBlur}
      onKeyDown={onKeyDown}
    >
      <span className={styles.value}>{selectedLabel ?? placeholder}</span>
    </button>
  );
}
