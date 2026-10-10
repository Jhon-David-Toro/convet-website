import type { SubmitEvent } from "react";

export type SignUpValues = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  acceptTerms: boolean;
  whatsappReminders: boolean;
};

export type SignUpErrors = Partial<Record<keyof SignUpValues, string>>;

export type SignUpFormProps = {
  onSubmit?: (values: SignUpValues) => Promise<void>;
};

export type UseSignUpFormParams = Pick<SignUpFormProps, "onSubmit">;

export type SignUpFormState = {
  values: SignUpValues;
  errors: SignUpErrors;
  submitting: boolean;
  setValue: <Field extends keyof SignUpValues>(field: Field, value: SignUpValues[Field]) => void;
  handleSubmit: (event: SubmitEvent<HTMLFormElement>) => Promise<void>;
};

export type SignUpFieldsProps = Pick<SignUpFormState, "values" | "errors" | "setValue">;
