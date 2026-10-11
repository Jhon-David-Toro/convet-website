import { Button } from "@/components/ui/Button";
import { ArrowDownCircle, ArrowUpCircle } from "@/components/ui/Icon";

import { DISPENSE_LABEL, RECEIVE_HREF, RECEIVE_LABEL } from "../AdminStock.constants";
import type { CompactActionsProps } from "../AdminStock.types";
import styles from "../AdminStock.module.scss";

/**
 * Receive and dispense buttons under the figures on tablet, side by side and as wide as the screen.
 *
 * @param props Props of the component, see {@link CompactActionsProps}.
 * @param props.onDispense Opens the movement dialog as a clinical use.
 * @returns The rendered element.
 */
export function CompactActions({ onDispense }: CompactActionsProps) {
  return (
    <div className={styles.tabletActions}>
      <Button href={RECEIVE_HREF} leadingIcon={ArrowDownCircle}>
        {RECEIVE_LABEL}
      </Button>
      <Button type="button" variant="secondary" leadingIcon={ArrowUpCircle} onClick={onDispense}>
        {DISPENSE_LABEL}
      </Button>
    </div>
  );
}
