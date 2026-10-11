import type { BookingSlot, BookingVet } from "@/lib/booking.types";

export type DateTimePickerProps = {
  vet: BookingVet;
  date: string;
  time: string;
  loading: boolean;
  onDateChange: (iso: string) => void;
  onTimeChange: (time: string) => void;
  onChangeVet?: () => void;
  onAnyVet?: () => void;
};

export type VetBannerProps = Pick<DateTimePickerProps, "vet" | "onChangeVet">;

export type SlotsPanelProps = Pick<DateTimePickerProps, "vet" | "date" | "time" | "loading" | "onDateChange" | "onTimeChange" | "onAnyVet">;

export type SlotGridProps = {
  date: string;
  vet: BookingVet;
  slots: BookingSlot[];
  time: string;
  onTimeChange: (time: string) => void;
};

export type NoAvailabilityProps = Pick<SlotsPanelProps, "vet" | "date" | "onDateChange" | "onAnyVet">;

export type SlotsLoadingProps = {
  date: string;
};

export type NoAvailabilityActionsProps = Pick<NoAvailabilityProps, "onDateChange" | "onAnyVet"> & {
  next?: string;
};
