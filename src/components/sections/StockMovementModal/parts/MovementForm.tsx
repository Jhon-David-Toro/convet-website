"use client";

import { Select } from "@/components/ui/Select";
import { Textarea } from "@/components/ui/Textarea";

import { LOT_LABEL, REASON_HELPER, REASON_LABEL } from "../StockMovementModal.constants";
import type { MovementFormProps } from "../StockMovementModal.types";
import { lotOptions } from "../StockMovementModal.utils";
import { useMovementForm } from "../hooks/useMovementForm";
import { MovementActions } from "./MovementActions";
import { QuantityFields } from "./QuantityFields";
import { TypeChips } from "./TypeChips";
import styles from "../StockMovementModal.module.scss";

/**
 * Form inside the dialog: type, lot, direction and quantity, the reason, and the buttons that cancel or record the movement.
 *
 * @param props Props of the component, see {@link MovementFormProps}.
 * @param props.lots Lots of the product.
 * @param props.initialType Type of movement selected at the start.
 * @param props.onClose Closes the dialog.
 * @returns The rendered element.
 */
export function MovementForm({ lots, initialType, onClose }: MovementFormProps) {
  const form = useMovementForm({ lots, initialType, onClose });

  return (
    <div className={styles.form}>
      <TypeChips values={form.values} setValue={form.setValue} />
      <Select label={LOT_LABEL} options={lotOptions(lots)} value={form.values.lot} onValueChange={(value) => form.setValue("lot", value)} />
      <QuantityFields values={form.values} setValue={form.setValue} balance={form.balance} quantityError={form.quantityError} />
      <Textarea label={REASON_LABEL} helper={REASON_HELPER} error={form.reasonError} value={form.values.reason} onChange={(event) => form.setValue("reason", event.target.value)} />
      <MovementActions type={form.values.type} canSubmit={form.canSubmit} onCancel={onClose} onSubmit={form.submit} />
    </div>
  );
}
