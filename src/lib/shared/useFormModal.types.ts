export type FormModalStatus = "idle" | "error" | "saving" | "success";

export type FormErrors<Values> = Partial<Record<keyof Values, string>>;

export type UseFormModalParams<Values> = {
  initial: Values;
  validate: (values: Values) => FormErrors<Values>;
};

export type FormModalState<Values> = {
  values: Values;
  errors: FormErrors<Values>;
  status: FormModalStatus;
  errorCount: number;
  setValue: <Field extends keyof Values>(field: Field, value: Values[Field]) => void;
  submit: () => void;
};
