import type { DeletionValues } from "./DeleteAccountModal.types";

export const MODAL_TITLE = "Delete your account?";

export const MODAL_DESCRIPTION = "You will lose access to the client area. Clinical records are kept by CONVET as required by law; appointments are cancelled.";

export const EMPTY_DELETION: DeletionValues = { confirmation: "", password: "" };

export const CONFIRMATION_WORD = "DELETE";

export const APPOINTMENT_TITLE = "1 upcoming appointment will be cancelled";

export const APPOINTMENT_NOTE = "Fri, Oct 9 · 9:30 AM — Luna, Rabies booster.";

export const CONFIRM_HELPER = "The request is confirmed by email before the account is closed.";

export const KEEP_LABEL = "Keep my account";

export const SUBMIT_LABEL = "Delete account";

export const SAVED_MESSAGE = "Check your email to confirm closing your account.";

export const CONFIRMATION_ERROR = "Type DELETE in capital letters to confirm.";

export const PASSWORD_ERROR = "Enter your password.";
