"use client";

import { eventsOf, weightsOf } from "@/lib/customer/customer.utils";

import { useHistoryFilter } from "../hooks/useHistoryFilter";
import styles from "../PetProfile.module.scss";
import type { HistoryTabProps } from "../PetProfile.types";
import { filterEvents } from "../PetProfile.utils";
import { HistoryFilters } from "./HistoryFilters";
import { HistoryInfo } from "./HistoryInfo";
import { HistoryTimeline } from "./HistoryTimeline";
import { WeightCard } from "./WeightCard";

/**
 * History tab: the filterable timeline of the pet and, on desktop, its weight and an explanation at the side.
 *
 * @param props Props of the component, see {@link HistoryTabProps}.
 * @param props.pet Pet whose history is shown.
 * @returns The rendered element.
 */
export function HistoryTab({ pet }: HistoryTabProps) {
  const events = eventsOf(pet.id);
  const weights = weightsOf(pet.id);
  const [filter, setFilter] = useHistoryFilter();

  return (
    <div className={styles.columns}>
      <section className={styles.card} aria-label="History">
        <HistoryFilters events={events} filter={filter} onChange={setFilter} />
        <HistoryTimeline events={filterEvents(events, filter)} />
      </section>
      <div className={styles.side}>
        {weights.length > 0 && <WeightCard weights={weights} />}
        <HistoryInfo />
      </div>
    </div>
  );
}
