import { Calendar } from "@/components/ui/Calendar";
import { Dropdown } from "@/components/ui/Dropdown";

import type { DatePickerPopupProps } from "../MaskedInput.types";
import styles from "../MaskedInput.module.scss";

/**
 * Floating calendar of a date `MaskedInput`.
 *
 * @param props Props of the component, see {@link DatePickerPopupProps}.
 * @param props.id Element id.
 * @param props.label Visible text. For icons it becomes the accessible name.
 * @param props.style Inline style, used to position the floating panel.
 * @param props.selected Currently selected date, or `null` when the value is empty or incomplete.
 * @param props.minDate Earlier days are disabled in the calendar.
 * @param props.maxDate Later days are disabled in the calendar.
 * @param props.today "Today", defaults to the current date.
 * @param props.onSelect Called with the chosen day.
 * @returns The rendered element.
 */
export function DatePickerPopup({ id, label, style, selected, minDate, maxDate, today, onSelect }: DatePickerPopupProps) {
  return (
    <Dropdown id={id} role="dialog" aria-label={label} padding="panel" className={styles.popup} style={style}>
      <Calendar autoFocus value={selected} minDate={minDate} maxDate={maxDate} today={today} onSelect={onSelect} />
    </Dropdown>
  );
}
