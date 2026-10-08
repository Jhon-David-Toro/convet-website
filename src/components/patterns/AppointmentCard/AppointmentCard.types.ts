import type { LucideIcon } from "lucide-react";
import type { ComponentPropsWithRef } from "react";

import type { BadgeTone } from "@/components/ui/Badge";

/** Appointment status: `upcoming`, `today`, `completed`, `cancelled`. */
export type AppointmentStatus = "upcoming" | "today" | "completed" | "cancelled";

/** Props of the `AppointmentCard` component. */
export type AppointmentCardProps = Omit<ComponentPropsWithRef<"article">, "title"> & {
  /** Status that decides the colors, label and actions. */
  status: AppointmentStatus;
  /** Abbreviated month in uppercase, e.g. "OCT". */
  month: string;
  /** Day of the month. */
  day: string;
  /** Abbreviated weekday, e.g. "Wed". */
  weekday: string;
  /** Service name or summary row. */
  service: string;
  /** Time and duration, e.g. "9:45 AM · 15 min". */
  time: string;
  /** Pet name or summary row. */
  pet: string;
  /** Veterinarian name or summary row. */
  vet: string;
  /** Place of the appointment. */
  location: string;
  /** Link of the primary action. */
  primaryHref: string;
  /** Only for upcoming or same-day appointments (Cancel). */
  secondaryHref?: string;
  /** Overrides the status label ("Scheduled", "Today"…). */
  statusLabel?: string;
};

/** How an appointment status is presented: badge, default label and primary action. */
export type AppointmentStatusView = {
  /** Color tone. */
  tone: BadgeTone;
  /** Icon component to draw. */
  icon: LucideIcon;
  /** Visible text. For icons it becomes the accessible name. */
  label: string;
  /** Label of the primary action button. */
  primary: string;
  /** Icon shown after the primary action label. */
  trailing?: LucideIcon;
};

/** Props of the date block. */
export type AppointmentDateProps = Pick<AppointmentCardProps, "month" | "day" | "weekday">;

/** One line of the meta list. */
export type AppointmentMetaItem = {
  /** Icon component to draw. */
  icon: LucideIcon;
  /** Text to show. */
  text: string;
};

/** Props of the meta list (time, pet, vet, location). */
export type AppointmentMetaProps = {
  /** Items to render. */
  items: AppointmentMetaItem[];
};

/** Props of the action buttons. */
export type AppointmentActionsProps = Pick<AppointmentCardProps, "status" | "primaryHref" | "secondaryHref"> & {
  /** How the status is presented. */
  view: AppointmentStatusView;
};

/** Props of the heading (service and status badge). */
export type AppointmentHeadingProps = Pick<AppointmentCardProps, "service" | "status" | "statusLabel"> & {
  /** How the status is presented. */
  view: AppointmentStatusView;
};
