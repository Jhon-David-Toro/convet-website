import type { SignInErrors, SignInValues } from "./SignInForm.types";

export const EMPTY_SIGN_IN: SignInValues = { email: "", password: "", remember: true };

export const SIGN_IN_TITLE = "Welcome back";

export const SIGN_IN_SUBTITLE = "Sign in to manage your pets and appointments.";

export const EMAIL_REQUIRED_ERROR = "Enter your email.";

export const PASSWORD_REQUIRED_ERROR = "Enter your password.";

export const CREDENTIAL_ERRORS: SignInErrors = {
  email: "Check the email address.",
  password: "Password doesn't match this email.",
};

export const ALERT_TITLE = "Email or password is incorrect";

export const ALERT_TEXT = "Check both and try again. After 5 attempts we pause sign-in for a few minutes.";

export const ALERT_ACTION_LABEL = "Reset password";

export const REMEMBER_LABEL = "Keep me signed in";

export const FORGOT_LABEL = "Forgot password?";

export const SUBMIT_LABELS = { idle: "Sign in", busy: "Signing in…" };

export const DIVIDER_LABEL = "New to CONVET?";

export const CREATE_ACCOUNT_LABEL = "Create an account";

export const STAFF_NOTE = "Clinic staff use this same page. You will be asked for your 2-step verification code.";

export const NOTE_ICON_SIZE = 16;
