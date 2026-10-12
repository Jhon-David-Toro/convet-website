"use client";

import { FormModal } from "@/components/patterns/FormModal";
import { Badge } from "@/components/ui/Badge";
import { Icon, Pill } from "@/components/ui/Icon";
import { Select } from "@/components/ui/Select";
import { TextInput } from "@/components/ui/TextInput";
import { useToast } from "@/components/ui/Toast";
import { useFormModal } from "@/lib/shared/useFormModal";

import {
  DEFAULT_INSTRUCTIONS,
  DEFAULT_PATIENT,
  INSTRUCTIONS_LABEL,
  LOT_LABEL,
  MODAL_DESCRIPTION,
  MODAL_TITLE,
  MODAL_WIDTH,
  PATIENT_HELPER,
  PATIENT_LABEL,
  QUANTITY_LABEL,
  SAVED_MESSAGE,
} from "./DispenseModal.constants";
import type { DispenseContext, DispenseModalProps } from "./DispenseModal.types";
import { dispensableLots, errorTitle, leftAfter, lotLabel, validateDispense } from "./DispenseModal.utils";
import styles from "./DispenseModal.module.scss";

/**
 * Dialog that dispenses a medication: the product, the patient and visit, the lot it comes from (the first to expire), the quantity with what is left afterwards and the dosage.
 * The dialog is only mounted while it is open, so the form starts clean every time.
 *
 * @param props Props of the component, see {@link DispenseModalProps}.
 * @param props.open Whether the dialog is open.
 * @param props.onClose Called when the dialog is closed or the medication is dispensed.
 * @param props.product Product to dispense.
 * @returns The rendered element, or nothing while the dialog is closed.
 */
export function DispenseModal({ open, onClose, product }: DispenseModalProps) {
  return open ? <DispenseDialog onClose={onClose} product={product} /> : null;
}

/**
 * The open dialog of {@link DispenseModal}; it holds the state of the form.
 *
 * @param props Props of the component.
 * @param props.onClose Closes the dialog.
 * @param props.product Product to dispense.
 * @returns The rendered element.
 */
function DispenseDialog({ onClose, product }: DispenseContext & { onClose: () => void }) {
  const { toast } = useToast();
  const lots = dispensableLots(product);
  const form = useFormModal({
    initial: { patient: DEFAULT_PATIENT, lot: lots[0]?.code ?? "", quantity: "1", instructions: DEFAULT_INSTRUCTIONS },
    validate: validateDispense(product),
    onSaved: () => {
      toast({ message: SAVED_MESSAGE, tone: "success" });
      onClose();
    },
  });
  const quantity = Number(form.values.quantity);
  const left = leftAfter(product, form.values);

  return (
    <FormModal
      title={MODAL_TITLE}
      description={MODAL_DESCRIPTION}
      width={MODAL_WIDTH}
      status={form.status}
      errorTitle={errorTitle(form.errorCount)}
      submitLabel={`Dispense ${Number.isInteger(quantity) && quantity > 0 ? quantity : ""} ${product.unit}`.replace("  ", " ")}
      onClose={onClose}
      onSubmit={form.submit}
    >
      <div className={styles.product}>
        <span className={styles.icon}>
          <Icon icon={Pill} />
        </span>
        <div className={styles.productText}>
          <p className={styles.productName}>{product.name}</p>
          <p className={styles.productMeta}>{`${product.description} · SKU ${product.sku}`}</p>
        </div>
        <Badge tone="success">{`${product.onHand} ${product.unit}`}</Badge>
      </div>
      <TextInput label={PATIENT_LABEL} helper={PATIENT_HELPER} error={form.errors.patient} value={form.values.patient} onChange={(event) => form.setValue("patient", event.target.value)} />
      <div className={styles.pair}>
        <Select label={LOT_LABEL} options={lots.map((lot) => ({ value: lot.code, label: lotLabel(lot) }))} value={form.values.lot} onValueChange={(value) => form.setValue("lot", value)} />
        <TextInput
          label={QUANTITY_LABEL}
          inputMode="numeric"
          helper={left >= 0 ? `Left after: ${left} ${product.unit}` : undefined}
          error={form.errors.quantity}
          value={form.values.quantity}
          onChange={(event) => form.setValue("quantity", event.target.value)}
        />
      </div>
      <TextInput label={INSTRUCTIONS_LABEL} error={form.errors.instructions} value={form.values.instructions} onChange={(event) => form.setValue("instructions", event.target.value)} />
    </FormModal>
  );
}
