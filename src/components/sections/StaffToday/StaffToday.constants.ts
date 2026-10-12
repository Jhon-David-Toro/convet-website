export const GRID_START_MINUTES = 480;

export const GRID_END_MINUTES = 720;

export const GRID_STEP_MINUTES = 30;

export const ROW_HEIGHT = 100;

export const EVENT_GAP = 2;

export const NOW_MINUTES = 580;

export const NOW_LABEL = "9:40";

export const WEEK_VIEW_LABEL = "Week view";

export const WEEK_VIEW_HREF = "/staff/schedule";

export const SUBTITLE = "11 appointments · 3 booked online since yesterday";

export const ATTENTION_TITLE = "Needs attention";

export const GRID_LABEL = "Schedule of the day by vet";

export const AGENDA_FILTER_LABEL = "Filter the agenda";

export const AGENDA_FILTERS = [
  { value: "mine", label: "My patients" },
  { value: "all", label: "All vets" },
] as const;

export const AGENDA_HEADINGS = { now: "Now", next: "Next", earlier: "Earlier" };

export const NOW_STATUSES = ["in-progress", "arrived"];

export const EARLIER_STATUSES = ["completed", "no-show"];

export const VET_PHOTO_SIZE = 32;
