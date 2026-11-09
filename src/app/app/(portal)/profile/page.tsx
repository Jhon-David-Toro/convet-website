import type { Metadata } from "next";

import { ProfileSettings } from "@/components/sections/ProfileSettings";
import { loadData } from "@/lib/api/api.guard";
import { getProfile } from "@/lib/api/users.api";
import { requireRole } from "@/lib/auth/auth.access";
import { NOTIFICATION_SETTINGS } from "@/lib/customer/customer.constants";
import type { CustomerProfile } from "@/lib/customer/customer.types";

import { saveProfileAction } from "./actions";

export const metadata: Metadata = {
  title: "Profile · CONVET",
};

const EMPTY_PROFILE: CustomerProfile = { firstName: "", lastName: "", email: "", phone: "", address: "" };

/**
 * Profile and settings page of the customer area. The personal information comes from the backend; a failure shows an error
 * state instead of an empty form that could overwrite the real data.
 *
 * @returns The rendered element.
 */
export default async function ProfilePage() {
  const user = await requireRole(["CUSTOMER"]);
  const { data, error } = await loadData(() => getProfile(user.idUser));

  return <ProfileSettings profile={data ?? EMPTY_PROFILE} notifications={NOTIFICATION_SETTINGS} loadError={error?.message} onSave={saveProfileAction} />;
}
