"use client";

import { ClosureModal } from "@/components/sections/ClosureModal";
import { Button } from "@/components/ui/Button";
import { Plus } from "@/components/ui/Icon";
import { useDisclosure } from "@/lib/shared/useDisclosure";

import { ADD_CLOSURE_LABEL, CLOSURES_TITLE, HOURS_TITLE } from "../AdminLocations.constants";
import type { HoursCardProps } from "../AdminLocations.types";
import { useClosures } from "../hooks/useClosures";
import { ClosureList } from "./ClosureList";
import { HoursList } from "./HoursList";
import styles from "../AdminLocations.module.scss";

/**
 * Opening hours of the clinic and its upcoming closures, which can be removed or added.
 *
 * @param props Props of the component, see {@link HoursCardProps}.
 * @param props.location Location to show.
 * @returns The rendered element.
 */
export function HoursCard({ location }: HoursCardProps) {
  const { closures, remove, add } = useClosures(location.closures);
  const dialog = useDisclosure();

  return (
    <section className={styles.card} aria-labelledby="location-hours">
      <h2 id="location-hours" className={styles.cardTitle}>
        {HOURS_TITLE}
      </h2>
      <HoursList hours={location.hours} />
      <h3 className={styles.sectionTitle}>{CLOSURES_TITLE}</h3>
      <ClosureList closures={closures} onRemove={remove} />
      <Button type="button" variant="secondary" size="small" leadingIcon={Plus} onClick={dialog.show} className={styles.addClosure}>
        {ADD_CLOSURE_LABEL}
      </Button>
      <ClosureModal open={dialog.open} onClose={dialog.hide} onAdd={add} />
    </section>
  );
}
