import type { SubmitEvent } from "react";

export type VerifyEmailFormProps = {
  email?: string;
  onVerify?: (code: string) => Promise<boolean>;
  onResend?: () => Promise<void>;
};

export type UseVerifyEmailParams = Pick<VerifyEmailFormProps, "onVerify" | "onResend">;

export type VerifyEmailState = {
  code: string;
  complete: boolean;
  setCode: (code: string) => void;
  invalid: boolean;
  verifying: boolean;
  seconds: number;
  handleSubmit: (event: SubmitEvent<HTMLFormElement>) => Promise<void>;
  handleResend: () => Promise<void>;
};

export type VerifyEmailIntroProps = {
  email: string;
};

export type VerifyEmailFieldsProps = Pick<VerifyEmailState, "code" | "setCode" | "invalid" | "verifying">;

export type ResendRowProps = Pick<VerifyEmailState, "seconds" | "handleResend">;

export type CountdownState = {
  seconds: number;
  restart: () => void;
};
