import type { LucideIcon } from "lucide-react";

export type BookingVet = {
  id: string;
  name: string;
  role: string;
  license: string;
  weekdays: number[];
  startMinutes: number;
  endMinutes: number;
  schedule: string;
  nextLabel: string;
  unavailable?: boolean;
};

export type BookingService = {
  id: string;
  title: string;
  description: string;
  duration: number;
  icon: LucideIcon;
  unavailable?: boolean;
};

export type SlotState = "open" | "full" | "blocked";

export type BookingSlot = {
  time: string;
  left: number;
  state: SlotState;
};

export type DayAvailability = "open" | "full" | "off";

export type NextAvailable = {
  iso: string;
  time: string;
};
