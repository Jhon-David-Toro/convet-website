import type { SubmitEvent } from "react";

export type TwoStepValues = {
  code: string;
  trustDevice: boolean;
};

export type TwoStepFormProps = {
  onSubmit?: (values: TwoStepValues) => Promise<boolean>;
};

export type UseTwoStepParams = Pick<TwoStepFormProps, "onSubmit">;

export type TwoStepState = {
  code: string;
  trustDevice: boolean;
  error?: string;
  submitting: boolean;
  setCode: (code: string) => void;
  setTrustDevice: (trust: boolean) => void;
  handleSubmit: (event: SubmitEvent<HTMLFormElement>) => Promise<void>;
};
