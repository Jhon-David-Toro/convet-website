import { Badge } from "@/components/ui/Badge";
import { Check, Paw, Stethoscope } from "@/components/ui/Icon";

import { AVAILABLE_LABEL, PRESCRIPTION_LABEL } from "../ProductDetail.constants";
import styles from "../ProductDetail.module.scss";
import type { ProductBadgesProps } from "../ProductDetail.types";
import { speciesBadge } from "../ProductDetail.utils";

/**
 * Badges under the product name: prescription (when needed), species and availability.
 *
 * @param props Props of the component, see {@link ProductBadgesProps}.
 * @param props.product Product to describe.
 * @returns The rendered element.
 */
export function ProductBadges({ product }: ProductBadgesProps) {
  return (
    <div className={styles.badges}>
      {product.prescription && (
        <Badge tone="info" icon={Stethoscope}>
          {PRESCRIPTION_LABEL}
        </Badge>
      )}
      <Badge icon={Paw}>{speciesBadge(product)}</Badge>
      <Badge tone="success" icon={Check}>
        {AVAILABLE_LABEL}
      </Badge>
    </div>
  );
}
