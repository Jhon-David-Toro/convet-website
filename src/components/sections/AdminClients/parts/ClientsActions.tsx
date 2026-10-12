import { ModalButton } from "@/components/sections/ModalButton";
import { Button } from "@/components/ui/Button";
import { Upload } from "@/components/ui/Icon";

import { IMPORT_LABEL, NEW_LABEL } from "../AdminClients.constants";

/**
 * Buttons of the clients page: import clients from an Excel file, and create a new client, which opens the new client dialog.
 *
 * @returns The rendered element.
 */
export function ClientsActions() {
  return (
    <>
      <Button type="button" variant="secondary" leadingIcon={Upload}>
        {IMPORT_LABEL}
      </Button>
      <ModalButton modal="new-client" icon="plus">
        {NEW_LABEL}
      </ModalButton>
    </>
  );
}
