import { ServiceCard } from "@/components/ui/ServiceCard";
import { serviceBookingHref, serviceDetailHref } from "@/lib/catalog/services.utils";

import { RELATED_TITLE } from "../ServiceDetail.constants";
import type { RelatedServicesProps } from "../ServiceDetail.types";
import styles from "../ServiceDetail.module.scss";

/**
 * Services that are often booked together with the current one, as compact cards on the subtle background.
 *
 * @param props Props of the component, see {@link RelatedServicesProps}.
 * @param props.services Services to suggest.
 * @returns The rendered element.
 */
export function RelatedServices({ services }: RelatedServicesProps) {
  return (
    <section className={styles.related}>
      <div className={styles.relatedInner}>
        <h2 className={styles.relatedTitle}>{RELATED_TITLE}</h2>
        <div className={styles.relatedGrid}>
          {services.map((service) => (
            <ServiceCard
              key={service.slug}
              icon={service.icon}
              title={service.title}
              description={service.cardSummary}
              duration={service.duration}
              species={service.speciesLabel}
              detailsHref={serviceDetailHref(service)}
              bookHref={serviceBookingHref(service)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
