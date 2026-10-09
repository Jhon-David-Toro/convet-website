import type { LucideIcon } from "lucide-react";
import type { ComponentPropsWithRef } from "react";

import type { BadgeTone } from "@/components/ui/Badge";

/** Schedule status: `scheduled`, `new-online`, `arrived`, `in-progress`, `completed`, `no-show`. */
export type ScheduleStatus = "scheduled" | "new-online" | "arrived" | "in-progress" | "completed" | "no-show";

/** Props of the `ScheduleEvent` component. */
export type ScheduleEventProps = Omit<ComponentPropsWithRef<"article">, "title"> & {
  /** Status that decides the colors, label and actions. */
  status: ScheduleStatus;
  /** Species of the patient or the service (dog, cat…). */
  species: "dog" | "cat";
  /** Patient and reason, e.g. "Luna · Vaccination". */
  title: string;
  /** Time range and owner, e.g. "10:15 – 10:30 · Anna Lee". */
  meta: string;
  /** Short medical alert, e.g. "Penicillin". */
  alert?: string;
  /** Overrides the default label of the status. */
  statusLabel?: string;
};

/** How a schedule status is presented: badge, default label and stylesheet class key. */
export type ScheduleStatusView = {
  /** Color tone. */
  tone: BadgeTone;
  /** Icon component to draw. */
  icon: LucideIcon;
  /** Visible text. For icons it becomes the accessible name. */
  label: string;
  /** Key of the status modifier class in the component stylesheet. */
  classKey: "scheduled" | "newOnline" | "arrived" | "inProgress" | "completed" | "noShow";
};

/** Props of the title row (species icon and title). */
export type EventHeaderProps = Pick<ScheduleEventProps, "species" | "title">;

/** Props of the bottom row (status badge and medical alert). */
export type EventFooterProps = Pick<ScheduleEventProps, "status" | "statusLabel" | "alert"> & {
  /** How the status is presented. */
  view: ScheduleStatusView;
};
