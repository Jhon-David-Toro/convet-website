import { ModalButton } from "@/components/sections/ModalButton";

import { NEW_LABEL } from "../AdminClients.constants";

/**
 * Button of the clients page that creates a new client, which opens the new client dialog.
 *
 * @returns The rendered element.
 */
export function ClientsActions() {
  return (
    <ModalButton modal="new-client" icon="plus">
      {NEW_LABEL}
    </ModalButton>
  );
}
