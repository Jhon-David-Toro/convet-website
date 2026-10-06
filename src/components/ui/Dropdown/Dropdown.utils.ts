import type { CSSProperties } from "react";

import { POPUP_GAP, POPUP_VIEWPORT_MARGIN } from "./Dropdown.constants";

/**
 * `fixed` coordinates of a panel right below `anchor`, kept inside the viewport and at least `minWidth` wide.
 *
 * @param anchor Element the panel is attached to.
 * @param minWidth Minimum width in px of the panel.
 * @returns The `fixed` positioning style of the panel.
 */
export function computePosition(anchor: HTMLElement, minWidth: number): CSSProperties {
  const rect = anchor.getBoundingClientRect();
  const width = Math.max(rect.width, minWidth);
  const left = Math.min(rect.left, window.innerWidth - width - POPUP_VIEWPORT_MARGIN);
  return { position: "fixed", top: rect.bottom + POPUP_GAP, left: Math.max(left, POPUP_VIEWPORT_MARGIN), width };
}

/**
 * Reports the panel position now and again on every resize and scroll.
 *
 * @param anchor Element the panel is attached to.
 * @param minWidth Minimum width in px of the panel.
 * @param onChange Called with the new style whenever the position changes.
 * @returns The cleanup that stops listening.
 */
export function trackPosition(anchor: HTMLElement, minWidth: number, onChange: (style: CSSProperties) => void): () => void {
  /**
   * Recomputes the panel position and reports it.
   */
  const update = () => onChange(computePosition(anchor, minWidth));

  update();
  window.addEventListener("resize", update);
  window.addEventListener("scroll", update, true);
  return () => {
    window.removeEventListener("resize", update);
    window.removeEventListener("scroll", update, true);
  };
}
