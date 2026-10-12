import { Button } from "@/components/ui/Button";
import { Icon, Lock, Sliders, Syringe } from "@/components/ui/Icon";
import { Modal } from "@/components/ui/Modal";

import { ADJUST_LABEL, DISPENSE_LABEL, DRAWER_TITLE, EDIT_LABEL } from "../StaffInventory.constants";
import type { ProductDrawerProps } from "../StaffInventory.types";
import { DrawerFacts } from "./DrawerFacts";
import { DrawerLots } from "./DrawerLots";
import { DrawerMovements } from "./DrawerMovements";
import { DrawerProduct } from "./DrawerProduct";
import styles from "../StaffInventory.module.scss";

/**
 * Side panel with the detail of a product: what it is, its lots in the order they must be used, the latest movements and the actions on its stock.
 *
 * @param props Props of the component, see {@link ProductDrawerProps}.
 * @param props.product Product to show; the panel is closed without one.
 * @param props.onClose Closes the panel.
 * @param props.onAdjust Opens the dialog to adjust the stock.
 * @param props.onDispense Opens the dialog to dispense stock.
 * @returns The rendered element.
 */
export function ProductDrawer({ product, onClose, onAdjust, onDispense }: ProductDrawerProps) {
  return (
    <Modal
      open={Boolean(product)}
      onClose={onClose}
      placement="end"
      title={DRAWER_TITLE}
      description={product ? `Opened from the inventory table · row “${product.name}”` : undefined}
      actions={
        <div className={styles.drawerActions}>
          <span className={styles.adminOnly}>
            <Icon icon={Lock} size="small" />
            {EDIT_LABEL}
          </span>
          <div className={styles.drawerButtons}>
            <Button type="button" variant="secondary" leadingIcon={Sliders} onClick={onAdjust}>
              {ADJUST_LABEL}
            </Button>
            <Button type="button" leadingIcon={Syringe} onClick={onDispense}>
              {DISPENSE_LABEL}
            </Button>
          </div>
        </div>
      }
    >
      {product && (
        <div className={styles.drawerBody}>
          <DrawerProduct product={product} />
          <DrawerFacts product={product} />
          <DrawerLots product={product} />
          <DrawerMovements product={product} />
        </div>
      )}
    </Modal>
  );
}
