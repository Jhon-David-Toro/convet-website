import { useId } from "react";

import type { UseFieldOptions } from "../Field.types";

/**
 * Control id and the accessibility attributes derived from the helper or error.
 *
 * @param idProp Id given by the consumer; a generated one is used when missing.
 * @param params Options, see {@link UseFieldOptions}.
 * @param params.helper Helper text below the control.
 * @param params.error Error message: replaces the helper and marks the control as invalid.
 * @returns Object with `id`, `describedBy`, `invalid`.
 */
export function useField(idProp: string | undefined, { helper, error }: UseFieldOptions) {
  const generatedId = useId();
  const id = idProp ?? generatedId;

  return {
    id,
    describedBy: error || helper ? `${id}-message` : undefined,
    invalid: Boolean(error),
  };
}
