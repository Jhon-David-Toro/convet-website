import type { SubmitEvent } from "react";

export type ForgotPasswordFormProps = {
  onSubmit?: (email: string) => Promise<void>;
};

export type UseForgotPasswordParams = Pick<ForgotPasswordFormProps, "onSubmit">;

export type ForgotPasswordState = {
  email: string;
  setEmail: (email: string) => void;
  error?: string;
  sentTo?: string;
  sending: boolean;
  handleSubmit: (event: SubmitEvent<HTMLFormElement>) => Promise<void>;
  handleResend: () => Promise<void>;
};

export type ResetSentProps = {
  email: string;
  onResend: () => void;
};
