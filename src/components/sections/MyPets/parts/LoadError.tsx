import { Alert } from "@/components/ui/Alert";

import { LOAD_ERROR_TITLE } from "../MyPets.constants";
import type { LoadErrorProps } from "../MyPets.types";

/**
 * Error state shown instead of the pet cards when the pets could not be loaded.
 *
 * @param props Props of the component, see {@link LoadErrorProps}.
 * @param props.message Safe, user-facing reason.
 * @returns The rendered element.
 */
export function LoadError({ message }: LoadErrorProps) {
  return (
    <Alert tone="error" title={LOAD_ERROR_TITLE}>
      {message}
    </Alert>
  );
}
