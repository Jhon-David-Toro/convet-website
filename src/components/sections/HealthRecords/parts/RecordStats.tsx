import { StatGrid } from "@/components/patterns/StatGrid";

import { STAT_ICONS, STAT_LABELS } from "../HealthRecords.constants";
import type { RecordStatsProps } from "../HealthRecords.types";

/**
 * The four figures of the records: vaccines, active treatments, last visit and next appointment.
 *
 * @param props Props of the component, see {@link RecordStatsProps}.
 * @param props.record Health record of the pet.
 * @returns The rendered element.
 */
export function RecordStats({ record }: RecordStatsProps) {
  const figures = [record.vaccines, record.treatments, record.lastVisit, record.nextAppointment];
  const stats = figures.map((figure, index) => ({
    label: STAT_LABELS[index],
    value: figure.value,
    caption: figure.caption,
    icon: STAT_ICONS[index],
    tone: figure.tone ?? "default",
  }));

  return <StatGrid stats={stats} />;
}
