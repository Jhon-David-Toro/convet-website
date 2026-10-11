"use client";

import { useState } from "react";

import { STAFF_VETS } from "@/lib/staff/staff.constants";

import type { AgendaFilter } from "./StaffToday.types";
import { Agenda } from "./parts/Agenda";
import { AttentionPanel } from "./parts/AttentionPanel";
import { ScheduleGrid } from "./parts/ScheduleGrid";
import { TodayHeader } from "./parts/TodayHeader";
import { TodayStats } from "./parts/TodayStats";
import styles from "./StaffToday.module.scss";

/**
 * Today page of the staff area. Desktop: the day's figures, the schedule by vet and what needs attention.
 * Below desktop: the agenda of the day as a list.
 *
 * @returns The rendered element.
 */
export function StaffToday() {
  const [filter, setFilter] = useState<AgendaFilter>("mine");

  return (
    <div className={styles.page}>
      <TodayHeader />
      <TodayStats />
      <div className={styles.layout}>
        <ScheduleGrid vets={STAFF_VETS} />
        <AttentionPanel />
      </div>
      <Agenda filter={filter} onFilter={setFilter} />
    </div>
  );
}
