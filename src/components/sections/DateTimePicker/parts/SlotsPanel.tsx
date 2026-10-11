import { slotsFor } from "@/lib/booking/booking.utils";

import type { SlotsPanelProps } from "../DateTimePicker.types";
import { NoAvailability } from "./NoAvailability";
import { SlotGrid } from "./SlotGrid";
import { SlotsLoading } from "./SlotsLoading";

/**
 * Column next to the calendar: a loading placeholder, the times of the day, or the "day is full" message.
 *
 * @param props Props of the component, see {@link SlotsPanelProps}.
 * @param props.vet Vet whose agenda is shown.
 * @param props.date Selected day.
 * @param props.time Selected time.
 * @param props.loading Whether the times are being looked up.
 * @param props.onDateChange Jumps to another day.
 * @param props.onTimeChange Called with the time the customer picked.
 * @param props.onAnyVet Switches to any available vet.
 * @returns The rendered element.
 */
export function SlotsPanel({ vet, date, time, loading, onDateChange, onTimeChange, onAnyVet }: SlotsPanelProps) {
  const slots = slotsFor(vet, date);
  if (loading) return <SlotsLoading date={date} />;
  if (slots.length === 0) return <NoAvailability vet={vet} date={date} onDateChange={onDateChange} onAnyVet={onAnyVet} />;
  return <SlotGrid date={date} vet={vet} slots={slots} time={time} onTimeChange={onTimeChange} />;
}
