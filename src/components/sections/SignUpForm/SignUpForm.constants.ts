import type { SignUpValues } from "./SignUpForm.types";

export const EMPTY_SIGN_UP: SignUpValues = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  password: "",
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

export const PASSWORD_HELPER = "At least 12 characters, with upper and lower case, a number and a symbol.";

export const REMINDERS_LABEL = "Send me vaccine and visit reminders by WhatsApp";

export const SUBMIT_ERROR_TITLE = "We could not create your account";

export const EMAIL_TAKEN_ERROR = "This email is already registered. Try signing in.";

export const SUBMIT_LABELS = { idle: "Create account", busy: "Creating account…" };

export const HAVE_ACCOUNT_LABEL = "Already have an account?";

export const SIGN_IN_LABEL = "Sign in";

export const CONSENT_PREFIX = "I accept the";

export const TERMS_LABEL = "Terms";

export const PRIVACY_LABEL = "Privacy Policy";
