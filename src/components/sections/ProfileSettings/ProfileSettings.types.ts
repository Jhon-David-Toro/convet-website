import type { ReactNode, SubmitEvent } from "react";

import type { CustomerProfile, NotificationSetting } from "@/lib/customer/customer.types";

export type ProfileSettingsProps = {
  profile: CustomerProfile;
  notifications: NotificationSetting[];
  onSave?: (profile: CustomerProfile) => void;
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
  setValue: <Field extends keyof CustomerProfile>(field: Field, value: CustomerProfile[Field]) => void;
  handleSubmit: (event: SubmitEvent<HTMLFormElement>) => void;
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
