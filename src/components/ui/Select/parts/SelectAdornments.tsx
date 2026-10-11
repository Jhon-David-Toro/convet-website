import { ChevronDown, Icon } from "@/components/ui/Icon";

import type { SelectAdornmentsProps } from "../Select.types";
import styles from "../Select.module.scss";

/**
 * Chevron icon and, when the select has a `name`, the hidden input that submits its value.
 *
 * @param props Props of the component, see {@link SelectAdornmentsProps}.
 * @param props.name Field name for native forms.
 * @param props.value Current value, submitted through the hidden input.
 * @returns The rendered element.
 */
export function SelectAdornments({ name, value }: SelectAdornmentsProps) {
  return (
    <>
      <Icon icon={ChevronDown} className={styles.icon} />
      {name && <input type="hidden" name={name} value={value} />}
    </>
  );
}
