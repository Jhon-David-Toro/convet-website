import { Calendar as CalendarIcon, Clock } from "@/components/ui/Icon";

import { formatDate, formatTime } from "./masks";

/** Minimum width in px of the date popup: 7 days of 40px plus 16px padding on each side. */
export const DATE_POPUP_MIN_WIDTH = 320;

/** Input behaviour and picker trigger settings for each mask. */
export const MASK_CONFIG = {
  date: { icon: CalendarIcon, placeholder: "MM / DD / YYYY", inputMode: "numeric", maxLength: 14, format: (raw: string) => formatDate(raw), pickerLabel: "Choose date", popupRole: "dialog", popupMinWidth: DATE_POPUP_MIN_WIDTH },
  time: { icon: Clock, placeholder: "h:mm AM", inputMode: "text", maxLength: 8, format: formatTime, pickerLabel: "Choose time", popupRole: "listbox", popupMinWidth: 0 },
} as const;

/** Index of the "no time slot highlighted" state. */
export const NO_ACTIVE_SLOT = -1;

/** Mask for times ("h:mm AM"). */
export const TIME_MASK = "time";

/** Mask for dates ("MM / DD / YYYY"). */
export const DATE_MASK = "date";
