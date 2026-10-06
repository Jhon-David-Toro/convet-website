import { useEffect, type RefObject } from "react";

import { setIndeterminate } from "../Checkbox.utils";

/**
 * Syncs the DOM `indeterminate` property with the `"mixed"` state.
 *
 * @param inputRef Ref of the native input.
 * @param indeterminate Whether the checkbox shows the indeterminate state.
 */
export function useIndeterminate(inputRef: RefObject<HTMLInputElement | null>, indeterminate: boolean) {
  useEffect(() => setIndeterminate(inputRef.current, indeterminate), [inputRef, indeterminate]);
}
