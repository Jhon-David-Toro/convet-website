import type { SubmitEvent } from "react";

import type { ActionResult } from "@/lib/api/api.types";

export type SignUpValues = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  acceptTerms: boolean;
  whatsappReminders: boolean;
};

export type SignUpErrors = Partial<Record<keyof SignUpValues, string>>;

export type SignUpFormProps = {
  /** Creates the account; in the app it is a Server Action that calls the backend. */
  onSubmit?: (values: SignUpValues) => Promise<ActionResult>;
};

export type UseSignUpFormParams = Pick<SignUpFormProps, "onSubmit">;

export type SignUpFormState = {
  values: SignUpValues;
  errors: SignUpErrors;
  submitting: boolean;
  /** Error of the last attempt that is not tied to a field. */
  submitError?: string;
  setValue: <Field extends keyof SignUpValues>(field: Field, value: SignUpValues[Field]) => void;
  handleSubmit: (event: SubmitEvent<HTMLFormElement>) => Promise<void>;
};

export type SignUpFieldsProps = Pick<SignUpFormState, "values" | "errors" | "setValue">;
