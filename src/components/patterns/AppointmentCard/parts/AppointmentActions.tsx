import { Button } from "@/components/ui/Button";
import { Refresh } from "@/components/ui/Icon";

import styles from "../AppointmentCard.module.scss";
import { CANCELLABLE_STATUSES } from "../AppointmentCard.constants";
import type { AppointmentActionsProps } from "../AppointmentCard.types";

/**
 * Primary action and, for upcoming appointments, the cancel link.
 *
 * @param props Props of the component, see {@link AppointmentActionsProps}.
 * @param props.status Status that decides the colors, label and actions.
 * @param props.primaryHref Link of the primary action.
 * @param props.secondaryHref Only for upcoming or same-day appointments (Cancel).
 * @param props.view How the status is presented.
 * @returns The rendered element.
 */
export function AppointmentActions({ status, primaryHref, secondaryHref, view }: AppointmentActionsProps) {
  const canCancel = secondaryHref && CANCELLABLE_STATUSES.includes(status);

  return (
    <div className={styles.actions}>
      <Button variant="primary" size="small" href={primaryHref} leadingIcon={Refresh} trailingIcon={view.trailing}>
        {view.primary}
      </Button>
      {canCancel && (
        <Button variant="tertiary" size="small" href={secondaryHref}>
          Cancel
        </Button>
      )}
    </div>
  );
}
