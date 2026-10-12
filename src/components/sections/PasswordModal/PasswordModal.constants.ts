import type { PasswordValues } from "./PasswordModal.types";

export const MODAL_TITLE = "Change password";

export const MODAL_DESCRIPTION = "Other devices are signed out after the change.";

export const EMPTY_PASSWORDS: PasswordValues = { current: "", next: "", repeat: "" };

export const MIN_PASSWORD_LENGTH = 10;

export const NEW_HELPER = "Use at least 10 characters.";

export const SUBMIT_LABEL = "Update password";

export const SAVED_MESSAGE = "Password updated. Other devices were signed out.";

export const CURRENT_ERROR = "Enter your current password.";

export const LENGTH_ERROR = "Use at least 10 characters.";

export const SAME_ERROR = "Choose a password different from the current one.";

export const REPEAT_ERROR = "The passwords do not match.";
