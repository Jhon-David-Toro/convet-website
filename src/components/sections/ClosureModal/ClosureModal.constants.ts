import type { ClosureValues } from "./ClosureModal.types";

export const MODAL_TITLE = "Add closure";

export const MODAL_DESCRIPTION = "Closes the whole location; no slots are offered that day.";

export const MODAL_WIDTH = "35rem";

export const INITIAL_CLOSURE: ClosureValues = { date: "12 / 25 / 2026", reason: "" };

export const SUBMIT_LABEL = "Save closure";

export const SAVED_MESSAGE = "Closure saved. No slots are offered that day.";

export const DATE_ERROR = "Enter the day, like 12 / 25 / 2026.";

export const REASON_ERROR = "Write the reason clients will see.";

export const REASON_HELPER = "Shown to clients on the booking calendar.";

export const REASON_PLACEHOLDER = "Christmas Day — emergency line 593-0404 stays open";

export const UNAFFECTED_TITLE = "No appointments affected";

export const CLOSURE_FORMAT = new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", year: "numeric" });

export const LONG_FORMAT = new Intl.DateTimeFormat("en-US", { weekday: "short", month: "short", day: "numeric", year: "numeric" });
