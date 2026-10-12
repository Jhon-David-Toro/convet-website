"use client";

import { ClientModal } from "@/components/sections/ClientModal";
import { Button } from "@/components/ui/Button";
import { Edit, Plus } from "@/components/ui/Icon";
import { useDisclosure } from "@/lib/shared/useDisclosure";
import { STAFF_CLIENT } from "@/lib/staff/staff.constants";
import { STAFF_NEW_APPOINTMENT_HREF } from "@/lib/staff/staff.paths.constants";

import { EDIT_CLIENT_LABEL, NEW_APPOINTMENT_LABEL } from "../ClientDetail.constants";
import styles from "../ClientDetail.module.scss";

/**
 * Main actions of the client page: book an appointment and edit the client, which opens the edit dialog.
 *
 * @returns The rendered element.
 */
export function ClientActions() {
  const dialog = useDisclosure();
  const [firstName, ...rest] = STAFF_CLIENT.name.split(" ");

  return (
    <div className={styles.actions}>
      <Button href={STAFF_NEW_APPOINTMENT_HREF} size="small" leadingIcon={Plus}>
        {NEW_APPOINTMENT_LABEL}
      </Button>
      <Button type="button" variant="secondary" size="small" leadingIcon={Edit} onClick={dialog.show}>
        {EDIT_CLIENT_LABEL}
      </Button>
      <ClientModal
        open={dialog.open}
        mode="edit"
        onClose={dialog.hide}
        clientLabel={STAFF_CLIENT.name}
        initial={{ firstName, lastName: rest.join(" "), email: STAFF_CLIENT.email, phone: STAFF_CLIENT.phone, address: "", invite: false }}
      />
    </div>
  );
}
