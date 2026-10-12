"use client";

import { ClientModal } from "@/components/sections/ClientModal";
import { Button } from "@/components/ui/Button";
import { Plus, Upload } from "@/components/ui/Icon";

import { useDisclosure } from "@/lib/shared/useDisclosure";

import { IMPORT_LABEL, NEW_LABEL } from "../AdminClients.constants";

/**
 * Buttons of the clients page: import clients from an Excel file, and create a new client, which opens the new client dialog.
 *
 * @returns The rendered element.
 */
export function ClientsActions() {
  const dialog = useDisclosure();

  return (
    <>
      <Button type="button" variant="secondary" leadingIcon={Upload}>
        {IMPORT_LABEL}
      </Button>
      <Button type="button" leadingIcon={Plus} onClick={dialog.show}>
        {NEW_LABEL}
      </Button>
      <ClientModal open={dialog.open} mode="new" onClose={dialog.hide} />
    </>
  );
}
