import { Button } from "@/components/ui/Button";
import { Edit, Plus } from "@/components/ui/Icon";
import { STAFF_NEW_APPOINTMENT_HREF } from "@/lib/staff.paths.constants";

import { EDIT_CLIENT_LABEL, NEW_APPOINTMENT_LABEL } from "../ClientDetail.constants";
import styles from "../ClientDetail.module.scss";

/**
 * Main actions of the client page: book an appointment and edit the client.
 *
 * @returns The rendered element.
 */
export function ClientActions() {
  return (
    <div className={styles.actions}>
      <Button href={STAFF_NEW_APPOINTMENT_HREF} size="small" leadingIcon={Plus}>
        {NEW_APPOINTMENT_LABEL}
      </Button>
      <Button type="button" variant="secondary" size="small" leadingIcon={Edit}>
        {EDIT_CLIENT_LABEL}
      </Button>
    </div>
  );
}
