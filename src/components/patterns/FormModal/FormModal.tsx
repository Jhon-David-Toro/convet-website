"use client";

import { useId } from "react";

import { Alert } from "@/components/ui/Alert";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";

import { DEFAULT_CANCEL_LABEL, DEFAULT_SAVING_LABEL, NOTHING_SAVED } from "./FormModal.constants";
import type { FormModalProps } from "./FormModal.types";
import styles from "./FormModal.module.scss";

/**
 * Form/Modal: a dialog with a form, the steps of saving it and, once it is saved, a confirmation that replaces the form.
 * Its buttons are cancel and submit (disabled and renamed while saving); an error banner tells how many fields to fix.
 * It is mounted open: a parent that renders it only while the dialog is needed gets a clean form every time.
 *
 * @param props Props of the component, see {@link FormModalProps}.
 * @param props.title Title of the dialog.
 * @param props.description Sentence under the title.
 * @param props.width Width of the dialog as a CSS length.
 * @param props.status Step of saving the form: idle, error, saving or success.
 * @param props.errorTitle Title of the banner shown on error, e.g. "Fix 2 fields to create the client".
 * @param props.submitLabel Text of the submit button.
 * @param props.savingLabel Text of the submit button while saving.
 * @param props.cancelLabel Text of the cancel button.
 * @param props.destructive Makes the submit button red, for confirmations that delete or cancel something.
 * @param props.done Confirmation shown on success instead of the form.
 * @param props.onClose Closes the dialog.
 * @param props.onSubmit Called when the form is submitted.
 * @param props.children Fields of the form.
 * @returns The rendered element.
 */
export function FormModal({
  title,
  description,
  width,
  status,
  errorTitle,
  submitLabel,
  savingLabel = DEFAULT_SAVING_LABEL,
  cancelLabel = DEFAULT_CANCEL_LABEL,
  destructive = false,
  done,
  onClose,
  onSubmit,
  children,
}: FormModalProps) {
  const formId = useId();
  const saving = status === "saving";

  if (status === "success" && done) {
    return (
      <Modal open onClose={onClose} width={width} title={done.title} description={done.description} actions={done.actions}>
        {done.body}
      </Modal>
    );
  }

  return (
    <Modal
      open
      onClose={onClose}
      width={width}
      title={title}
      description={description}
      actions={
        <>
          <Button type="button" variant="tertiary" onClick={onClose}>
            {cancelLabel}
          </Button>
          <Button type="submit" form={formId} variant={destructive ? "destructive" : "primary"} disabled={saving} loading={saving}>
            {saving ? savingLabel : submitLabel}
          </Button>
        </>
      }
    >
      <form
        id={formId}
        noValidate
        className={styles.form}
        onSubmit={(event) => {
          event.preventDefault();
          onSubmit();
        }}
      >
        {status === "error" && errorTitle && (
          <Alert tone="error" title={errorTitle} role="alert">
            {NOTHING_SAVED}
          </Alert>
        )}
        {children}
      </form>
    </Modal>
  );
}
