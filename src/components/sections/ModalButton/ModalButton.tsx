"use client";

import { Button } from "@/components/ui/Button";
import { useDisclosure } from "@/lib/shared/useDisclosure";

import { MODAL_COMPONENTS, MODAL_ICONS } from "./ModalButton.constants";
import type { ModalButtonProps } from "./ModalButton.types";

/**
 * Button that opens a dialog. It lets a page that is a Server Component put a button on the screen without turning into a client file:
 * the button owns whether the dialog is open.
 *
 * @param props Props of the component, see {@link ModalButtonProps}.
 * @param props.modal Which dialog the button opens.
 * @param props.icon Icon before the label, by name: components cannot be passed from a Server Component.
 * @param props.rest Remaining properties, forwarded to the button.
 * @returns The rendered element.
 */
export function ModalButton({ modal, icon, ...button }: ModalButtonProps) {
  const dialog = useDisclosure();
  const Dialog = MODAL_COMPONENTS[modal];

  return (
    <>
      <Button type="button" {...button} leadingIcon={icon && MODAL_ICONS[icon]} onClick={dialog.show} />
      <Dialog open={dialog.open} onClose={dialog.hide} />
    </>
  );
}
