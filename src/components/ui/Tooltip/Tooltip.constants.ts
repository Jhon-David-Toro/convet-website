import type { TooltipState } from "./Tooltip.types";

/** Tooltip state before any interaction. */
export const TOOLTIP_IDLE_STATE: TooltipState = { hovered: false, focused: false, dismissed: false };
