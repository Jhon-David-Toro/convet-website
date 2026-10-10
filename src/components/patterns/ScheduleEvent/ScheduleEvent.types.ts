import type { LucideIcon } from "lucide-react";
import type { ComponentPropsWithRef } from "react";

import type { BadgeTone } from "@/components/ui/Badge";

export type ScheduleStatus = "scheduled" | "new-online" | "arrived" | "in-progress" | "completed" | "no-show";

export type ScheduleEventProps = Omit<ComponentPropsWithRef<"article">, "title"> & {
  status: ScheduleStatus;
  species: "dog" | "cat";
  title: string;
  meta: string;
  alert?: string;
  statusLabel?: string;
};

export type ScheduleStatusView = {
  tone: BadgeTone;
  icon: LucideIcon;
  label: string;
  classKey: "scheduled" | "newOnline" | "arrived" | "inProgress" | "completed" | "noShow";
};

export type EventHeaderProps = Pick<ScheduleEventProps, "species" | "title">;

export type EventFooterProps = Pick<ScheduleEventProps, "status" | "statusLabel" | "alert"> & {
  view: ScheduleStatusView;
};
