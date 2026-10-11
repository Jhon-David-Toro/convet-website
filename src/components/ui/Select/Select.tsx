"use client";

import { useRef } from "react";

import { useAnchoredPosition } from "@/components/ui/Dropdown";
import { Field, useField } from "@/components/ui/Field";
import { useOutsidePointerDown } from "@/lib/shared/useOutsidePointerDown";

import styles from "./Select.module.scss";
import { useSelect } from "./hooks/useSelect";
import { SelectAdornments } from "./parts/SelectAdornments";
import { SelectListbox } from "./parts/SelectListbox";
import { SelectTrigger } from "./parts/SelectTrigger";
import type { SelectProps } from "./Select.types";

/**
 * Read-only select following the "select-only combobox" pattern: focus stays on the button
 * and the active option is announced through `aria-activedescendant`.
 * Client Component because it owns the open state and the value.
 *
 * @param props Props of the component, see {@link SelectProps}.
 * @param props.id Element id.
 * @param props.label Visible text. For icons it becomes the accessible name.
 * @param props.optional Shows "(optional)" next to the label.
 * @param props.helper Helper text below the control.
 * @param props.error Error message: replaces the helper and marks the control as invalid.
 * @param props.options Options of the list.
 * @param props.value Controlled value. Omit it to use the select uncontrolled with `defaultValue`.
 * @param props.defaultValue Initial value when uncontrolled.
 * @param props.onValueChange Called with the new value.
 * @param props.name Field name for native forms.
 * @param props.disabled Whether the control is disabled.
 * @param props.className Extra class name for the root element.
 * @param props.onBlur Called when the element loses focus.
 * @param props.onKeyDown Called on key down; the component's own key handling runs after it unless the event is default-prevented.
 * @param props.rest Remaining properties, forwarded to the root element.
 * @returns The rendered element.
 */
export function Select({
  id: idProp,
  label,
  optional,
  helper,
  error,
  options,
  value,
  defaultValue,
  onValueChange,
  name,
  disabled,
  className,
  onBlur,
  onKeyDown,
  ...rest
}: SelectProps) {
  const field = useField(idProp, { helper, error });
  const listboxId = `${field.id}-listbox`;
  const rootRef = useRef<HTMLDivElement>(null);
  const select = useSelect({ options, value, defaultValue, onValueChange, onKeyDown });
  const popupStyle = useAnchoredPosition(rootRef, select.open);
  useOutsidePointerDown(rootRef, select.open, select.close);

  return (
    <Field id={field.id} label={label} optional={optional} helper={helper} error={error} disabled={disabled} className={className}>
      <div ref={rootRef} className={styles.control}>
        <SelectTrigger
          {...rest}
          field={field}
          listboxId={listboxId}
          open={select.open}
          activeIndex={select.activeIndex}
          selectedLabel={select.selected?.label}
          disabled={disabled}
          onToggle={select.toggle}
          onBlur={(event) => {
            onBlur?.(event);
            select.close();
          }}
          onKeyDown={select.handleKeyDown}
        />
        <SelectAdornments name={name} value={select.current} />
        {select.open && (
          <SelectListbox
            id={listboxId}
            labelledBy={`${field.id}-label`}
            options={options}
            value={select.current}
            activeIndex={select.activeIndex}
            style={popupStyle}
            onActiveIndexChange={select.setActiveIndex}
            onChoose={select.choose}
          />
        )}
      </div>
    </Field>
  );
}
