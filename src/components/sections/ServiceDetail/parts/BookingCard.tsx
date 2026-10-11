import { Button } from "@/components/ui/Button";
import { ArrowRight, WhatsApp } from "@/components/ui/Icon";
import { serviceActionHref } from "@/lib/catalog/services.utils";
import { whatsappLink } from "@/lib/site/whatsapp";

import { ASK_WHATSAPP_LABEL } from "../ServiceDetail.constants";
import styles from "../ServiceDetail.module.scss";
import type { BookingPanelProps } from "../ServiceDetail.types";
import { ServiceFacts } from "./ServiceFacts";

/**
 * Card with the facts of the service (duration, species, price) and its booking and WhatsApp actions.
 *
 * @param props Props of the component, see {@link BookingPanelProps}.
 * @param props.service Service to book.
 * @returns The rendered element.
 */
export function BookingCard({ service }: BookingPanelProps) {
  const online = service.booking === "online";

  return (
    <section className={styles.bookCard} aria-labelledby="service-book-title">
      <h2 id="service-book-title" className={styles.cardTitle}>
        {service.panelTitle}
      </h2>
      <ServiceFacts facts={service.facts} />
      <Button variant="accent" href={serviceActionHref(service)} trailingIcon={online ? ArrowRight : undefined}>
        {service.bookLabel}
      </Button>
      {online && (
        <Button variant="secondary" href={whatsappLink(service.whatsappText)} leadingIcon={WhatsApp}>
          {ASK_WHATSAPP_LABEL}
        </Button>
      )}
    </section>
  );
}
