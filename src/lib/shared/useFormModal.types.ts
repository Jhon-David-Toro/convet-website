export type FormModalStatus = "idle" | "error" | "saving" | "success";

export type FormErrors<Values> = Partial<Record<keyof Values, string>>;

/** Result of saving a form for real: done, or a safe message and the errors of the fields the server rejected. */
export type FormModalSaveResult<Values> = { ok: true } | { ok: false; message: string; fieldErrors?: FormErrors<Values> };

export type UseFormModalParams<Values> = {
  initial: Values;
  validate: (values: Values) => FormErrors<Values>;
  /** Saves the values. Without it saving is simulated, as in the design. */
  save?: (values: Values) => Promise<FormModalSaveResult<Values>>;
  onSaved?: () => void;
};

export type FormModalState<Values> = {
  values: Values;
  errors: FormErrors<Values>;
  status: FormModalStatus;
  errorCount: number;
  /** Message of the last save that failed, when `save` was given. */
  serverError?: string;
  setValue: <Field extends keyof Values>(field: Field, value: Values[Field]) => void;
  submit: () => void | Promise<void>;
};
