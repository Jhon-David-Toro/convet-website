import type { LucideIcon } from "lucide-react";
import type { ComponentPropsWithRef } from "react";

/** A detail row of the booking summary: main text and its detail. */
export type SummaryRow = {
  /** Main text, e.g. "Vaccinations". */
  title: string;
  /** Detail, e.g. "Rabies booster". */
  detail: string;
};

/** Props of the `BookingSummary` component. */
export type BookingSummaryProps = Omit<ComponentPropsWithRef<"section">, "title"> & {
  /** Small heading, e.g. "Your visit". */
  eyebrow: string;
  /** Date, e.g. "Wed, Oct 7". */
  date: string;
  /** Time and duration, e.g. "9:45 AM · 15 min". */
  time: string;
  /** Service name or summary row. */
  service: SummaryRow;
  /** Pet name or summary row. */
  pet: SummaryRow;
  /** Veterinarian name or summary row. */
  vet: SummaryRow;
  /** Place of the appointment. */
  location: SummaryRow;
};

/** Props of the ticket header. */
export type SummaryHeaderProps = Pick<BookingSummaryProps, "eyebrow" | "date" | "time">;

/** Props of one detail row. */
export type SummaryRowItemProps = SummaryRow & {
  /** Icon component to draw. */
  icon: LucideIcon;
};
