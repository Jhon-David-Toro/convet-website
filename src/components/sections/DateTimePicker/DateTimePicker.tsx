"use client";

import { MonthCalendar } from "@/components/patterns/MonthCalendar";
import { BOOKING_MONTH, BOOKING_TODAY } from "@/lib/booking.constants";
import { calendarStates } from "@/lib/booking.utils";

import styles from "./DateTimePicker.module.scss";
import { SLOTS_NOTE } from "./DateTimePicker.constants";
import type { DateTimePickerProps } from "./DateTimePicker.types";
import { SlotsPanel } from "./parts/SlotsPanel";
import { VetBanner } from "./parts/VetBanner";

/**
 * Day and time picker of a booking: the vet banner, a month calendar with the days the vet works, and the times of the selected day.
 *
 * @param props Props of the component, see {@link DateTimePickerProps}.
 * @param props.vet Vet whose agenda is shown.
 * @param props.date Selected day, or an empty string.
 * @param props.time Selected time, or an empty string.
 * @param props.loading Whether the times of the day are being looked up.
 * @param props.onDateChange Called with the day the customer picked.
 * @param props.onTimeChange Called with the time the customer picked.
 * @param props.onChangeVet Goes back to choose another vet.
 * @param props.onAnyVet Switches to any available vet.
 * @returns The rendered element.
 */
export function DateTimePicker({ vet, date, time, loading, onDateChange, onTimeChange, onChangeVet, onAnyVet }: DateTimePickerProps) {
  return (
    <div className={styles.picker}>
      <VetBanner vet={vet} onChangeVet={onChangeVet} />
      <div className={styles.columns}>
        <MonthCalendar defaultMonth={BOOKING_MONTH} today={BOOKING_TODAY} selected={date} dayStates={calendarStates(vet)} onSelect={onDateChange} className={styles.calendar} />
        {date && <SlotsPanel vet={vet} date={date} time={time} loading={loading} onDateChange={onDateChange} onTimeChange={onTimeChange} onAnyVet={onAnyVet} />}
      </div>
      <p className={styles.note}>{SLOTS_NOTE}</p>
    </div>
  );
}
