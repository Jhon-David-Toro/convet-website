import { Button } from "@/components/ui/Button";

import { DISPENSE_LABEL, RECEIVE_HREF, RECEIVE_SHORT_LABEL } from "../AdminStock.constants";
import type { MobileBarProps } from "../AdminStock.types";
import styles from "../AdminStock.module.scss";

/**
 * Bar fixed to the bottom of the screen on mobile with the two main actions: dispense and receive.
 *
 * @param props Props of the component, see {@link MobileBarProps}.
 * @param props.onDispense Opens the movement dialog as a clinical use.
 * @returns The rendered element.
 */
export function MobileBar({ onDispense }: MobileBarProps) {
  return (
    <div className={styles.mobileBar}>
      <Button type="button" variant="secondary" onClick={onDispense}>
        {DISPENSE_LABEL}
      </Button>
      <Button href={RECEIVE_HREF}>{RECEIVE_SHORT_LABEL}</Button>
    </div>
  );
}
