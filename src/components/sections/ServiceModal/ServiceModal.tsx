"use client";

import { FormModal, type DialogControlProps } from "@/components/patterns/FormModal";
import { Checkbox } from "@/components/ui/Checkbox";
import { Select } from "@/components/ui/Select";
import { TextInput } from "@/components/ui/TextInput";
import { Toggle } from "@/components/ui/Toggle";
import { useToast } from "@/components/ui/Toast";
import { useFormModal } from "@/lib/shared/useFormModal";

import {
  BUFFER_OPTIONS,
  CATEGORY_OPTIONS,
  DURATION_HELPER,
  DURATION_OPTIONS,
  EMPTY_SERVICE,
  MODAL_DESCRIPTION,
  MODAL_TITLE,
  MODAL_WIDTH,
  ONLINE_DESCRIPTION,
  ONLINE_LABEL,
  SAVED_MESSAGE,
  SUBMIT_LABEL,
  VET_NAMES,
  VETS_ERROR,
  VETS_LABEL,
} from "./ServiceModal.constants";
import { errorTitle, toggleVet, validateService } from "./ServiceModal.utils";
import styles from "./ServiceModal.module.scss";

/**
 * Dialog that creates a service of the clinic: name, category, duration in 10-minute blocks, the buffer after it, the vets who offer it and whether it can be booked online.
 * The form is only mounted while the dialog is open, so it starts clean every time.
 *
 * @param props Props of the component, see {@link DialogControlProps}.
 * @param props.open Whether the dialog is open.
 * @param props.onClose Called when the dialog is closed or the service is created.
 * @returns The rendered element, or nothing while the dialog is closed.
 */
export function ServiceModal({ open, onClose }: DialogControlProps) {
  return open ? <ServiceDialog onClose={onClose} /> : null;
}

/**
 * The open dialog of {@link ServiceModal}; it holds the state of the form.
 *
 * @param props Props of the component.
 * @param props.onClose Closes the dialog.
 * @returns The rendered element.
 */
function ServiceDialog({ onClose }: Pick<DialogControlProps, "onClose">) {
  const { toast } = useToast();
  const form = useFormModal({
    initial: EMPTY_SERVICE,
    validate: validateService,
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
      <div className={styles.pair}>
        <TextInput label="Service name" error={form.errors.name} value={form.values.name} onChange={(event) => form.setValue("name", event.target.value)} />
        <Select label="Category" options={CATEGORY_OPTIONS} error={form.errors.category} value={form.values.category} onValueChange={(value) => form.setValue("category", value)} />
      </div>
      <div className={styles.pair}>
        <Select label="Duration" options={DURATION_OPTIONS} helper={DURATION_HELPER} value={form.values.duration} onValueChange={(value) => form.setValue("duration", value)} />
        <Select label="Buffer after" options={BUFFER_OPTIONS} value={form.values.buffer} onValueChange={(value) => form.setValue("buffer", value)} />
      </div>
      <fieldset className={styles.vets}>
        <legend className={styles.legend}>{VETS_LABEL}</legend>
        <div className={styles.vetList}>
          {VET_NAMES.map((name) => (
            <Checkbox key={name} label={name} checked={form.values.vets.includes(name)} onChange={() => form.setValue("vets", toggleVet(form.values.vets, name))} />
          ))}
        </div>
        {form.errors.vets && <p className={styles.error}>{form.errors.vets ?? VETS_ERROR}</p>}
      </fieldset>
      <Toggle label={ONLINE_LABEL} description={ONLINE_DESCRIPTION} checked={form.values.online} onChange={(event) => form.setValue("online", event.target.checked)} />
    </FormModal>
  );
}
