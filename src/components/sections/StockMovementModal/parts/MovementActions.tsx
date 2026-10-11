import { Button } from "@/components/ui/Button";

import { CANCEL_LABEL, SUBMIT_LABELS } from "../StockMovementModal.constants";
import type { MovementActionsProps } from "../StockMovementModal.types";
import styles from "../StockMovementModal.module.scss";

/**
 * Buttons of the dialog: cancel, and record the movement. The record button waits until the form has no problems.
 *
 * @param props Props of the component, see {@link MovementActionsProps}.
 * @param props.type Type of movement, which names the record button.
 * @param props.canSubmit Whether the form has no problems.
 * @param props.onCancel Closes the dialog.
 * @param props.onSubmit Records the movement.
 * @returns The rendered element.
 */
export function MovementActions({ type, canSubmit, onCancel, onSubmit }: MovementActionsProps) {
  return (
    <div className={styles.actions}>
      <Button type="button" variant="tertiary" onClick={onCancel}>
        {CANCEL_LABEL}
      </Button>
      <Button type="button" disabled={!canSubmit} onClick={onSubmit}>
        {SUBMIT_LABELS[type]}
      </Button>
    </div>
  );
}
