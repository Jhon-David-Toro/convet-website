import { Check, Icon, Minus } from "@/components/ui/Icon";

import styles from "../Checkbox.module.scss";

/**
 * Visual box with the check and the indeterminate dash; the stylesheet decides which one shows.
 *
 * @returns The rendered element.
 */
export function CheckboxControl() {
  return (
    <span className={styles.control} aria-hidden="true">
      <Icon icon={Check} size="small" className={styles.check} />
      <Icon icon={Minus} size="small" className={styles.minus} />
    </span>
  );
}
