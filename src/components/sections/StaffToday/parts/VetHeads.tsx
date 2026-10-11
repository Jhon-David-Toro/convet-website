import Image from "next/image";

import { photoUrl } from "@/lib/photos";
import { appointmentsOfVet } from "@/lib/staff.utils";

import { VET_PHOTO_SIZE } from "../StaffToday.constants";
import styles from "../StaffToday.module.scss";
import type { ScheduleGridProps } from "../StaffToday.types";

/**
 * Row above the grid: each vet with their photo and how many appointments they have.
 *
 * @param props Props of the component, see {@link ScheduleGridProps}.
 * @param props.vets Vets of the clinic.
 * @returns The rendered element.
 */
export function VetHeads({ vets }: ScheduleGridProps) {
  return (
    <div className={styles.heads}>
      <span />
      {vets.map((vet) => (
        <div key={vet.id} className={styles.head}>
          <Image src={photoUrl(vet.photo)} alt="" priority width={VET_PHOTO_SIZE} height={VET_PHOTO_SIZE} className={styles.vetPhoto} />
          <div className={styles.headText}>
            <p className={styles.vetName}>{vet.name}</p>
            <p className={styles.vetCount}>{`${appointmentsOfVet(vet.id).length} appointments`}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
