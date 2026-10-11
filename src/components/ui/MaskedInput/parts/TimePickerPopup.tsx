import { Dropdown } from "@/components/ui/Dropdown";
import { MenuItem } from "@/components/ui/MenuItem";
import { cx } from "@/lib/shared/cx";

import type { TimePickerPopupProps } from "../MaskedInput.types";
import styles from "../MaskedInput.module.scss";

/**
 * Floating list of time slots of a time `MaskedInput`. Focus stays in the text field.
 *
 * @param props Props of the component, see {@link TimePickerPopupProps}.
 * @param props.id Element id.
 * @param props.label Visible text. For icons it becomes the accessible name.
 * @param props.style Inline style, used to position the floating panel.
 * @param props.slots Time slots, formatted as "9:45 AM".
 * @param props.value Currently selected time, formatted as "9:45 AM".
 * @param props.activeIndex Index of the highlighted option, or -1 when none.
 * @param props.onActiveIndexChange Called with the index to highlight.
 * @param props.onSelect Called with the chosen day.
 * @returns The rendered element.
 */
export function TimePickerPopup({ id, label, style, slots, value, activeIndex, onActiveIndexChange, onSelect }: TimePickerPopupProps) {
  return (
    <Dropdown id={id} role="listbox" aria-label={label} className={cx(styles.popup, styles.timePopup)} style={style}>
      {slots.map((slot, index) => (
        <MenuItem
          key={slot}
          id={`${id}-${index}`}
          role="option"
          aria-selected={slot === value}
          data-active={index === activeIndex}
          selected={slot === value}
          onMouseDown={(event) => event.preventDefault()}
          onMouseEnter={() => onActiveIndexChange(index)}
          onClick={() => onSelect(slot)}
        >
          {slot}
        </MenuItem>
      ))}
    </Dropdown>
  );
}
