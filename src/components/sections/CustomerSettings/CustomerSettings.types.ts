import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

import type { SettingsChannel, SettingsNotification, SettingsProfile, SettingsSession } from "@/lib/customer/customer.types";

export type SettingsStatus = "idle" | "saved" | "error";

export type SettingsErrors = Partial<Record<keyof SettingsProfile, string>>;

export type CommunicationChoice = "email" | "email-whatsapp";

export type CustomerSettingsState = {
  values: SettingsProfile;
  errors: SettingsErrors;
  status: SettingsStatus;
  setValue: <Field extends keyof SettingsProfile>(field: Field, value: SettingsProfile[Field]) => void;
  save: () => void;
  discard: () => void;
  notifications: SettingsNotification[];
  toggleNotification: (id: string) => void;
  toggleChannel: (id: string, channel: SettingsChannel) => void;
  sessions: SettingsSession[];
  signOutSession: (id: string) => void;
  signOutOthers: () => void;
};

export type SettingsBannerProps = Pick<CustomerSettingsState, "status"> & {
  errorCount: number;
};

export type ProfileCardProps = Pick<CustomerSettingsState, "values" | "errors" | "status" | "setValue" | "save" | "discard">;

export type NotificationsCardProps = Pick<CustomerSettingsState, "notifications" | "toggleNotification" | "toggleChannel">;

export type SessionsCardProps = Pick<CustomerSettingsState, "sessions" | "signOutSession" | "signOutOthers">;

export type SettingsRowProps = {
  icon: LucideIcon;
  title: string;
  note: string;
  badge?: ReactNode;
  action?: ReactNode;
};
