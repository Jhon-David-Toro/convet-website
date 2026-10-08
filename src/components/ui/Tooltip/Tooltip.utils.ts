import type { KeyboardEvent } from "react";

import { KEYS } from "@/lib/keys.constants";

import type { TooltipPatch, TooltipState } from "./Tooltip.types";

/**
 * The tooltip shows while hovered or focused, unless it was dismissed.
 *
 * @param params Options, see {@link TooltipState}.
 * @param params.hovered Whether the pointer is over the tooltip trigger.
 * @param params.focused Whether the trigger has focus.
 * @param params.dismissed Dismissed with Escape until the pointer or focus leaves.
 * @returns `true` when the tooltip must be shown.
 */
export const isTooltipVisible = ({ hovered, focused, dismissed }: TooltipState): boolean => (hovered || focused) && !dismissed;

/**
 * Pointer and focus handlers of the wrapper; leaving also clears a dismissal so the tooltip can come back.
 *
 * @param patch Merges a partial change into the state.
 * @returns The pointer and focus handlers to spread on the wrapper.
 */
export const createTooltipHandlers = (patch: TooltipPatch) => ({
  onPointerEnter: () => patch({ hovered: true }),
  onPointerLeave: () => patch({ hovered: false, dismissed: false }),
  onFocus: () => patch({ focused: true }),
  onBlur: () => patch({ focused: false, dismissed: false }),
});

/**
 * Escape dismisses a visible tooltip without closing anything else (e.g. a modal around it).
 *
 * @param event Keyboard event, or the subset of it that matters.
 * @param visible Whether the tooltip is currently visible.
 * @param patch Merges a partial change into the state.
 */
export function dismissOnEscape(event: KeyboardEvent, visible: boolean, patch: TooltipPatch): void {
  if (event.key !== KEYS.escape || !visible) return;
  event.stopPropagation();
  patch({ dismissed: true });
}
