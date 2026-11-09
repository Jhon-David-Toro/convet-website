import type { PasswordValues } from "./PasswordModal.types";

export const MODAL_TITLE = "Change password";

export const MODAL_DESCRIPTION = "Other devices are signed out after the change.";

export const EMPTY_PASSWORDS: PasswordValues = { current: "", next: "", repeat: "" };

export const NEW_HELPER = "Use at least 12 characters, with upper and lower case, a number and a symbol.";

export const SUBMIT_LABEL = "Update password";

export const SAVED_MESSAGE = "Password updated. Please sign in again.";

export const CURRENT_ERROR = "Enter your current password.";

export const SAME_ERROR = "Choose a password different from the current one.";

export const REPEAT_ERROR = "The passwords do not match.";
