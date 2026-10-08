import type { ComponentPropsWithRef, ReactElement } from "react";

/** Tooltip placement: `top`, `bottom`. */
export type TooltipPlacement = "top" | "bottom";

/** Props of the `TooltipContent` component. */
export type TooltipContentProps = ComponentPropsWithRef<"span"> & {
  /** Where the tooltip appears: `"top"` or `"bottom"`. */
  placement?: TooltipPlacement;
};

/** Props of the `Tooltip` component. */
export type TooltipProps = {
  /** Short text; the tooltip does not support interactive content. */
  content: string;
  /** Where the tooltip appears: `"top"` or `"bottom"`. */
  placement?: TooltipPlacement;
  /** The element that triggers it. Receives `aria-describedby` automatically. */
  children: ReactElement<{ "aria-describedby"?: string }>;
};

/** Which interactions currently ask for the tooltip. */
export type TooltipState = {
  /** Whether the pointer is over the tooltip trigger. */
  hovered: boolean;
  /** Whether the trigger has focus. */
  focused: boolean;
  /** Dismissed with Escape until the pointer or focus leaves. */
  dismissed: boolean;
};

/** Merges a partial change into the tooltip state. */
export type TooltipPatch = (changes: Partial<TooltipState>) => void;
