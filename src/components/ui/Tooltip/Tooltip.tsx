"use client";

import { cloneElement, useId } from "react";

import styles from "./Tooltip.module.scss";
import { useTooltip } from "./hooks/useTooltip";
import type { TooltipProps } from "./Tooltip.types";
import { TooltipContent } from "./TooltipContent";

/**
 * Shown on pointer or focus, can be dismissed with Escape and does not disappear while
 * the pointer is over it (WCAG 1.4.13). Client Component because of the visible state.
 *
 * @param props Props of the component, see {@link TooltipProps}.
 * @param props.content Short text; the tooltip does not support interactive content.
 * @param props.placement Where the tooltip appears: `"top"` or `"bottom"`.
 * @param props.children The element that triggers it. Receives `aria-describedby` automatically.
 * @returns The rendered element.
 */
export function Tooltip({ content, placement = "top", children }: TooltipProps) {
  const id = useId();
  const { visible, handlers } = useTooltip();

  return (
    <span className={styles.wrapper} {...handlers}>
      {cloneElement(children, { "aria-describedby": id })}
      {visible && (
        <TooltipContent id={id} placement={placement} className={styles.floating}>
          {content}
        </TooltipContent>
      )}
    </span>
  );
}
