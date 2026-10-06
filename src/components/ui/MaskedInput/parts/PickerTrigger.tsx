import { Icon } from "@/components/ui/Icon";

import styles from "../MaskedInput.module.scss";
import { MASK_CONFIG } from "../MaskedInput.constants";
import type { PickerTriggerProps } from "../MaskedInput.types";

/**
 * Button that opens and closes the picker popup.
 *
 * @param props Props of the component, see {@link PickerTriggerProps}.
 * @param props.mask Mask of the field: `"date"` or `"time"`.
 * @param props.disabled Whether the control is disabled.
 * @param props.open Whether the popup or menu is open.
 * @param props.popupId Id of the picker popup.
 * @param props.onToggle Called to open or close the popup.
 * @returns The rendered element.
 */
export function PickerTrigger({ mask, disabled, open, popupId, onToggle }: PickerTriggerProps) {
  const config = MASK_CONFIG[mask];

  return (
    <button
      type="button"
      className={styles.trigger}
      disabled={disabled}
      aria-label={config.pickerLabel}
      aria-haspopup={config.popupRole}
      aria-expanded={open}
      aria-controls={open ? popupId : undefined}
      onClick={onToggle}
    >
      <Icon icon={config.icon} />
    </button>
  );
}
