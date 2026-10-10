import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { relatedServices } from "@/lib/services.utils";

import { BookingPanel } from "./parts/BookingPanel";
import { RelatedServices } from "./parts/RelatedServices";
import { ServiceMain } from "./parts/ServiceMain";
import styles from "./ServiceDetail.module.scss";
import type { ServiceDetailProps } from "./ServiceDetail.types";
import { serviceBreadcrumbs } from "./ServiceDetail.utils";

/**
 * Detail page of a service: breadcrumbs, photo, intro, steps, optional table, booking column and related services.
 *
 * @param props Props of the component, see {@link ServiceDetailProps}.
 * @param props.service Service to describe.
 * @returns The rendered element.
 */
export function ServiceDetail({ service }: ServiceDetailProps) {
  return (
    <>
      <section className={styles.detail}>
        <div className={styles.inner}>
          <Breadcrumbs items={serviceBreadcrumbs(service)} />
          <div className={styles.columns}>
            <ServiceMain service={service} />
            <BookingPanel service={service} />
          </div>
        </div>
      </section>
      <RelatedServices services={relatedServices(service)} />
    </>
  );
}
