"use client";

import { useId, useImperativeHandle, useRef } from "react";

import { ChoiceText } from "@/components/ui/ChoiceText";
import { cx } from "@/lib/cx";

import styles from "./Checkbox.module.scss";
import { MIXED_STATE } from "./Checkbox.constants";
import type { CheckboxProps } from "./Checkbox.types";
import { toNativeChecked } from "./Checkbox.utils";
import { useIndeterminate } from "./hooks/useIndeterminate";
import { CheckboxControl } from "./parts/CheckboxControl";

/**
 * Checkbox with a label and an optional description. Client Component only because "indeterminate" is a DOM property.
 *
 * @param props Props of the component, see {@link CheckboxProps}.
 * @param props.label Visible text. For icons it becomes the accessible name.
 * @param props.description Description text under the title.
 * @param props.checked `true`, `false` or `"mixed"` (indeterminate). Omit it to use the checkbox uncontrolled with `defaultChecked`.
 * @param props.className Extra class name for the root element.
 * @param props.ref Allows getting a ref to the component instance. Once the component unmounts, React will set `ref.current` to `null` (or call the ref with `null` if you passed a callback ref).
 * @param props.rest Remaining properties, forwarded to the root element.
 * @returns The rendered element.
 */
export function Checkbox({ label, description, checked, className, ref, ...rest }: CheckboxProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const descriptionId = useId();
  useImperativeHandle(ref, () => inputRef.current as HTMLInputElement);
  useIndeterminate(inputRef, checked === MIXED_STATE);

  return (
    <label className={cx(styles.root, className)}>
      <input
        {...rest}
        ref={inputRef}
        type="checkbox"
        className={styles.input}
        checked={toNativeChecked(checked)}
        aria-describedby={description ? descriptionId : undefined}
      />
      <CheckboxControl />
      <ChoiceText label={label} description={description} descriptionId={descriptionId} />
    </label>
  );
}
