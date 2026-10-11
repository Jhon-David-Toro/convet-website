"use client";

import { useImperativeHandle, useRef } from "react";

import { useAnchoredPosition } from "@/components/ui/Dropdown";
import { Field, useField } from "@/components/ui/Field";
import { useOutsidePointerDown } from "@/lib/shared/useOutsidePointerDown";

import { MASK_CONFIG } from "./MaskedInput.constants";
import type { MaskedInputProps } from "./MaskedInput.types";
import { useMaskedInput } from "./hooks/useMaskedInput";
import { MaskedTextInput } from "./parts/MaskedTextInput";
import { PickerPopup } from "./parts/PickerPopup";
import { PickerTrigger } from "./parts/PickerTrigger";
import styles from "./MaskedInput.module.scss";

/**
 * Masked text field for dates (MM / DD / YYYY) and times (h:mm AM). Figma only defines the field;
 * the floating picker (calendar or list of times) reuses the Select styles.
 * Client Component because it owns the value and the popup.
 *
 * @param props Props of the component, see {@link MaskedInputProps}.
 * @param props.id Element id.
 * @param props.ref Allows getting a ref to the component instance. Once the component unmounts, React will set `ref.current` to `null` (or call the ref with `null` if you passed a callback ref).
 * @param props.label Visible text. For icons it becomes the accessible name.
 * @param props.optional Shows "(optional)" next to the label.
 * @param props.helper Helper text below the control.
 * @param props.error Error message: replaces the helper and marks the control as invalid.
 * @param props.mask Mask of the field: `"date"` or `"time"`.
 * @param props.value Already formatted value, e.g. "07 / 15 / 2023". Omit it to use the input uncontrolled.
 * @param props.defaultValue Initial value when uncontrolled.
 * @param props.onValueChange Called with the new value.
 * @param props.minDate Earlier days are disabled in the calendar.
 * @param props.maxDate Later days are disabled in the calendar.
 * @param props.today "Today", defaults to the current date.
 * @param props.from First time in the list, defaults to "7:00 AM".
 * @param props.to Last time in the list, defaults to "7:00 PM".
 * @param props.stepMinutes Minutes between times, defaults to 15.
 * @param props.disabled Whether the control is disabled.
 * @param props.className Extra class name for the root element.
 * @param props.onKeyDown Called on key down; the component's own key handling runs after it unless the event is default-prevented.
 * @param props.rest Remaining properties, forwarded to the root element.
 * @returns The rendered element.
 */
export function MaskedInput({
  id: idProp,
  ref,
  label,
  optional,
  helper,
  error,
  mask,
  value,
  defaultValue,
  onValueChange,
  minDate,
  maxDate,
  today,
  from,
  to,
  stepMinutes,
  disabled,
  className,
  onKeyDown,
  ...rest
}: MaskedInputProps) {
  const field = useField(idProp, { helper, error });
  const popupId = `${field.id}-picker`;
  const inputRef = useRef<HTMLInputElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  useImperativeHandle(ref, () => inputRef.current as HTMLInputElement);

  const input = useMaskedInput({ mask, value, defaultValue, onValueChange, from, to, stepMinutes, onKeyDown, popupId, inputRef });
  const popupStyle = useAnchoredPosition(rootRef, input.open, MASK_CONFIG[mask].popupMinWidth);
  useOutsidePointerDown(rootRef, input.open, input.close);

  return (
    <Field id={field.id} label={label} optional={optional} helper={helper} error={error} disabled={disabled} className={className}>
      <div ref={rootRef} className={styles.control} onKeyDown={input.handleEscape}>
        <MaskedTextInput
          {...rest}
          mask={mask}
          field={field}
          popupId={popupId}
          value={input.current}
          open={input.open}
          activeIndex={input.activeIndex}
          inputRef={inputRef}
          disabled={disabled}
          onKeyDown={input.handleKeyDown}
          onValueTyped={input.type}
        />
        <PickerTrigger mask={mask} disabled={disabled} open={input.open} popupId={popupId} onToggle={input.toggle} />
        {input.open && (
          <PickerPopup
            mask={mask}
            popupId={popupId}
            style={popupStyle}
            current={input.current}
            slots={input.slots}
            activeIndex={input.activeIndex}
            minDate={minDate}
            maxDate={maxDate}
            today={today}
            onActiveIndexChange={input.setActiveIndex}
            onCommit={input.pick}
          />
        )}
      </div>
    </Field>
  );
}
