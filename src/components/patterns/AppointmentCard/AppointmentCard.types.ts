import type { LucideIcon } from "lucide-react";
import type { ComponentPropsWithRef } from "react";

import type { BadgeTone } from "@/components/ui/Badge";

export type AppointmentStatus = "upcoming" | "today" | "completed" | "cancelled";

export type AppointmentCardProps = Omit<ComponentPropsWithRef<"article">, "title"> & {
  status: AppointmentStatus;
  month: string;
  day: string;
  weekday: string;
  service: string;
  time: string;
  pet: string;
  vet: string;
  location: string;
  primaryHref: string;
  secondaryHref?: string;
  statusLabel?: string;
};

export type AppointmentStatusView = {
  tone: BadgeTone;
  icon: LucideIcon;
  label: string;
  primary: string;
  trailing?: LucideIcon;
};

export type AppointmentDateProps = Pick<AppointmentCardProps, "month" | "day" | "weekday">;

export type AppointmentMetaItem = {
  icon: LucideIcon;
  text: string;
};

export type AppointmentMetaProps = {
  items: AppointmentMetaItem[];
};

export type AppointmentActionsProps = Pick<AppointmentCardProps, "status" | "primaryHref" | "secondaryHref"> & {
  view: AppointmentStatusView;
};

export type AppointmentHeadingProps = Pick<AppointmentCardProps, "service" | "status" | "statusLabel"> & {
  view: AppointmentStatusView;
};
