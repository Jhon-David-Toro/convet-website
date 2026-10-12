"use client";

import { FormModal, type DialogControlProps } from "@/components/patterns/FormModal";
import { OptionCard } from "@/components/patterns/OptionCard";
import { Button } from "@/components/ui/Button";
import { Select } from "@/components/ui/Select";
import { TextInput } from "@/components/ui/TextInput";
import { useToast } from "@/components/ui/Toast";
import { useFormModal } from "@/lib/shared/useFormModal";

import {
  COPIED_MESSAGE,
  COPY_LABEL,
  DONE_LABEL,
  DONE_TITLE,
  EXPIRY_NOTE,
  EXPIRY_TITLE,
  INITIAL_INVITE,
  LOCATION_OPTIONS,
  MODAL_DESCRIPTION,
  MODAL_TITLE,
  MODAL_WIDTH,
  NEXT_STAFF_ID,
  NUMBER_HELPER,
  ROLE_OPTIONS,
  SAVING_LABEL,
  SUBMIT_LABEL,
  USER_ID_PLACEHOLDER,
} from "./InviteModal.constants";
import { emailIsTaken, errorTitle, roleOption, validateInvite } from "./InviteModal.utils";
import styles from "./InviteModal.module.scss";

/**
 * Dialog that invites someone to the team: name, work email, the role (each one with what it needs), their clinical number and location.
 * Once sent it shows the identifiers that were assigned. The form is only mounted while the dialog is open.
 *
 * @param props Props of the component, see {@link DialogControlProps}.
 * @param props.open Whether the dialog is open.
 * @param props.onClose Called when the dialog is closed.
 * @returns The rendered element, or nothing while the dialog is closed.
 */
export function InviteModal({ open, onClose }: DialogControlProps) {
  return open ? <InviteDialog onClose={onClose} /> : null;
}

/**
 * The open dialog of {@link InviteModal}; it holds the state of the form.
 *
 * @param props Props of the component.
 * @param props.onClose Closes the dialog.
 * @returns The rendered element.
 */
function InviteDialog({ onClose }: Pick<DialogControlProps, "onClose">) {
  const { toast } = useToast();
  const form = useFormModal({ initial: INITIAL_INVITE, validate: validateInvite });
  const role = roleOption(form.values.role);
  const roleLabel = `${role.title}${form.values.number && role.numberLabel ? ` · ${form.values.number}` : ""}`;

  return (
    <FormModal
      title={MODAL_TITLE}
      description={MODAL_DESCRIPTION}
      width={MODAL_WIDTH}
      status={form.status}
      errorTitle={errorTitle(form.errorCount, emailIsTaken(form.errors))}
      submitLabel={SUBMIT_LABEL}
      savingLabel={SAVING_LABEL}
      onClose={onClose}
      onSubmit={form.submit}
      done={{
        title: DONE_TITLE,
        description: `${form.values.name} · ${roleLabel}`,
        body: (
          <div className={styles.sent}>
            <p className={styles.sentTitle}>{`Email sent to ${form.values.email}`}</p>
            <p className={styles.sentNote}>{`${EXPIRY_TITLE} ${EXPIRY_NOTE}`}</p>
            <dl className={styles.ids}>
              <div>
                <dt>Staff ID</dt>
                <dd>{NEXT_STAFF_ID}</dd>
              </div>
              {role.numberLabel && (
                <div>
                  <dt>{role.numberLabel}</dt>
                  <dd>{form.values.number}</dd>
                </div>
              )}
              <div>
                <dt>User ID</dt>
                <dd>{USER_ID_PLACEHOLDER}</dd>
              </div>
            </dl>
          </div>
        ),
        actions: (
          <>
            <Button type="button" variant="secondary" onClick={() => toast({ message: COPIED_MESSAGE, tone: "success" })}>
              {COPY_LABEL}
            </Button>
            <Button type="button" onClick={onClose}>
              {DONE_LABEL}
            </Button>
          </>
        ),
      }}
    >
      <div className={styles.pair}>
        <TextInput label="Full name" autoComplete="name" error={form.errors.name} value={form.values.name} onChange={(event) => form.setValue("name", event.target.value)} />
        <TextInput label="Work email" type="email" autoComplete="email" error={form.errors.email} value={form.values.email} onChange={(event) => form.setValue("email", event.target.value)} />
      </div>
      <fieldset className={styles.roles}>
        <legend className={styles.legend}>Role</legend>
        <div className={styles.roleGrid}>
          {ROLE_OPTIONS.map((option) => (
            <OptionCard
              key={option.value}
              name="role"
              icon={option.icon}
              title={option.title}
              subtitle={option.subtitle}
              checked={form.values.role === option.value}
              onChange={() => {
                form.setValue("role", option.value);
                form.setValue("number", option.suggestion ?? "");
              }}
            />
          ))}
        </div>
      </fieldset>
      <div className={styles.pair}>
        {role.numberLabel && (
          <TextInput label={role.numberLabel} helper={NUMBER_HELPER} error={form.errors.number} value={form.values.number} onChange={(event) => form.setValue("number", event.target.value.toUpperCase())} />
        )}
        <Select label="Location" options={LOCATION_OPTIONS} value={form.values.location} onValueChange={(value) => form.setValue("location", value)} />
      </div>
    </FormModal>
  );
}
