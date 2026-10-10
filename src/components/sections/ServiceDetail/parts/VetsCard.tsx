import Image from "next/image";

import { photoUrl } from "@/lib/photos";

import { VET_PHOTO_SIZE, VETS_TITLE } from "../ServiceDetail.constants";
import styles from "../ServiceDetail.module.scss";
import type { BookingPanelProps } from "../ServiceDetail.types";

/**
 * Card with the vets who provide the service, each with a round photo.
 *
 * @param props Props of the component, see {@link BookingPanelProps}.
 * @param props.service Service whose vets are listed.
 * @returns The rendered element.
 */
export function VetsCard({ service }: BookingPanelProps) {
  return (
    <section className={styles.vetsCard} aria-labelledby="service-vets-title">
      <h2 id="service-vets-title" className={styles.vetsTitle}>
        {VETS_TITLE}
      </h2>
      <ul className={styles.vets}>
        {service.vets.map(({ name, photo }) => (
          <li key={name} className={styles.vet}>
            <Image src={photoUrl(photo)} alt="" width={VET_PHOTO_SIZE} height={VET_PHOTO_SIZE} className={styles.vetPhoto} />
            {name}
          </li>
        ))}
      </ul>
    </section>
  );
}
