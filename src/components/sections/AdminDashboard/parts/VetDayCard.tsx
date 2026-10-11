import Image from "next/image";
import Link from "next/link";

import { ChevronRight, Icon } from "@/components/ui/Icon";
import { ADMIN_NAV_HREFS } from "@/lib/admin/admin.paths.constants";
import { photoUrl } from "@/lib/site/photos";

import styles from "../AdminDashboard.module.scss";
import { VET_PHOTO_SIZE } from "../AdminDashboard.constants";
import type { VetDayCardProps } from "../AdminDashboard.types";

/**
 * Card of one vet's day: their photo, name and how many appointments are done, in progress or arrived. It links to the schedule.
 *
 * @param props Props of the component, see {@link VetDayCardProps}.
 * @param props.vet Vet of the card.
 * @returns The rendered element.
 */
export function VetDayCard({ vet }: VetDayCardProps) {
  return (
    <li>
      <Link href={ADMIN_NAV_HREFS.schedule} className={styles.vetCard}>
        <Image src={photoUrl(vet.photo)} alt="" priority width={VET_PHOTO_SIZE} height={VET_PHOTO_SIZE} className={styles.vetPhoto} />
        <span className={styles.vetText}>
          <p className={styles.vetName}>{vet.name}</p>
          <p className={styles.vetSummary}>{vet.summary}</p>
        </span>
        <Icon icon={ChevronRight} tone="tertiary" />
      </Link>
    </li>
  );
}
