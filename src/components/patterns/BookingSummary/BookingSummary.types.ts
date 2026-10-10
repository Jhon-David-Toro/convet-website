import type { LucideIcon } from "lucide-react";
import type { ComponentPropsWithRef } from "react";

export type SummaryRow = {
  title: string;
  detail: string;
};

export type BookingSummaryProps = Omit<ComponentPropsWithRef<"section">, "title"> & {
  eyebrow: string;
  date: string;
  time: string;
  service: SummaryRow;
  pet: SummaryRow;
  vet: SummaryRow;
  location: SummaryRow;
};

export type SummaryHeaderProps = Pick<BookingSummaryProps, "eyebrow" | "date" | "time">;

export type SummaryRowItemProps = SummaryRow & {
  icon: LucideIcon;
};
