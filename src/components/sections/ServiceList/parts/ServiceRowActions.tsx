import { Button } from "@/components/ui/Button";
import { ArrowRight, WhatsApp } from "@/components/ui/Icon";
import { serviceActionHref, serviceDetailHref } from "@/lib/catalog/services.utils";

import { DETAILS_LABEL } from "../ServiceList.constants";
import styles from "../ServiceList.module.scss";
import type { ServiceRowProps } from "../ServiceList.types";

/**
 * Main action of a row (book online, or ask on WhatsApp for services booked by the team) and the details link.
 *
 * @param props Props of the component, see {@link ServiceRowProps}.
 * @param props.service Service the row describes.
 * @returns The rendered element.
 */
export function ServiceRowActions({ service }: ServiceRowProps) {
  const online = service.booking === "online";

  return (
    <div className={styles.actions}>
      <Button
        variant={online ? "accent" : "secondary"}
        href={serviceActionHref(service)}
        leadingIcon={online ? undefined : WhatsApp}
      >
        {service.bookLabel}
      </Button>
      <Button variant="tertiary" size="small" href={serviceDetailHref(service)} trailingIcon={ArrowRight}>
        {DETAILS_LABEL}
      </Button>
    </div>
  );
}
