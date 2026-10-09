import type { LucideIcon } from "lucide-react";
import type { ComponentPropsWithRef } from "react";

import type { BadgeTone } from "@/components/ui/Badge";

/** Vaccine status: `up-to-date`, `due-soon`, `overdue`. */
export type VaccineStatus = "up-to-date" | "due-soon" | "overdue";

/** Props of the `VaccineRow` component. */
export type VaccineRowProps = Omit<ComponentPropsWithRef<"li">, "title"> & {
  /** Status that decides the colors, label and actions. */
  status: VaccineStatus;
  /** Name of the vaccine. */
  vaccine: string;
  /** Dates, e.g. "Given Oct 20, 2025 · Next Oct 20, 2026". */
  dates: string;
  /** Lot and expiry (optional), e.g. "Lot RB-24187 · exp Nov 30, 2026". */
  lot?: string;
  /** Overrides the default label of the status. */
  statusLabel?: string;
};

/** How a vaccine status is presented: badge tone, icon and default label. */
export type VaccineStatusView = {
  /** Color tone. */
  tone: BadgeTone;
  /** Icon component to draw. */
  icon: LucideIcon;
  /** Visible text. For icons it becomes the accessible name. */
  label: string;
};
