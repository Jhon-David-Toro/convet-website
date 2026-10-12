import type { ReactNode } from "react";

import type { FormModalStatus } from "@/lib/shared/useFormModal.types";

export type FormModalDone = {
  title: string;
  description?: string;
  body?: ReactNode;
  actions: ReactNode;
};

export type FormModalProps = {
  title: string;
  description?: string;
  width?: string;
  status: FormModalStatus;
  errorTitle?: string;
  submitLabel: string;
  savingLabel?: string;
  cancelLabel?: string;
  destructive?: boolean;
  done?: FormModalDone;
  onClose: () => void;
  onSubmit: () => void;
  children: ReactNode;
};

export type DialogControlProps = {
  open: boolean;
  onClose: () => void;
};
