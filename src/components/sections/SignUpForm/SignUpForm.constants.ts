import { EMAIL_ERROR, PASSWORD_ERROR, PHONE_ERROR } from "@/lib/auth/validation.constants";
import type { SignUpErrors, SignUpValues } from "./SignUpForm.types";

export const EMPTY_SIGN_UP: SignUpValues = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  password: "",
  confirmPassword: "",
  acceptTerms: false,
  whatsappReminders: false,
};

export const SIGN_UP_TITLE = "Create your account";

export const SIGN_UP_SUBTITLE = "It takes a minute. You can add your pets right after.";

export const SIGN_UP_ERRORS = {
  firstName: "Enter your first name.",
  lastName: "Enter your last name.",
  acceptTerms: "Accept the Terms and Privacy Policy to continue.",
} as const;

export const EMAIL_HELPER = "You will use it to sign in.";

export const PHONE_HELPER = "With the country code. For appointment reminders.";

export const PASSWORD_HELPER = "At least 6 characters, with an uppercase letter and a number or symbol.";

export const CONFIRM_PASSWORD_LABEL = "Confirm password";

export const CONFIRM_PASSWORD_ERROR = "Passwords do not match.";

export const REMINDERS_LABEL = "Send me vaccine and visit reminders by WhatsApp";

export const SUBMIT_ERROR_TITLE = "We could not create your account";

export const EMAIL_TAKEN_ERROR = "This email is already registered. Try signing in.";

export const SUBMIT_LABELS = {
  idle: "Create account",
  busy: "Creating account…",
};

export const HAVE_ACCOUNT_LABEL = "Already have an account?";
export const SIGN_IN_LABEL = "Sign in";

export const CONSENT_PREFIX = "I accept the";
export const TERMS_LABEL = "Terms";
export const PRIVACY_LABEL = "Privacy Policy";

export const FIELD_ERROR_MESSAGES: Required<SignUpErrors> = {
  firstName: SIGN_UP_ERRORS.firstName,
  lastName: SIGN_UP_ERRORS.lastName,
  email: EMAIL_ERROR,
  phone: PHONE_ERROR,
  password: PASSWORD_ERROR,
  confirmPassword: CONFIRM_PASSWORD_ERROR,
  acceptTerms: SIGN_UP_ERRORS.acceptTerms,
  whatsappReminders: "Choose whether you want WhatsApp reminders.",
};

export const REVIEW_FIELDS_MESSAGE = "Please review the highlighted fields.";