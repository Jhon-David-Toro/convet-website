"use client";

import { useMemo } from "react";

import { publishedServices } from "@/lib/catalog/services.utils";

import type { ServiceListProps } from "./ServiceList.types";
import { useServiceFilter } from "./hooks/useServiceFilter";
import { ServiceFilters } from "./parts/ServiceFilters";
import { ServiceHelp } from "./parts/ServiceHelp";
import { ServiceRow } from "./parts/ServiceRow";
import styles from "./ServiceList.module.scss";

/**
 * Services page list: species filter chips, one row per service and a help alert. The page passes the texts the backend publishes;
 * the editorial services (with their icon components, which cannot cross from a Server Component) are merged with them here.
 *
 * @param props Props of the component, see {@link ServiceListProps}.
 * @param props.content Published services from the backend; without it every editorial service is shown.
 * @returns The rendered element.
 */
export function ServiceList({ content }: ServiceListProps) {
  const services = useMemo(() => publishedServices(content), [content]);
  const { filter, setFilter, visible, counts } = useServiceFilter({ services });

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
