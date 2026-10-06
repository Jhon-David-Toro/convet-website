import type { CheckboxProps } from "./Checkbox.types";

/**
 * Maps the tri-state `checked` value to the native one: `"mixed"` is unchecked plus the DOM `indeterminate` flag.
 *
 * @param checked Tri-state value: `true`, `false`, `"mixed"` or `undefined` when uncontrolled.
 * @returns The tri-state `checked` value to the native one: `"mixed"` is unchecked plus the DOM `indeterminate` flag.
 */
export const toNativeChecked = (checked: CheckboxProps["checked"]): boolean | undefined =>
  checked === undefined ? undefined : checked === true;

/**
 * Sets the DOM `indeterminate` property, which has no HTML attribute equivalent.
 *
 * @param input The native checkbox input, or `null` before it mounts.
 * @param indeterminate Whether the checkbox shows the indeterminate state.
 */
export function setIndeterminate(input: HTMLInputElement | null, indeterminate: boolean): void {
  if (input) input.indeterminate = indeterminate;
}
