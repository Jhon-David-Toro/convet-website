import { GRID_LABEL } from "../StaffToday.constants";
import styles from "../StaffToday.module.scss";
import type { ScheduleGridProps } from "../StaffToday.types";
import { gridHeight } from "../StaffToday.utils";
import { GridColumns } from "./GridColumns";
import { NowLine } from "./NowLine";
import { TimeLabels } from "./TimeLabels";
import { VetHeads } from "./VetHeads";

/**
 * Schedule of the day: one column per vet over the hours, with each appointment where it belongs and a line at the current time.
 *
 * @param props Props of the component, see {@link ScheduleGridProps}.
 * @param props.vets Vets of the clinic, one column each.
 * @returns The rendered element.
 */
export function ScheduleGrid({ vets }: ScheduleGridProps) {
  return (
    <section className={styles.grid} aria-label={GRID_LABEL}>
      <VetHeads vets={vets} />
      <div className={styles.body} style={{ height: gridHeight() }}>
        <TimeLabels />
        <GridColumns vets={vets} />
        <NowLine />
      </div>
    </section>
  );
}
