import { useRef, type MouseEvent, type SyntheticEvent } from "react";

import type { UseModalDialogParams } from "../Modal.types";
import { useDialogOpen } from "./useDialogOpen";

/**
 * Opens and closes the native `<dialog>` from the `open` prop and routes its cancel and backdrop events to `onClose`.
 *
 * @param params Options, see {@link UseModalDialogParams}.
 * @param params.open Whether the popup or menu is open.
 * @param params.onClose Called on the close button, Escape or the backdrop. The consumer sets `open` to false.
 * @returns Object with `dialogRef`, `handleCancel` and `handleClick`.
 */
export function useModalDialog({ open, onClose }: UseModalDialogParams) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  useDialogOpen(dialogRef, open);

  return {
    dialogRef,
    // Escape: the consumer that controls `open` closes it, so the state never gets out of sync
    /**
     * Routes the dialog cancel event (Escape) to `onClose`.
     *
     * @param event Cancel event of the dialog.
     */
    handleCancel: (event: SyntheticEvent) => {
      event.preventDefault();
      onClose();
    },
    // A direct click on the <dialog> is a click on the backdrop
    /**
     * Closes the modal when the click lands on the backdrop.
     *
     * @param event Click event of the dialog.
     */
    handleClick: (event: MouseEvent) => {
      if (event.target === event.currentTarget) onClose();
    },
  };
}
