import { Dropdown } from "@/components/ui/Dropdown";
import { MenuItem } from "@/components/ui/MenuItem";

import type { SelectListboxProps } from "../Select.types";
import styles from "../Select.module.scss";

/**
 * Open list of options of a `Select`.
 *
 * Focus stays on the trigger button, so the active option is exposed through ids that
 * the trigger references with `aria-activedescendant`.
 *
 * @param props Props of the component, see {@link SelectListboxProps}.
 * @param props.id Element id; option ids are derived from it as `${id}-${index}`.
 * @param props.labelledBy Id of the element that labels the list.
 * @param props.options Options of the list.
 * @param props.value Value of the selected option.
 * @param props.activeIndex Index of the option highlighted by the keyboard or the pointer.
 * @param props.style Inline style, used to position the floating panel.
 * @param props.onActiveIndexChange Called with the index to highlight.
 * @param props.onChoose Called with the day chosen by the user.
 * @returns The rendered element.
 */
export function SelectListbox({ id, labelledBy, options, value, activeIndex, style, onActiveIndexChange, onChoose }: SelectListboxProps) {
  return (
    <Dropdown id={id} role="listbox" aria-labelledby={labelledBy} className={styles.listbox} style={style}>
      {options.map((option, index) => (
        <MenuItem
          key={option.value}
          id={`${id}-${index}`}
          role="option"
          aria-selected={option.value === value}
          aria-disabled={option.disabled || undefined}
          data-active={index === activeIndex}
          selected={option.value === value}
          // Keep focus on the trigger: a click must not move it and fire onBlur
          onMouseDown={(event) => event.preventDefault()}
          onMouseEnter={() => !option.disabled && onActiveIndexChange(index)}
          onClick={() => onChoose(index)}
        >
          {option.label}
        </MenuItem>
      ))}
    </Dropdown>
  );
}
