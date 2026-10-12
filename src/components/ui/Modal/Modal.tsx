"use client";

import { useId, type CSSProperties } from "react";

import { cx } from "@/lib/shared/cx";

import { END_PLACEMENT } from "./Modal.constants";
import type { ModalProps } from "./Modal.types";
import { ModalPanel } from "./ModalPanel";
import { useModalDialog } from "./hooks/useModalDialog";
import styles from "./Modal.module.scss";

/**
 * Modal dialog built on the native <dialog> element: the browser handles the focus trap, making the
 * rest of the page inert and returning focus on close. Client Component because of showModal().
 * To keep the initial focus off the close button, mark the desired control with `data-autofocus`.
 *
 * @param props Props of the component, see {@link ModalProps}.
 * @param props.open Whether the popup or menu is open.
 * @param props.placement `center` (default) or `end`: a panel that fills the height of the screen on its right side.
 * @param props.width Width of the dialog as a CSS length (30rem by default); it never exceeds the screen.
 * @param props.onClose Called on the close button, Escape or the backdrop. The consumer sets `open` to false.
 * @param props.children Content of the element.
 * @param props.panel Remaining properties, forwarded to the root element.
 * @returns The rendered element.
 */
export function Modal({ open, onClose, placement, width, children, ...panel }: ModalProps) {
  const { dialogRef, handleCancel, handleClick } = useModalDialog({ open, onClose });
  const titleId = useId();
  const descriptionId = useId();

  return (
    <dialog
      ref={dialogRef}
      className={cx(styles.dialog, placement === END_PLACEMENT && styles.end)}
      aria-labelledby={titleId}
      aria-describedby={panel.description ? descriptionId : undefined}
      style={width ? ({ "--modal-width": width } as CSSProperties) : undefined}
      onCancel={handleCancel}
      onClick={handleClick}
    >
      {open && (
        <ModalPanel {...panel} titleId={titleId} descriptionId={descriptionId} onClose={onClose}>
          {children}
        </ModalPanel>
      )}
    </dialog>
  );
}
