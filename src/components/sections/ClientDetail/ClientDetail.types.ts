import type { LucideIcon } from "lucide-react";

import type { StaffClient } from "@/lib/staff.types";

export type ClientDetailProps = {
  client: StaffClient;
};

export type ClientHeaderProps = ClientDetailProps;

export type ClientContactProps = ClientDetailProps;

export type ContactLine = {
  icon: LucideIcon;
  text: string;
};

export type ClientPetsProps = Pick<StaffClient, "pets">;

export type ClientAppointmentsProps = Pick<StaffClient, "appointments">;
