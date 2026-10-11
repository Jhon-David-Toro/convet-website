"use client";

import { cx } from "@/lib/shared/cx";

import styles from "./CodeInput.module.scss";
import { DEFAULT_CODE_LENGTH } from "./CodeInput.constants";
import type { CodeInputProps } from "./CodeInput.types";
import { useCodeInput } from "./hooks/useCodeInput";

/**
 * Code entry with one box per digit (verification codes). Typing moves forward, Backspace and the arrow keys move back and forth,
 * and pasting fills every box. The first box asks for the one-time code so phones can autofill it.
 *
 * @param props Props of the component, see {@link CodeInputProps}.
 * @param props.value Digits typed so far.
 * @param props.onValueChange Called with the new code.
 * @param props.label Accessible name of the group.
 * @param props.length Number of digits of the code.
 * @param props.invalid Marks the boxes as invalid.
 * @param props.disabled Whether the boxes are disabled.
 * @param props.className Extra class name for the root element.
 * @param props.rest Remaining properties, forwarded to the root element.
 * @returns The rendered element.
 */
export function CodeInput({ value, onValueChange, label, length = DEFAULT_CODE_LENGTH, invalid, disabled, className, ...rest }: CodeInputProps) {
  const code = useCodeInput({ value, onValueChange, length });

  return (
    <div {...rest} role="group" aria-label={label} className={cx(styles.code, className)}>
      {Array.from({ length }, (_, index) => (
        <input
          key={index}
          ref={(element) => {
            code.inputRefs.current[index] = element;
          }}
          className={styles.digit}
          value={value[index] ?? ""}
          inputMode="numeric"
          autoComplete={index === 0 ? "one-time-code" : "off"}
          maxLength={length}
          aria-label={`${label}, digit ${index + 1} of ${length}`}
          aria-invalid={invalid || undefined}
          disabled={disabled}
          onChange={(event) => code.handleChange(index, event)}
          onKeyDown={(event) => code.handleKeyDown(index, event)}
          onPaste={code.handlePaste}
        />
      ))}
    </div>
  );
}
