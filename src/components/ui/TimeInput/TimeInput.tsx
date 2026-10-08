import { MaskedInput } from "@/components/ui/MaskedInput";

import type { TimeInputProps } from "./TimeInput.types";

/**
 * Time input with the h:mm AM mask.
 *
 * @param props Properties of the component.
 * @returns The rendered element.
 */
export function TimeInput(props: TimeInputProps) {
  return <MaskedInput {...props} mask="time" />;
}
