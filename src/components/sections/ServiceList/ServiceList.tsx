"use client";

import { SERVICES } from "@/lib/services.constants";

import { useServiceFilter } from "./hooks/useServiceFilter";
import { ServiceFilters } from "./parts/ServiceFilters";
import { ServiceHelp } from "./parts/ServiceHelp";
import { ServiceRow } from "./parts/ServiceRow";
import styles from "./ServiceList.module.scss";

/**
 * Services page list: species filter chips, one row per service and a help alert. It reads the services itself because
 * they carry icon components, which cannot be passed from a Server Component to a Client Component.
 *
 * @returns The rendered element.
 */
export function ServiceList() {
  const { filter, setFilter, visible, counts } = useServiceFilter({ services: SERVICES });

  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <ServiceFilters filter={filter} counts={counts} onChange={setFilter} />
        <div className={styles.rows}>
          {visible.map((service) => (
            <ServiceRow key={service.slug} service={service} />
          ))}
        </div>
        <ServiceHelp />
      </div>
    </section>
  );
}
