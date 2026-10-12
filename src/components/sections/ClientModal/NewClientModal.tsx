import type { DialogControlProps } from "@/components/patterns/FormModal";

import { ClientModal } from "./ClientModal";

/**
 * {@link ClientModal} set to create a client, for buttons that only know how to open a dialog.
 *
 * @param props Props of the component, see {@link DialogControlProps}.
 * @param props.open Whether the dialog is open.
 * @param props.onClose Called when the dialog is closed.
 * @returns The rendered element.
 */
export function NewClientModal(props: DialogControlProps) {
  return <ClientModal mode="new" {...props} />;
}
