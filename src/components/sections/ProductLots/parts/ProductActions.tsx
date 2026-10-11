import { Button } from "@/components/ui/Button";
import { ArrowDownCircle, ArrowUpCircle, Sliders } from "@/components/ui/Icon";
import { ADMIN_RECEIVE_HREF } from "@/lib/admin/admin.paths.constants";

import styles from "../ProductLots.module.scss";
import { ADJUST_LABEL, DISPENSE_LABEL, RECEIVE_LABEL } from "../ProductLots.constants";
import type { ProductActionsProps } from "../ProductLots.types";

/**
 * Buttons of the product page: adjust, dispense and receive stock.
 *
 * @param props Props of the component, see {@link ProductActionsProps}.
 * @param props.onAdjust Opens the movement dialog as an adjustment.
 * @param props.onDispense Opens the movement dialog as a clinical use.
 * @returns The rendered element.
 */
export function ProductActions({ onAdjust, onDispense }: ProductActionsProps) {
  return (
    <div className={styles.actions}>
      <Button type="button" variant="secondary" size="small" leadingIcon={Sliders} onClick={onAdjust}>
        {ADJUST_LABEL}
      </Button>
      <Button type="button" variant="secondary" size="small" leadingIcon={ArrowUpCircle} onClick={onDispense}>
        {DISPENSE_LABEL}
      </Button>
      <Button href={ADMIN_RECEIVE_HREF} size="small" leadingIcon={ArrowDownCircle}>
        {RECEIVE_LABEL}
      </Button>
    </div>
  );
}
