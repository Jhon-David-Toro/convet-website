import type { ReactNode } from "react";

export type BookingFrameProps = {
  steps: string[];
  current: number;
  mobileTitle: string;
  exitHref: string;
  onBack?: () => void;
  side?: ReactNode;
  footer?: ReactNode;
  bar?: ReactNode;
  children: ReactNode;
};

export type BookingStepperProps = Pick<BookingFrameProps, "steps" | "current">;

export type BookingHeaderProps = Pick<BookingFrameProps, "steps" | "current" | "exitHref">;

export type MobileHeaderProps = Pick<BookingFrameProps, "mobileTitle" | "exitHref" | "onBack">;

export type MobileProgressProps = Pick<BookingFrameProps, "steps" | "current">;

export type BookingBodyProps = Pick<BookingFrameProps, "side" | "footer" | "children">;
