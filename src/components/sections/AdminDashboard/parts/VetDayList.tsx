import { VET_DAYS } from "@/lib/admin/admin.constants";

import { VETS_TITLE } from "../AdminDashboard.constants";
import { VetDayCard } from "./VetDayCard";
import styles from "../AdminDashboard.module.scss";

/**
 * How each vet's day is going, one card per vet.
 *
 * @returns The rendered element.
 */
export function VetDayList() {
  return (
    <section className={styles.block} aria-labelledby="dashboard-vets">
      <h2 id="dashboard-vets" className={styles.blockTitle}>
        {VETS_TITLE}
      </h2>
      <ul className={styles.vets}>
        {VET_DAYS.map((vet) => (
          <VetDayCard key={vet.id} vet={vet} />
        ))}
      </ul>
    </section>
  );
}
