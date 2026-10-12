"use client";

import { FormModal, type DialogControlProps } from "@/components/patterns/FormModal";
import { Chip } from "@/components/ui/Chip";
import { Select } from "@/components/ui/Select";
import { TextInput } from "@/components/ui/TextInput";
import { Toggle } from "@/components/ui/Toggle";
import { useToast } from "@/components/ui/Toast";
import { useFormModal } from "@/lib/shared/useFormModal";

import {
  CATEGORY_OPTIONS,
  EMPTY_PRODUCT,
  KIND_LABEL,
  KINDS,
  MODAL_DESCRIPTION,
  MODAL_TITLE,
  MODAL_WIDTH,
  PRESCRIPTION_DESCRIPTION,
  PRESCRIPTION_LABEL,
  PUBLISHED_DESCRIPTION,
  PUBLISHED_LABEL,
  SAVED_MESSAGE,
  SKU_HELPER,
  SUBMIT_LABEL,
  TRACK_OPTIONS,
  UNIT_OPTIONS,
  UUID_LABEL,
  UUID_VALUE,
} from "./ProductModal.constants";
import { errorTitle, validateProduct } from "./ProductModal.utils";
import styles from "./ProductModal.module.scss";

/**
 * Dialog that creates a product of the catalog: its type, name, category, presentation, unit, SKU, minimum stock, whether it tracks lots and expiry,
 * whether it needs a prescription and whether it is shown on the website. The form is only mounted while the dialog is open.
 *
 * @param props Props of the component, see {@link DialogControlProps}.
 * @param props.open Whether the dialog is open.
 * @param props.onClose Called when the dialog is closed or the product is created.
 * @returns The rendered element, or nothing while the dialog is closed.
 */
export function ProductModal({ open, onClose }: DialogControlProps) {
  return open ? <ProductDialog onClose={onClose} /> : null;
}

/**
 * The open dialog of {@link ProductModal}; it holds the state of the form.
 *
 * @param props Props of the component.
 * @param props.onClose Closes the dialog.
 * @returns The rendered element.
 */
function ProductDialog({ onClose }: Pick<DialogControlProps, "onClose">) {
  const { toast } = useToast();
  const form = useFormModal({
    initial: EMPTY_PRODUCT,
    validate: validateProduct,
    onSaved: () => {
      toast({ message: SAVED_MESSAGE, tone: "success" });
      onClose();
    },
  });

  return (
    <FormModal
      title={MODAL_TITLE}
      description={MODAL_DESCRIPTION}
      width={MODAL_WIDTH}
      status={form.status}
      errorTitle={errorTitle(form.errorCount)}
      submitLabel={SUBMIT_LABEL}
      onClose={onClose}
      onSubmit={form.submit}
    >
      <div role="group" aria-label={KIND_LABEL} className={styles.kinds}>
        {KINDS.map((kind) => (
          <Chip key={kind} selected={form.values.kind === kind} onClick={() => form.setValue("kind", kind)}>
            {kind}
          </Chip>
        ))}
      </div>
      <div className={styles.pair}>
        <TextInput label="Name" error={form.errors.name} value={form.values.name} onChange={(event) => form.setValue("name", event.target.value)} />
        <Select label="Category" options={CATEGORY_OPTIONS} error={form.errors.category} value={form.values.category} onValueChange={(value) => form.setValue("category", value)} />
      </div>
      <div className={styles.pair}>
        <TextInput label="Presentation" optional value={form.values.presentation} onChange={(event) => form.setValue("presentation", event.target.value)} />
        <Select label="Unit" options={UNIT_OPTIONS} error={form.errors.unit} value={form.values.unit} onValueChange={(value) => form.setValue("unit", value)} />
      </div>
      <div className={styles.pair}>
        <TextInput label="SKU" helper={SKU_HELPER} error={form.errors.sku} value={form.values.sku} onChange={(event) => form.setValue("sku", event.target.value.toUpperCase())} />
        <TextInput label={UUID_LABEL} value={UUID_VALUE} readOnly disabled />
      </div>
      <div className={styles.pair}>
        <TextInput label="Minimum stock" inputMode="numeric" error={form.errors.minimum} value={form.values.minimum} onChange={(event) => form.setValue("minimum", event.target.value)} />
        <Select label="Track lots & expiry" options={TRACK_OPTIONS} value={form.values.tracksLots} onValueChange={(value) => form.setValue("tracksLots", value)} />
      </div>
      <Toggle label={PRESCRIPTION_LABEL} description={PRESCRIPTION_DESCRIPTION} checked={form.values.prescription} onChange={(event) => form.setValue("prescription", event.target.checked)} />
      <Toggle label={PUBLISHED_LABEL} description={PUBLISHED_DESCRIPTION} checked={form.values.published} onChange={(event) => form.setValue("published", event.target.checked)} />
    </FormModal>
  );
}
