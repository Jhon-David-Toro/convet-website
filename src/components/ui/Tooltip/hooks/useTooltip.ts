import { useState, type KeyboardEvent } from "react";

import { TOOLTIP_IDLE_STATE } from "../Tooltip.constants";
import type { TooltipState } from "../Tooltip.types";
import { createTooltipHandlers, dismissOnEscape, isTooltipVisible } from "../Tooltip.utils";

/**
 * Visibility of a tooltip and the handlers that drive it (pointer, focus and Escape).
 *
 * @returns Object with `visible` and the `handlers` to spread on the wrapper element.
 */
export function useTooltip() {
  const [state, setState] = useState(TOOLTIP_IDLE_STATE);
  /**
   * Merges a partial change into the tooltip state.
   *
   * @param changes Fields to change.
   */
  const patch = (changes: Partial<TooltipState>) => setState((current) => ({ ...current, ...changes }));
  const visible = isTooltipVisible(state);

  return {
    visible,
    handlers: { ...createTooltipHandlers(patch), onKeyDown: (event: KeyboardEvent) => dismissOnEscape(event, visible, patch) },
  };
}
