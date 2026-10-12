import { Badge } from "@/components/ui/Badge";
import { Check, CheckCircle, Icon, Pill } from "@/components/ui/Icon";

import type { DrawerProductProps } from "../StaffInventory.types";
import styles from "../StaffInventory.module.scss";

/**
 * Selected card at the top of the side panel: icon, name, type, description, SKU and how much is on hand.
 *
 * @param props Props of the component, see {@link DrawerProductProps}.
 * @param props.product Product shown.
 * @returns The rendered element.
 */
export function DrawerProduct({ product }: DrawerProductProps) {
  return (
    <div className={styles.drawerProduct}>
      <span className={styles.drawerIcon}>
        <Icon icon={Pill} size="large" />
      </span>
      <div className={styles.drawerIdentity}>
        <p className={styles.drawerName}>{product.name}</p>
        <Badge tone="brand">{product.type}</Badge>
        <p className={styles.drawerDescription}>{product.description}</p>
        <p className={styles.drawerSku}>{`SKU ${product.sku}`}</p>
      </div>
      <Badge tone="success" icon={Check}>{`${product.onHand} ${product.unit}`}</Badge>
      <Icon icon={CheckCircle} tone="brand" />
    </div>
  );
}
