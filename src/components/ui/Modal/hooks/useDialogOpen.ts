import { useEffect, type RefObject } from "react";

import { syncDialog } from "../Modal.utils";

/**
 * Opens the native `<dialog>` as a modal (and closes it) to match the `open` prop.
 *
 * @param dialogRef Ref of the native dialog element.
 * @param open Whether the popup is open.
 */
export function useDialogOpen(dialogRef: RefObject<HTMLDialogElement | null>, open: boolean) {
  useEffect(() => syncDialog(dialogRef.current, open), [dialogRef, open]);
}
