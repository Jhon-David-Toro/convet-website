"use client";

import { useLayoutEffect, useState, type CSSProperties, type RefObject } from "react";

import { trackPosition } from "../Dropdown.utils";

/**
 * Returns `fixed` coordinates for a floating panel placed right below `anchor`. Being `fixed`, the panel is not
 * clipped by overflow containers (scrolling frames, a modal body, tables) and follows the
 * anchor on scroll or resize.
 *
 * @param anchor Element the panel is attached to.
 * @param open Whether the panel is visible; no listeners are attached while closed.
 * @param minWidth Minimum panel width in px, used when the anchor is narrower.
 * @returns The style to apply to the panel, or `undefined` while closed.
 */
export function useAnchoredPosition(anchor: RefObject<HTMLElement | null>, open: boolean, minWidth = 0): CSSProperties | undefined {
  const [style, setStyle] = useState<CSSProperties>();

  useLayoutEffect(() => (open && anchor.current ? trackPosition(anchor.current, minWidth, setStyle) : undefined), [anchor, open, minWidth]);

  return open ? style : undefined;
}
