import type { LucideIcon } from "lucide-react";

export type InviteRole = "veterinarian" | "assistant" | "receptionist" | "administrator";

export type InviteValues = {
  name: string;
  email: string;
  role: InviteRole;
  number: string;
  location: string;
};

export type RoleOption = {
  value: InviteRole;
  icon: LucideIcon;
  title: string;
  subtitle: string;
  numberLabel?: string;
  suggestion?: string;
};
