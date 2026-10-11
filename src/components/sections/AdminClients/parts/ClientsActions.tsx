import { Button } from "@/components/ui/Button";
import { Plus, Upload } from "@/components/ui/Icon";

import { IMPORT_LABEL, NEW_LABEL } from "../AdminClients.constants";

/**
 * Buttons of the clients page: import clients from an Excel file, and create a new client.
 *
 * @returns The rendered element.
 */
export function ClientsActions() {
  return (
    <>
      <Button type="button" variant="secondary" leadingIcon={Upload}>
        {IMPORT_LABEL}
      </Button>
      <Button type="button" leadingIcon={Plus}>
        {NEW_LABEL}
      </Button>
    </>
  );
}
