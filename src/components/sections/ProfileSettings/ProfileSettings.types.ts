import type { ReactNode, SubmitEvent } from "react";

import type { ActionResult } from "@/lib/api/api.types";
import type { CustomerProfile, NotificationSetting } from "@/lib/customer/customer.types";

export type ProfileSettingsProps = {
  profile: CustomerProfile;
  notifications: NotificationSetting[];
  /** Message shown instead of the form when the profile could not be loaded. */
  loadError?: string;
  /** Saves the personal information; in the app it is a Server Action that calls the backend. */
  onSave?: (profile: CustomerProfile) => Promise<ActionResult>;
};

export type PersonalInfoCardProps = {
  profile: CustomerProfile;
  onSave?: ProfileSettingsProps["onSave"];
};

export type ProfileErrors = Partial<Record<"firstName" | "lastName" | "email" | "phone", string>>;

export type UseProfileFormParams = Pick<ProfileSettingsProps, "onSave"> & {
  initial: CustomerProfile;
};

export type ProfileFormState = {
  values: CustomerProfile;
  errors: ProfileErrors;
  saved: boolean;
  submitting: boolean;
  /** Error of the last save that is not tied to a field. */
  submitError?: string;
  setValue: <Field extends keyof CustomerProfile>(field: Field, value: CustomerProfile[Field]) => void;
  handleSubmit: (event: SubmitEvent<HTMLFormElement>) => Promise<void>;
};

export type ProfileFieldsProps = Pick<ProfileFormState, "values" | "errors" | "setValue">;

export type NotificationsCardProps = {
  settings: NotificationSetting[];
};

export type NotificationsState = {
  settings: NotificationSetting[];
  toggle: (id: string) => void;
};

export type SecurityRowProps = {
  label: string;
  note: string;
  children: ReactNode;
};
