import { Calendar as CalendarIcon, Clock } from "@/components/ui/Icon";

import { formatDate, formatTime } from "./masks";

export const DATE_POPUP_MIN_WIDTH = 320;

export const MASK_CONFIG = {
  date: { icon: CalendarIcon, placeholder: "MM / DD / YYYY", inputMode: "numeric", maxLength: 14, format: (raw: string) => formatDate(raw), pickerLabel: "Choose date", popupRole: "dialog", popupMinWidth: DATE_POPUP_MIN_WIDTH },
  time: { icon: Clock, placeholder: "h:mm AM", inputMode: "text", maxLength: 8, format: formatTime, pickerLabel: "Choose time", popupRole: "listbox", popupMinWidth: 0 },
} as const;

export const NO_ACTIVE_SLOT = -1;

export const TIME_MASK = "time";

export const DATE_MASK = "date";
