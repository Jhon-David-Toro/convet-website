import type { EmailValues } from "./EmailModal.types";

export const MODAL_TITLE = "Change email";

export const MODAL_DESCRIPTION = "We send a 6-digit code to the new address. Your sign-in email changes after you confirm.";

export const EMPTY_EMAIL: EmailValues = { email: "", code: "" };

export const CODE_PLACEHOLDER = "000 000";

export const CODE_HELPER = "Code sent · resend in 0:42";

export const CODE_LENGTH = 6;

export const SUBMIT_LABEL = "Confirm new email";

export const SAVED_MESSAGE = "Email updated. Use it the next time you sign in.";

export const CODE_ERROR = "Enter the 6-digit code from the email.";
