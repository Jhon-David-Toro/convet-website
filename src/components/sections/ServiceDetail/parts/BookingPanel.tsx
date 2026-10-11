import type { BookingPanelProps } from "../ServiceDetail.types";
import { BookingCard } from "./BookingCard";
import { VetsCard } from "./VetsCard";
import styles from "../ServiceDetail.module.scss";

/**
 * Side column of a service page: booking card and vets; hidden on mobile, where the fixed bar takes over.
 *
 * @param props Props of the component, see {@link BookingPanelProps}.
 * @param props.service Service to book.
 * @returns The rendered element.
 */
export function BookingPanel({ service }: BookingPanelProps) {
  return (
    <aside className={styles.panel}>
      <BookingCard service={service} />
      <VetsCard service={service} />
    </aside>
  );
}
