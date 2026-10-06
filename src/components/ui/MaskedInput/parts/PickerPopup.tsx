import { DATE_MASK, MASK_CONFIG } from "../MaskedInput.constants";
import type { PickerPopupSwitchProps } from "../MaskedInput.types";
import { dateToValue, parseDate } from "../masks";
import { DatePickerPopup } from "./DatePickerPopup";
import { TimePickerPopup } from "./TimePickerPopup";

/**
 * The popup that matches the mask: a calendar for dates, a list of slots for times.
 *
 * @param props Props of the component, see {@link PickerPopupSwitchProps}.
 * @param props.mask Mask of the field: `"date"` or `"time"`.
 * @param props.popupId Id of the picker popup.
 * @param props.style Inline style, used to position the floating panel.
 * @param props.current Currently selected value.
 * @param props.slots Time slots, formatted as "9:45 AM".
 * @param props.activeIndex Index of the highlighted option, or -1 when none.
 * @param props.onActiveIndexChange Called with the index to highlight.
 * @param props.onCommit Called with the value the user chose.
 * @param props.dateOptions Remaining properties, forwarded to the root element.
 * @returns The rendered element.
 */
export function PickerPopup({ mask, popupId, style, current, slots, activeIndex, onActiveIndexChange, onCommit, ...dateOptions }: PickerPopupSwitchProps) {
  const label = MASK_CONFIG[mask].pickerLabel;

  if (mask === DATE_MASK) {
    return <DatePickerPopup id={popupId} label={label} style={style} selected={parseDate(current)} {...dateOptions} onSelect={(date) => onCommit(dateToValue(date))} />;
  }

  return (
    <TimePickerPopup
      id={popupId}
      label={label}
      style={style}
      slots={slots}
      value={current}
      activeIndex={activeIndex}
      onActiveIndexChange={onActiveIndexChange}
      onSelect={onCommit}
    />
  );
}
