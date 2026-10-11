import { MASK_CONFIG } from "../MaskedInput.constants";
import type { MaskedTextInputProps } from "../MaskedInput.types";
import { getTimeComboboxProps } from "../MaskedInput.utils";
import styles from "../MaskedInput.module.scss";

/**
 * Text input of a masked field; the time variant is a combobox bound to its list of slots.
 *
 * @param props Props of the component, see {@link MaskedTextInputProps}.
 * @param props.mask Mask of the field: `"date"` or `"time"`.
 * @param props.field Id, validity and description of the field.
 * @param props.popupId Id of the picker popup.
 * @param props.value Current value.
 * @param props.open Whether the popup or menu is open.
 * @param props.activeIndex Index of the highlighted option, or -1 when none.
 * @param props.inputRef Ref of the text input.
 * @param props.placeholder Hint shown while the field is empty.
 * @param props.onValueTyped Called with the text the user typed.
 * @param props.rest Remaining properties, forwarded to the root element.
 * @returns The rendered element.
 */
export function MaskedTextInput({ mask, field, popupId, value, open, activeIndex, inputRef, placeholder, onValueTyped, ...rest }: MaskedTextInputProps) {
  const config = MASK_CONFIG[mask];

  return (
    <input
      {...rest}
      {...getTimeComboboxProps(mask, open, popupId, activeIndex)}
      ref={inputRef}
      id={field.id}
      type="text"
      inputMode={config.inputMode}
      autoComplete="off"
      maxLength={config.maxLength}
      placeholder={placeholder ?? config.placeholder}
      value={value}
      className={styles.input}
      aria-invalid={field.invalid || undefined}
      aria-describedby={field.describedBy}
      onChange={(event) => onValueTyped(event.target.value)}
    />
  );
}
