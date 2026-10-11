import { Button } from "@/components/ui/Button";
import { WhatsApp } from "@/components/ui/Icon";
import { productService, productWhatsappHref } from "@/lib/catalog/products.utils";
import { serviceBookingHref } from "@/lib/catalog/services.utils";

import { ASK_LABEL } from "../ProductDetail.constants";
import styles from "../ProductDetail.module.scss";
import type { ProductActionsProps } from "../ProductDetail.types";

/**
 * Availability question on WhatsApp and, for products that need a visit, the booking of the matching service.
 *
 * @param props Props of the component, see {@link ProductActionsProps}.
 * @param props.product Product to ask about.
 * @returns The rendered element.
 */
export function ProductActions({ product }: ProductActionsProps) {
  const service = productService(product);

  return (
    <div className={styles.actions}>
      <Button variant="primary" href={productWhatsappHref(product)} leadingIcon={WhatsApp}>
        {ASK_LABEL}
      </Button>
      {service && (
        <Button variant="accent" href={serviceBookingHref(service)}>
          {service.bookLabel}
        </Button>
      )}
    </div>
  );
}
