import { MaskedInput } from "@/components/ui/MaskedInput";

import type { DateInputProps } from "./DateInput.types";

/**
 * Date input with the MM / DD / YYYY mask.
 *
 * @param props Properties of the component.
 * @returns The rendered element.
 */
export function DateInput(props: DateInputProps) {
  return <MaskedInput {...props} mask="date" />;
}
