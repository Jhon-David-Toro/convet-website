"use client";

import { FormModal } from "@/components/patterns/FormModal";
import { Button } from "@/components/ui/Button";
import { Checkbox } from "@/components/ui/Checkbox";
import { Icon, Mail } from "@/components/ui/Icon";
import { TextInput } from "@/components/ui/TextInput";
import { useFormModal } from "@/lib/shared/useFormModal";
import { STAFF_CLIENT } from "@/lib/staff/staff.constants";
import { STAFF_CLIENTS_HREF } from "@/lib/staff/staff.paths.constants";

import {
  ADDRESS_PLACEHOLDER,
  ADD_PET_LABEL,
  DONE_LABEL,
  DONE_TITLE,
  EDIT_DONE_TITLE,
  EDIT_SAVING_LABEL,
  EDIT_SUBMIT_LABEL,
  EDIT_TITLE,
  EMAIL_HELPER,
  EMPTY_CLIENT,
  INVITATION_TITLE,
  INVITE_DESCRIPTION,
  INVITE_LABEL,
  MODAL_WIDTH,
  NAME_HELPER,
  NEW_DESCRIPTION,
  NEW_SAVING_LABEL,
  NEW_SUBMIT_LABEL,
  NEW_TITLE,
  OPEN_CLIENT_LABEL,
  PHONE_LABEL,
} from "./ClientModal.constants";
import type { ClientDialogProps, ClientModalProps } from "./ClientModal.types";
import { clientName, errorTitle, validateClient } from "./ClientModal.utils";
import styles from "./ClientModal.module.scss";

/**
 * Dialog that creates or edits a client (the owner of the pets): names, email, mobile number, address and, for a new client, whether to send the invitation.
 * Creating shows a confirmation with the invitation; the form is only mounted while the dialog is open, so it starts clean every time.
 *
 * @param props Props of the component, see {@link ClientModalProps}.
 * @param props.open Whether the dialog is open.
 * @param props.mode `new` creates a client; `edit` changes an existing one.
 * @param props.onClose Called when the dialog is closed.
 * @param props.initial Values the form starts with.
 * @param props.clientLabel Who is being edited, shown under the title.
 * @returns The rendered element, or nothing while the dialog is closed.
 */
export function ClientModal({ open, ...dialog }: ClientModalProps) {
  return open ? <ClientDialog {...dialog} /> : null;
}

/**
 * The open dialog of {@link ClientModal}; it holds the state of the form.
 *
 * @param props Props of the component, see {@link ClientDialogProps}.
 * @param props.mode `new` creates a client; `edit` changes an existing one.
 * @param props.onClose Closes the dialog.
 * @param props.initial Values the form starts with.
 * @param props.clientLabel Who is being edited, shown under the title.
 * @returns The rendered element.
 */
function ClientDialog({ mode, onClose, initial = EMPTY_CLIENT, clientLabel }: ClientDialogProps) {
  const form = useFormModal({ initial, validate: validateClient });
  const isNew = mode === "new";
  const name = clientName(form.values);

  return (
    <FormModal
      title={isNew ? NEW_TITLE : EDIT_TITLE}
      description={isNew ? NEW_DESCRIPTION : `Changes are saved to ${clientLabel ?? STAFF_CLIENT.name}. The client is notified if the email changes.`}
      width={MODAL_WIDTH}
      status={form.status}
      errorTitle={errorTitle(form.errorCount, mode)}
      submitLabel={isNew ? NEW_SUBMIT_LABEL : EDIT_SUBMIT_LABEL}
      savingLabel={isNew ? NEW_SAVING_LABEL : EDIT_SAVING_LABEL}
      onClose={onClose}
      onSubmit={form.submit}
      done={
        isNew
          ? {
              title: DONE_TITLE,
              description: `${name} was added to Main clinic.`,
              body: (
                <p className={styles.invitation}>
                  <Icon icon={Mail} tone="brand" />
                  <span>
                    <strong>{INVITATION_TITLE}</strong>
                    <br />
                    {`${form.values.email} will receive a link to set a password.`}
                  </span>
                </p>
              ),
              actions: (
                <>
                  <Button href={`${STAFF_CLIENTS_HREF}/${STAFF_CLIENT.id}`} variant="secondary">
                    {OPEN_CLIENT_LABEL}
                  </Button>
                  <Button type="button" onClick={onClose}>
                    {ADD_PET_LABEL}
                  </Button>
                </>
              ),
            }
          : { title: EDIT_DONE_TITLE, description: `${name} was updated.`, actions: <Button onClick={onClose}>{DONE_LABEL}</Button> }
      }
    >
      <div className={styles.names}>
        <TextInput label="First name" autoComplete="given-name" helper={NAME_HELPER} error={form.errors.firstName} value={form.values.firstName} onChange={(event) => form.setValue("firstName", event.target.value)} />
        <TextInput label="Last name" autoComplete="family-name" helper={NAME_HELPER} error={form.errors.lastName} value={form.values.lastName} onChange={(event) => form.setValue("lastName", event.target.value)} />
      </div>
      <TextInput label="Email" type="email" autoComplete="email" helper={EMAIL_HELPER} error={form.errors.email} value={form.values.email} onChange={(event) => form.setValue("email", event.target.value)} />
      <TextInput label={PHONE_LABEL} type="tel" autoComplete="tel" error={form.errors.phone} value={form.values.phone} onChange={(event) => form.setValue("phone", event.target.value)} />
      <TextInput label="Address" optional placeholder={ADDRESS_PLACEHOLDER} autoComplete="street-address" value={form.values.address} onChange={(event) => form.setValue("address", event.target.value)} />
      {isNew && <Checkbox label={INVITE_LABEL} description={INVITE_DESCRIPTION} checked={form.values.invite} onChange={(event) => form.setValue("invite", event.target.checked)} />}
    </FormModal>
  );
}
