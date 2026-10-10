import type { Dispatch, SetStateAction, SubmitEvent } from "react";

export type SignInValues = {
  email: string;
  password: string;
  remember: boolean;
};

export type SignInErrors = Partial<Record<"email" | "password", string>>;

export type SignInStatus = "idle" | "submitting" | "error";

export type SignInResult = {
  ok: boolean;
};

export type SignInFormProps = {
  onSubmit?: (values: SignInValues) => Promise<SignInResult>;
};

export type UseSignInFormParams = Pick<SignInFormProps, "onSubmit">;

export type SignInFormState = {
  values: SignInValues;
  errors: SignInErrors;
  status: SignInStatus;
  setValue: <Field extends keyof SignInValues>(field: Field, value: SignInValues[Field]) => void;
  handleSubmit: (event: SubmitEvent<HTMLFormElement>) => Promise<void>;
};

export type SignInFieldsState = {
  values: SignInValues;
  errors: SignInErrors;
  setErrors: Dispatch<SetStateAction<SignInErrors>>;
  setValue: <Field extends keyof SignInValues>(field: Field, value: SignInValues[Field]) => void;
};

export type SignInFieldsProps = Pick<SignInFormState, "values" | "errors" | "setValue">;

export type SignInOptionsProps = Pick<SignInFormState, "values" | "setValue">;
