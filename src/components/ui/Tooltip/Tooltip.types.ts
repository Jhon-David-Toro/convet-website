import type { ComponentPropsWithRef, ReactElement } from "react";

export type TooltipPlacement = "top" | "bottom";

export type TooltipContentProps = ComponentPropsWithRef<"span"> & {
  placement?: TooltipPlacement;
};

export type TooltipProps = {
  content: string;
  placement?: TooltipPlacement;
  children: ReactElement<{ "aria-describedby"?: string }>;
};

export type TooltipState = {
  hovered: boolean;
  focused: boolean;
  dismissed: boolean;
};

export type TooltipPatch = (changes: Partial<TooltipState>) => void;
