import type { Dispatch, SubmitEvent, SetStateAction } from "react";

export type ContactValues = {
  name: string;
  phone: string;
  email: string;
  topic: string;
  message: string;
  consent: boolean;
};

export type ContactErrors = Partial<Record<keyof ContactValues, string>>;

export type ContactSectionProps = {
  onSubmit?: (values: ContactValues) => void;
};

export type UseContactFormParams = Pick<ContactSectionProps, "onSubmit">;

export type ContactFormState = {
  values: ContactValues;
  errors: ContactErrors;
  sent: boolean;
  setValue: <Field extends keyof ContactValues>(field: Field, value: ContactValues[Field]) => void;
  handleEmailBlur: () => void;
  handleSubmit: (event: SubmitEvent<HTMLFormElement>) => void;
  reset: () => void;
};

export type ContactFieldsState = Pick<ContactFormState, "values" | "errors" | "setValue" | "handleEmailBlur"> & {
  setErrors: Dispatch<SetStateAction<ContactErrors>>;
  resetFields: () => void;
};

export type ContactFormProps = Pick<ContactFormState, "values" | "errors" | "setValue" | "handleEmailBlur">;

export type ContactFormShellProps = ContactFormProps & Pick<ContactFormState, "handleSubmit">;

export type ContactSentProps = Pick<ContactFormState, "reset">;

export type OpeningHoursRow = {
  days: string;
  hours: string;
  highlight?: boolean;
};
